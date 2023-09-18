import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request } from '@nestjs/common';
import { ROLES } from 'src/constants';
import { Roles } from 'src/modules/auth/decorators/roles.decorator';
import { CreateOrderDTO } from '../dtos/order/create-order.dto';
import { EditOrderDTO } from '../dtos/order/edit-order.dto';
import { OrdersService } from '../serivces/orders.service';

@Roles(ROLES.ADMIN)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  public async getOrdersPagination(
    @Query('page') page = 1,
    @Query('pageSize') pageSize = 10,
    @Query('search') search: string,
    @Query('date') date: string,
  ) {
    return await this.ordersService.getOrdersPagination(page, pageSize, search, date);
  }

  @Get(':id')
  public async getOrder(@Param('id') id: string) {
    return await this.ordersService.getOrder(id);
  }

  @Post()
  public async createOrder(@Request() { user }, @Body() body: CreateOrderDTO) {
    return await this.ordersService.createOrder(body, user);
  }

  @Delete(':id')
  public async deleteOrder(@Param('id') id: string) {
    return await this.ordersService.deleteOrder(id);
  }

  @Put(':id')
  public async updateOrder(@Param('id') id: string, @Body() body: EditOrderDTO) {
    return await this.ordersService.updateOrder(id, body);
  }
}
