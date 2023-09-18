import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IDataPagination } from 'src/interfaces/shared';
import { FileStorageService } from 'src/modules/filestorage/filestorage.service';
import { slugify } from 'src/utils';
import { FindOptionsWhere, Like, Not, Repository } from 'typeorm';
import { CategoryDTO } from '../dtos/category.dto';
import { CategoryEntity } from '../entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoriesRepository: Repository<CategoryEntity>,
    private readonly fileStorageService: FileStorageService,
  ) {}

  public async getAll(): Promise<CategoryEntity[]> {
    const result = await this.categoriesRepository.find();
    return result;
  }

  public async getCategoriesPagination(page: number, pageSize: number, search: string): Promise<IDataPagination> {
    const whereCondition: FindOptionsWhere<CategoryEntity>[] = [];

    if (search !== null && search !== '') {
      search = search.trim().toLowerCase();

      whereCondition.push({
        name: Like(`%${search}%`),
      });
    }

    const [data, total] = await Promise.all([
      await this.categoriesRepository.find({
        where: whereCondition.length > 0 ? whereCondition : null,
        order: {
          createdAt: 'DESC',
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      await this.categoriesRepository.count({
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

  public async createCategory(body: CategoryDTO, image: Express.Multer.File = null): Promise<CategoryEntity> {
    if (await this.anyByName(body.name)) throw new HttpException(`There is already a category with name '${body.name}'.`, HttpStatus.BAD_REQUEST);

    const entity = this.categoriesRepository.create({ ...body });

    entity.slug = slugify(entity.name);

    if (image !== null) entity.imagePath = await this.fileStorageService.uploadFile(image);

    return await this.categoriesRepository.save(entity);
  }

  public async getCategory(id: string): Promise<CategoryEntity> {
    const entity = await this.categoriesRepository.findOneBy({ id: id });

    if (entity === null) {
      throw new HttpException('Category not found.', HttpStatus.NOT_FOUND);
    }

    return entity;
  }

  public async updateCategory(id: string, body: CategoryDTO, image: Express.Multer.File = null): Promise<void> {
    if (await this.anyByName(body.name, id)) throw new HttpException(`There is already a category with name '${body.name}'.`, HttpStatus.BAD_REQUEST);

    const category = await this.categoriesRepository.findOneBy({ id });

    if (image !== null) {
      if (category.imagePath !== null) await this.fileStorageService.deleteFile(category.imagePath);

      category.imagePath = await this.fileStorageService.uploadFile(image);
    }

    category.slug = slugify(body.name);

    await this.categoriesRepository.save({ ...category, ...body });
  }

  public async deleteCategory(id: string): Promise<void> {
    const category = await this.categoriesRepository.findOneBy({ id });

    if (category === null) {
      throw new HttpException('Category not found.', HttpStatus.NOT_FOUND);
    }

    if (category.imagePath !== null) await this.fileStorageService.deleteFile(category.imagePath);

    await this.categoriesRepository.remove(category);
  }

  public async anyByName(name: string, ignoredId: string = null) {
    const whereClauses: FindOptionsWhere<CategoryEntity> = {
      name: name,
    };

    if (ignoredId !== null) whereClauses.id = Not(ignoredId);

    const count = await this.categoriesRepository.countBy(whereClauses);

    return count > 0;
  }
}
