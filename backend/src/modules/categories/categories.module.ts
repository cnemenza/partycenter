import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileStorageModule } from '../filestorage/filestorage.module';
import { CategoriesController } from './controllers/categories.controller';
import { CategoryEntity } from './entities/category.entity';
import { CategoriesService } from './services/categories.service';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity]), FileStorageModule],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
