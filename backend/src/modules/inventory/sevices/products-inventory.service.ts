import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetailEntity } from 'src/modules/orders/entities/order-detail.entity';
import { OrderEntity } from 'src/modules/orders/entities/order.entity';
import { ProductEntity } from 'src/modules/products/entities/product.entity';
import { stringToDate } from 'src/utils';
import { IsNull, Not, Repository } from 'typeorm';
import { ProductStockDTO } from '../dtos/product-stock.dto';

@Injectable()
export class ProductsInventoryService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productsRepository: Repository<ProductEntity>,

    @InjectRepository(OrderEntity)
    private readonly ordersRepository: Repository<OrderEntity>,

    @InjectRepository(OrderDetailEntity)
    private readonly orderDetailsRepository: Repository<OrderDetailEntity>,
  ) {}

  public async getStock(date: string, orderId?: string): Promise<ProductStockDTO[]> {
    const dateValue = stringToDate(date);

    const orderDetails = await this.orderDetailsRepository.find({
      where: {
        order: {
          eventDate: dateValue,
          id: orderId ? Not(orderId) : Not(IsNull()),
        },
      },
      select: {
        productId: true,
        quantity: true,
      },
    });

    const products = await this.productsRepository.find({
      order: {
        name: 'DESC',
      },
      select: {
        id: true,
        name: true,
        totalStock: true,
        price: true,
        code: true,
        category: {
          name: true,
        },
      },
    });

    const result = products.map((item): ProductStockDTO => {
      return {
        id: item.id,
        code: item.code,
        name: item.name,
        totalStock: item.totalStock,
        availableStock:
          item.totalStock -
          orderDetails
            .filter((detail) => detail.productId == item.id)
            .map((detail) => detail.quantity)
            .reduce((acc, quantity) => {
              return acc + quantity;
            }, 0),
        price: item.price,
        category: item.category?.name,
      };
    });

    return result;
  }
}
