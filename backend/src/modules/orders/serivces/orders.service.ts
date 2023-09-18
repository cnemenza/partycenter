import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TAX_PERCENTAGE } from 'src/constants';
import { IDataPagination } from 'src/interfaces/shared';
import { IPayloadToken } from 'src/modules/auth/interfaces/auth.interface';
import { UsersService } from 'src/modules/users/services/users.service';
import { dateToStringQuery, stringToDate } from 'src/utils';
import { roundTwoDecimals } from 'src/utils/rounder.util';
import { DataSource, Repository } from 'typeorm';
import { OrderAmountDTO } from '../dtos/order-amount/order-amount.dto';
import { CreateOrderDTO } from '../dtos/order/create-order.dto';
import { EditOrderDTO } from '../dtos/order/edit-order.dto';
import { OrderDetailEntity } from '../entities/order-detail.entity';
import { OrderPaymentEntity } from '../entities/order-payment.entity';
import { OrderEntity } from '../entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly ordersRepository: Repository<OrderEntity>,
    private readonly dataSource: DataSource,
    private readonly usersService: UsersService,
  ) {}

  public async getOrdersPagination(page: number, pageSize: number, search?: string, date?: string): Promise<IDataPagination> {
    let query = this.ordersRepository.createQueryBuilder('order').leftJoin('order.client', 'client');

    if (search && search !== '') {
      search = search.toLowerCase().trim();
      query = query.where('order.code like :search or client.fullName like :search', { search: `%${search}%` });
    }

    if (date) {
      query = query.andWhere('order.eventDate = :eventDate', { eventDate: dateToStringQuery(stringToDate(date)) });
    }

    const [data, total] = await Promise.all([
      await query
        .orderBy('order.createdAt', 'DESC')
        .skip((page - 1) * pageSize)
        .take(pageSize)
        .select(['order.id', 'order.createdAt', 'order.eventDate', 'order.total', 'order.type', 'order.code', 'client.fullName'])
        .getMany(),
      await query.getCount(),
    ]);

    const result: IDataPagination = {
      records: data,
      meta: {
        page: page,
        pageSize: pageSize,
        total: total,
      },
    };

    return result;
  }

  public async getOrder(id: string): Promise<OrderEntity> {
    const entity = await this.ordersRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        orderDetails: {
          product: true,
        },
        orderPayment: true,
        client: true,
      },
      select: {
        id: true,
        clientId: true,
        client: {
          id: true,
          fullName: true,
        },
        eventAddress: true,
        observations: true,
        eventDate: true,
        tax: true,
        discount: true,
        shipping: true,
        subTotal: true,
        total: true,
        type: true,
        deliveryId: true,
        withTax: true,
        code: true,
        orderPayment: {
          prepaid: true,
          balance: true,
          entityId: true,
          type: true,
        },
        orderDetails: {
          id: true,
          productId: true,
          product: {
            name: true,
          },
          quantity: true,
          price: true,
        },
      },
    });

    if (entity === null) {
      throw new HttpException('Order not found.', HttpStatus.NOT_FOUND);
    }

    return entity;
  }

  public async createOrder(body: CreateOrderDTO, token?: IPayloadToken): Promise<OrderEntity> {
    if (!body.orderDetails || body.orderDetails.length === 0) throw new HttpException(`Need to add products.`, HttpStatus.BAD_REQUEST);
    if (!body.orderPayment) throw new HttpException(`The order does not have payment information.`, HttpStatus.BAD_REQUEST);

    const entity = await this.dataSource.transaction(async (manager) => {
      const { orderDetails: orderDetailsData, orderPayment: orderPaymentData, ...orderData } = body;

      const code = await this.getNextCode();

      const createdBy = await this.usersService.getByToken(token);

      const orderAmounts = this.getOrderAmounts({
        withTax: body.withTax,
        shipping: body.shipping,
        discount: body.discount,
        prepaid: body.orderPayment.prepaid,
        orderDetails: body.orderDetails,
      });

      //#region Create Order Payment

      const orderPayment = manager.create(OrderPaymentEntity, {
        ...orderPaymentData,
        entityId: orderPaymentData.entityId,
        prepaid: orderAmounts.prepaid,
        balance: orderAmounts.balance,
      });

      await manager.save(orderPayment);

      //#endregion

      //#region Create Order

      const order = manager.create(OrderEntity, {
        ...orderData,
        createdBy: createdBy ? createdBy.fullName : null,
        code: code,
        subTotal: orderAmounts.subTotal,
        tax: orderAmounts.tax,
        shipping: orderAmounts.shipping,
        discount: orderAmounts.discount,
        total: orderAmounts.total,
        orderPaymentId: orderPayment.id,
      });

      await manager.save(order);

      //#endregion

      //#region Create Order Details

      const orderDetail = orderDetailsData.map((item) => {
        return {
          orderId: order.id,
          price: item.price,
          productId: item.productId,
          quantity: item.quantity,
        } as OrderDetailEntity;
      });

      const details = manager.create(OrderDetailEntity, orderDetail);

      await manager.save(details);

      //#endregion

      return order;
    });

    return entity;
  }

  public async updateOrder(id: string, body: EditOrderDTO): Promise<OrderEntity> {
    if (!body.orderDetails || body.orderDetails.length === 0) throw new HttpException(`Need to add products.`, HttpStatus.BAD_REQUEST);
    if (!body.orderPayment) throw new HttpException(`The order does not have payment information.`, HttpStatus.BAD_REQUEST);

    const orderEntity = await this.ordersRepository.findOneBy({ id });

    if (!orderEntity) throw new HttpException(`Order not found.`, HttpStatus.BAD_REQUEST);

    const entity = await this.dataSource.transaction(async (manager) => {
      const { orderDetails: orderDetailsData, ...orderData } = body;

      const orderAmounts = this.getOrderAmounts({
        withTax: body.withTax,
        shipping: body.shipping,
        discount: body.discount,
        prepaid: body.orderPayment.prepaid,
        orderDetails: body.orderDetails,
      });

      //#region Update Order Payment

      const orderPaymentEntity = await manager.findOneBy(OrderPaymentEntity, { id: orderEntity.orderPaymentId });

      orderPaymentEntity.prepaid = orderAmounts.prepaid;
      orderPaymentEntity.balance = orderAmounts.balance;

      await manager.save(orderPaymentEntity);

      //#endregion

      //#region Update Order

      orderEntity.eventDate = orderData.eventDate;
      orderEntity.deliveryId = orderData.deliveryId;
      orderEntity.eventAddress = orderData.eventAddress;
      orderEntity.observations = orderData.observations;
      orderEntity.withTax = orderData.withTax;
      orderEntity.subTotal = orderAmounts.subTotal;
      orderEntity.tax = orderAmounts.tax;
      orderEntity.shipping = orderAmounts.shipping;
      orderEntity.discount = orderAmounts.discount;
      orderEntity.total = orderAmounts.total;

      await manager.save(orderEntity);

      //#endregion

      //#region Update Order Details

      manager.delete(OrderDetailEntity, { orderId: orderEntity.id });

      const orderDetailsEntities: OrderDetailEntity[] = orderDetailsData.map((item) => {
        return {
          orderId: orderEntity.id,
          price: item.price,
          productId: item.productId,
          quantity: item.quantity,
        } as OrderDetailEntity;
      });

      const orderDetails = manager.create(OrderDetailEntity, orderDetailsEntities);

      await manager.save(orderDetails);

      //#endregion

      return orderEntity;
    });

    return entity;
  }

  public async getNextCode(): Promise<string> {
    const now = new Date();

    const lastOrder = await this.ordersRepository
      .createQueryBuilder('orders')
      .where('orders.createdAt >= :startDate', { startDate: dateToStringQuery(new Date(now.getFullYear(), 0, 1)) })
      .andWhere('orders.createdAt < :endDate', { endDate: dateToStringQuery(new Date(now.getFullYear() + 1, 0, 1)) })
      .orderBy('orders.createdAt', 'DESC')
      .select('orders.code')
      .getOne();

    const codeNumber = lastOrder?.code ? parseInt(lastOrder.code.substring(8)) : 0;
    const correlative = `${codeNumber + 1}`.padStart(5, '0');
    return `ORD-${now.getFullYear()}${correlative}`;
  }

  public async deleteOrder(id: string): Promise<void> {
    const order = await this.ordersRepository.findOneBy({ id: id });

    if (!order) throw new HttpException('Order not found.', HttpStatus.NOT_FOUND);

    await this.dataSource.transaction(async (manager) => {
      manager.delete(OrderDetailEntity, { orderId: order.id });
      manager.delete(OrderEntity, { id: id });
      manager.delete(OrderPaymentEntity, { id: order.orderPaymentId });
    });
  }

  public getOrderAmounts(order: OrderAmountDTO) {
    let subTotal = 0;
    let tax = 0;

    order.orderDetails.forEach((value) => {
      const quantity = value.quantity;
      const price = value.price;

      subTotal += roundTwoDecimals(quantity * price);
    });

    subTotal = roundTwoDecimals(subTotal);
    if (order.withTax) tax = roundTwoDecimals(subTotal * TAX_PERCENTAGE);

    const shipping = roundTwoDecimals(order.shipping);
    const discount = roundTwoDecimals(order.discount);
    const total = roundTwoDecimals(subTotal + tax + shipping - discount);
    const prepaid = roundTwoDecimals(order.prepaid);
    const balance = roundTwoDecimals(total - prepaid);

    return {
      subTotal: subTotal,
      tax: tax,
      shipping: shipping,
      discount: discount,
      total: total,
      prepaid: prepaid,
      balance: balance,
    };
  }
}
