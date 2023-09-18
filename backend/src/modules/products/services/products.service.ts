import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IDataPagination } from 'src/interfaces/shared';
import { slugify } from 'src/utils';
import { DataSource, Equal, FindOptionsWhere, Like, Not, Repository, UpdateResult } from 'typeorm';
import { CreateProductDTO } from '../dtos/create-product.dto';
import { UpdateProductDTO } from '../dtos/update-product.dto';
import { ProductEntity } from '../entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productsRepository: Repository<ProductEntity>,
    private readonly dataSource: DataSource,
  ) {}

  public async getProductsPagination(page: number, pageSize: number, categoryId: string, search: string): Promise<IDataPagination> {
    const whereCondition: FindOptionsWhere<ProductEntity>[] = [];

    if (categoryId !== null && categoryId !== '') {
      whereCondition.push({
        categoryId: Equal(categoryId),
      });
    }

    if (search !== null && search !== '') {
      search = search.trim().toLowerCase();

      whereCondition.push(
        {
          name: Like(`%${search}%`),
        },
        {
          code: Like(`%${search}%`),
        },
      );
    }

    const [data, total] = await Promise.all([
      await this.productsRepository.find({
        where: whereCondition.length > 0 ? whereCondition : null,
        relations: {
          category: true,
        },
        order: {
          createdAt: 'DESC',
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      await this.productsRepository.count({
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

  public async createProduct(body: CreateProductDTO): Promise<ProductEntity> {
    if (await this.anyByName(body.name)) throw new HttpException(`There is already a product with name '${body.name}'.`, HttpStatus.BAD_REQUEST);

    const code = await this.getNextCode();

    const slug = slugify(body.name);

    const product = this.productsRepository.create({
      ...body,
      code: code,
      slug: slug,
    });

    return await this.productsRepository.save(product);
  }

  public async getProduct(id: string): Promise<ProductEntity> {
    const entity = await this.productsRepository.findOneBy({ id: id });
    if (entity === null) {
      throw new HttpException('Product not found.', HttpStatus.NOT_FOUND);
    }
    return entity;
  }

  public async updateProduct(id: string, body: UpdateProductDTO): Promise<UpdateResult> {
    if (await this.anyByName(body.name, id)) throw new HttpException(`There is already a product with name '${body.name}'.`, HttpStatus.BAD_REQUEST);

    const slug = slugify(body.name);

    const product = await this.productsRepository.update(id, { ...body, slug });

    if (product.affected === 0) {
      throw new HttpException('Product not found.', HttpStatus.NOT_FOUND);
    }

    return product;
  }

  public async deleteProduct(id: string): Promise<void> {
    await this.dataSource.transaction(async (manager) => {
      manager.delete(ProductEntity, { id: id });
    });
  }

  public async anyByName(name: string, ignoredId: string = null): Promise<boolean> {
    const whereClauses: FindOptionsWhere<ProductEntity> = {
      name: name,
    };

    if (ignoredId !== null) whereClauses.id = Not(ignoredId);

    const count = await this.productsRepository.countBy(whereClauses);

    return count > 0;
  }

  public async getNextCode(): Promise<string> {
    const lastProduct = await this.productsRepository.findOne({
      where: {},
      order: {
        code: 'DESC',
      },
      select: {
        code: true,
      },
    });

    const number = lastProduct === null ? 0 : parseInt(lastProduct.code.replace(/\D/g, ''));
    const correlative = String(number + 1).padStart(3, '0');
    return `PAC${correlative}`;
  }
}
