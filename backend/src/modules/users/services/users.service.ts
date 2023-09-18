import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IDataPagination } from 'src/interfaces/shared';
import { IPayloadToken } from 'src/modules/auth/interfaces/auth.interface';
import { hashPassword } from 'src/utils';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { UserDTO } from '../dtos/user.dto';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  public async getUsersPagination(page: number, pageSize: number, search: string): Promise<IDataPagination> {
    const whereClauses: FindManyOptions<UserEntity> = {};

    if (search !== null && search !== '') {
      search = search.trim().toLowerCase();
      whereClauses.where = [
        {
          fullName: Like(`%${search}%`),
        },
        {
          username: Like(`%${search}%`),
        },
      ];
    }

    const [data, total] = await Promise.all([
      await this.usersRepository.find({
        ...whereClauses,
        order: {
          createdAt: 'DESC',
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      await this.usersRepository.count({
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

  public async createUser(body: UserDTO): Promise<UserEntity> {
    const userByUserName = await this.getByUsername(body.username);

    if (userByUserName) throw new HttpException(`There is already a user with username '${body.username}'.`, HttpStatus.BAD_REQUEST);

    body.password = await hashPassword(body.password);

    const user = await this.usersRepository.save({ ...body });

    return user;
  }

  public async getUser(id: string): Promise<UserEntity> {
    const entity = await this.usersRepository.findOneBy({ id });

    if (entity === null) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }

    return entity;
  }

  public async getByUsername(username: string): Promise<UserEntity> {
    const entity = await this.usersRepository.findOne({
      where: {
        username: username,
      },
    });

    return entity;
  }

  public async getByToken(token?: IPayloadToken): Promise<UserEntity> {
    if (!token) return null;

    const entity = await this.usersRepository.findOne({
      where: {
        id: token.sub,
      },
    });

    return entity;
  }
}
