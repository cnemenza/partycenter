import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetailEntity } from '../orders/entities/order-detail.entity';
import { OrderEntity } from '../orders/entities/order.entity';
import { ProductEntity } from '../products/entities/product.entity';
import { ProductsInventoryController } from './controllers/products-inventory.controller';
import { ProductsInventoryService } from './sevices/products-inventory.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, OrderEntity, OrderDetailEntity])],
  providers: [ProductsInventoryService],
  controllers: [ProductsInventoryController],
})
export class InventoryModule {}
