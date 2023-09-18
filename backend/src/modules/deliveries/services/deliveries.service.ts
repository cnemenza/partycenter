import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IDataPagination } from 'src/interfaces/shared';
import { DeleteResult, FindOptionsWhere, Like, Not, Repository, UpdateResult } from 'typeorm';
import { DeliveryDTO } from '../dtos/delivery.dto';
import { DeliveryEntity } from '../entities/delivery.entity';

@Injectable()
export class DeliveriesService {
  constructor(
    @InjectRepository(DeliveryEntity)
    private readonly deliveriesRepository: Repository<DeliveryEntity>,
  ) {}

  public async getAll(): Promise<DeliveryEntity[]> {
    const result = await this.deliveriesRepository.find({ order: { description: 'ASC' } });
    return result;
  }

  public async getDeliveriesPagination(page: number, pageSize: number, search: string): Promise<IDataPagination> {
    const whereCondition: FindOptionsWhere<DeliveryEntity>[] = [];

    if (search !== null && search !== '') {
      search = search.trim().toLowerCase();

      whereCondition.push({
        description: Like(`%${search}%`),
      });
    }

    const [data, total] = await Promise.all([
      await this.deliveriesRepository.find({
        where: whereCondition.length > 0 ? whereCondition : null,
        order: {
          createdAt: 'DESC',
        },
        select: {
          id: true,
          description: true,
          price: true,
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      await this.deliveriesRepository.count({
        where: whereCondition.length > 0 ? whereCondition : null,
      }),
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

  public async anyByDescription(description: string, ignoredId: string = null) {
    const whereClauses: FindOptionsWhere<DeliveryEntity> = {
      description: description,
    };

    if (ignoredId !== null) whereClauses.id = Not(ignoredId);

    const count = await this.deliveriesRepository.countBy(whereClauses);

    return count > 0;
  }

  public async createDelivery(body: DeliveryDTO): Promise<DeliveryEntity> {
    if (await this.anyByDescription(body.description))
      throw new HttpException(`There is already a delivery with description '${body.description}'.`, HttpStatus.BAD_REQUEST);

    return await this.deliveriesRepository.save(body);
  }

  public async getDelivery(id: string): Promise<DeliveryEntity> {
    const entity = await this.deliveriesRepository.findOneBy({ id: id });

    if (entity === null) {
      throw new HttpException('Delivery not found.', HttpStatus.NOT_FOUND);
    }

    return entity;
  }

  public async updateDelivery(id: string, body: DeliveryDTO): Promise<UpdateResult> {
    if (await this.anyByDescription(body.description, id))
      throw new HttpException(`There is already a delivery with description '${body.description}'.`, HttpStatus.BAD_REQUEST);

    const delivery = await this.deliveriesRepository.update(id, body);
    if (delivery.affected === 0) {
      throw new HttpException('Delivery not found.', HttpStatus.NOT_FOUND);
    }
    return delivery;
  }

  public async deleteDelivery(id: string): Promise<DeleteResult> {
    try {
      const delivery = await this.deliveriesRepository.delete(id);
      if (delivery.affected === 0) {
        throw new HttpException('Delivery not found.', HttpStatus.NOT_FOUND);
      }

      return delivery;
    } catch (error) {
      throw new HttpException('Delivery has related information.', HttpStatus.NOT_FOUND);
    }
  }
}
