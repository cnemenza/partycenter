import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ROLES } from 'src/constants';
import { Roles } from 'src/modules/auth/decorators/roles.decorator';
import { CategoryDTO } from '../dtos/category.dto';
import { CategoriesService } from '../services/categories.service';

@Roles(ROLES.ADMIN)
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get('/all')
  public async getAll() {
    return await this.categoriesService.getAll();
  }

  @Get()
  public async getCategories(@Param('page') page = 1, @Param('pageSize') pageSize = 10, @Query('search') search = null) {
    return await this.categoriesService.getCategoriesPagination(page, pageSize, search);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  public async createCategory(@Body() body: CategoryDTO, @UploadedFile() image: Express.Multer.File | null) {
    return await this.categoriesService.createCategory(body, image);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  public async updateCategory(@Param('id') id: string, @Body() body: CategoryDTO, @UploadedFile() image: Express.Multer.File | null) {
    return await this.categoriesService.updateCategory(id, body, image);
  }

  @Get(':id')
  public async getCategory(@Param('id') id: string) {
    return await this.categoriesService.getCategory(id);
  }

  @Delete(':id')
  public async deleteCategory(@Param('id') id: string) {
    return await this.categoriesService.deleteCategory(id);
  }
}
