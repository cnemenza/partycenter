import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IDataPagination } from 'src/interfaces/shared';
import { DataSource, FindManyOptions, FindOptionsWhere, Like, Not, Repository } from 'typeorm';
import { ClientDTO } from '../dtos/client.dto';
import { ClientAddressEntity } from '../entities/client-addresses.entity';
import { ClientEntity } from '../entities/client.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientsRepository: Repository<ClientEntity>,
    private readonly dataSource: DataSource,
  ) {}

  public async getAll(keyword: string, take: number | null): Promise<ClientEntity[]> {
    const whereCondition: FindOptionsWhere<ClientEntity>[] = [];

    if (keyword !== null && keyword !== '') {
      keyword = keyword.trim().toLowerCase();
      whereCondition.push(
        {
          fullName: Like(`%${keyword}%`),
        },
        {
          email: Like(`%${keyword}%`),
        },
        {
          phone: Like(`%${keyword}%`),
        },
      );
    }

    const result = await this.clientsRepository.find({
      where: whereCondition.length > 0 ? whereCondition : null,
      order: { fullName: 'ASC' },
      take: take,
    });

    return result;
  }

  public async getClientsPagination(page: number, pageSize: number, search: string): Promise<IDataPagination> {
    const whereClauses: FindManyOptions<ClientEntity> = {};
    if (search !== null && search !== '') {
      search = search.trim().toLowerCase();
      whereClauses.where = [
        {
          fullName: Like(`%${search}%`),
        },
        {
          email: Like(`%${search}%`),
        },
        {
          phone: Like(`%${search}%`),
        },
      ];
    }
    const [data, total] = await Promise.all([
      await this.clientsRepository.find({
        ...whereClauses,
        order: {
          createdAt: 'DESC',
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      await this.clientsRepository.count({
        ...whereClauses,
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

  public async getClient(id: string): Promise<ClientEntity> {
    const entity = await this.clientsRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        clientAddresses: true,
      },
    });

    if (entity === null) {
      throw new HttpException('Client not found.', HttpStatus.NOT_FOUND);
    }

    return entity;
  }

  public async createClient(body: ClientDTO): Promise<ClientEntity> {
    const clientByEmail = await this.getByEmail(body.email);

    if (clientByEmail) throw new HttpException(`There is already a user with email '${body.email}'.`, HttpStatus.BAD_REQUEST);

    const entity = await this.dataSource.transaction(async (manager) => {
      const { clientAddresses = null, ...clientData } = body;

      const client = manager.create(ClientEntity, {
        ...clientData,
        fullName: `${body.name} ${body.lastName}`.trim(),
      });

      await manager.save(client);

      if (clientAddresses) {
        const deliveriesEntites: ClientAddressEntity[] = clientAddresses.map((item) => {
          return {
            address: item.address,
            deliveryId: item.deliveryId,
            clientId: client.id,
          } as ClientAddressEntity;
        });

        const deliveries = manager.create(ClientAddressEntity, deliveriesEntites);

        await manager.save(deliveries);
      }

      return client;
    });

    return entity;
  }

  public async deleteClient(id: string): Promise<void> {
    const client = await this.clientsRepository.findOneBy({ id });

    await this.dataSource.transaction(async (manager) => {
      manager.delete(ClientAddressEntity, { clientId: client.id });
      manager.delete(ClientEntity, { id: id });
    });
  }

  public async updateClient(id: string, body: ClientDTO): Promise<void> {
    const clientByEmail = await this.getByEmail(body.email, id);

    if (clientByEmail) throw new HttpException(`There is already a user with email '${body.email}'.`, HttpStatus.BAD_REQUEST);

    const result = await this.dataSource.transaction(async (manager) => {
      const { clientAddresses = null, ...clientData } = body;

      manager.update(
        ClientEntity,
        { id },
        {
          ...clientData,
          fullName: `${clientData.name} ${clientData.lastName}`.trim(),
        },
      );

      manager.delete(ClientAddressEntity, { clientId: id });

      if (clientAddresses) {
        const deliveriesEntites: ClientAddressEntity[] = clientAddresses.map((item) => {
          return {
            address: item.address,
            deliveryId: item.deliveryId,
            clientId: id,
          } as ClientAddressEntity;
        });

        const deliveries = manager.create(ClientAddressEntity, deliveriesEntites);

        await manager.save(deliveries);
      }

      return;
    });

    return result;
  }

  public async getByEmail(email: string, ignoredId: string = null): Promise<ClientEntity> {
    const whereClauses: FindOptionsWhere<ClientEntity> = {
      email: email,
    };

    if (ignoredId !== null) whereClauses.id = Not(ignoredId);

    return await this.clientsRepository.findOneBy(whereClauses);
  }
}
