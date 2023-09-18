import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceConfig } from './config/data.source';
import { AuthModule } from './modules/auth/auth.module';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from './modules/auth/guards/roles.guard';
import { CategoriesModule } from './modules/categories/categories.module';
import { ClientsModule } from './modules/clients/clients.module';
import { DeliveriesModule } from './modules/deliveries/deliveries.module';
import { FileStorageModule } from './modules/filestorage/filestorage.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { OrdersModule } from './modules/orders/orders.module';
import { ProductsModule } from './modules/products/products.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  imports: [
    TypeOrmModule.forRoot(DataSourceConfig),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DeliveriesModule,
    ProductsModule,
    CategoriesModule,
    UsersModule,
    AuthModule,
    ClientsModule,
    FileStorageModule,
    OrdersModule,
    InventoryModule,
  ],
})
export class AppModule {}
