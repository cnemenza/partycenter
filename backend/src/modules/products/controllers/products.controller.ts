import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ROLES } from 'src/constants';
import { Roles } from 'src/modules/auth/decorators/roles.decorator';
import { CreateProductDTO } from '../dtos/create-product.dto';
import { UpdateProductDTO } from '../dtos/update-product.dto';
import { ProductsService } from '../services/products.service';

@Roles(ROLES.ADMIN)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  public async getProducts(
    @Query('page') page = 1,
    @Query('pageSize') pageSize = 10,
    @Query('search') search = null,
    @Query('categoryId') categoryId = null,
  ) {
    return await this.productsService.getProductsPagination(page, pageSize, categoryId, search);
  }

  @Post()
  public async createProduct(@Body() body: CreateProductDTO) {
    return await this.productsService.createProduct(body);
  }

  @Put(':id')
  public async updateProduct(@Param('id') id: string, @Body() body: UpdateProductDTO) {
    return await this.productsService.updateProduct(id, body);
  }

  @Get(':id')
  public async getProduct(@Param('id') id: string) {
    return await this.productsService.getProduct(id);
  }

  @Delete(':id')
  public async deleteProduct(@Param('id') id: string) {
    return await this.productsService.deleteProduct(id);
  }
}
