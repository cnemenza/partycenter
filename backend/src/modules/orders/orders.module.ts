import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { OrdersController } from './controllers/orders.controller';
import { OrderEntity } from './entities/order.entity';
import { OrdersService } from './serivces/orders.service';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([OrderEntity])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
