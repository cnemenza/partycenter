import { Controller, Get, Query } from '@nestjs/common';
import { ProductsInventoryService } from '../sevices/products-inventory.service';

@Controller('products-inventory')
export class ProductsInventoryController {
  constructor(private readonly productsInventoryService: ProductsInventoryService) {}

  @Get('/stock')
  public async getProductsStock(@Query('date') date: string, @Query('orderId') orderId = null) {
    return await this.productsInventoryService.getStock(date, orderId);
  }
}
