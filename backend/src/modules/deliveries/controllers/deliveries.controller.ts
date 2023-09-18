import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ROLES } from 'src/constants';
import { Public } from 'src/modules/auth/decorators/public.decorator';
import { Roles } from 'src/modules/auth/decorators/roles.decorator';
import { DeliveryDTO } from '../dtos/delivery.dto';
import { DeliveriesService } from '../services/deliveries.service';

@Roles(ROLES.ADMIN)
@Controller('deliveries')
export class DeliveriesController {
  constructor(private readonly deliveriesService: DeliveriesService) {}

  @Public()
  @Get('/all')
  public async getAll() {
    return await this.deliveriesService.getAll();
  }

  @Get()
  public async getDeliveries(@Query('page') page = 1, @Query('pageSize') pageSize = 10, @Query('search') search = null) {
    return await this.deliveriesService.getDeliveriesPagination(page, pageSize, search);
  }

  @Post()
  public async createDelivery(@Body() body: DeliveryDTO) {
    return await this.deliveriesService.createDelivery(body);
  }

  @Put(':id')
  public async updateDelivery(@Param('id') id: string, @Body() body: DeliveryDTO) {
    return await this.deliveriesService.updateDelivery(id, body);
  }

  @Get(':id')
  public async getDelivery(@Param('id') id: string) {
    return await this.deliveriesService.getDelivery(id);
  }

  @Delete(':id')
  public async deleteDelivery(@Param('id') id: string) {
    return await this.deliveriesService.deleteDelivery(id);
  }
}
