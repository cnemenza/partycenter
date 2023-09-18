import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ROLES } from 'src/constants';
import { Roles } from 'src/modules/auth/decorators/roles.decorator';
import { UserDTO } from '../dtos/user.dto';
import { UsersService } from '../services/users.service';

@Roles(ROLES.ADMIN)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  public async getUsers(@Query('page') page = 1, @Query('pageSize') pageSize = 10, @Query('search') search = null) {
    return await this.usersService.getUsersPagination(page, pageSize, search);
  }

  @Post()
  public async createUser(@Body() body: UserDTO) {
    return await this.usersService.createUser(body);
  }
}
