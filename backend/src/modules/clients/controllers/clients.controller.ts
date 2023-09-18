import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ROLES } from 'src/constants';
import { Roles } from 'src/modules/auth/decorators/roles.decorator';
import { ClientDTO } from '../dtos/client.dto';
import { ClientsService } from '../services/clients.service';

@Roles(ROLES.ADMIN)
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get('/all')
  public async getAll(@Query('keyword') keyword = null, @Query('take') take = null) {
    return await this.clientsService.getAll(keyword, take);
  }

  @Get()
  public async getClientsPagination(@Query('page') page = 1, @Query('pageSize') pageSize = 10, @Query('search') search = null) {
    return await this.clientsService.getClientsPagination(page, pageSize, search);
  }

  @Get(':id')
  public async getClient(@Param('id') id: string) {
    return await this.clientsService.getClient(id);
  }

  @Post()
  public async createClient(@Body() body: ClientDTO) {
    return await this.clientsService.createClient(body);
  }

  @Delete(':id')
  public async deleteClient(@Param('id') id: string) {
    return await this.clientsService.deleteClient(id);
  }

  @Put(':id')
  public async updateDelivery(@Param('id') id: string, @Body() body: ClientDTO) {
    return await this.clientsService.updateClient(id, body);
  }
}
