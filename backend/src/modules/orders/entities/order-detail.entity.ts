import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ColumnNumericTransformer } from '../../../utils';
import { OrderEntity } from '../../orders/entities/order.entity';
import { ProductEntity } from '../../products/entities/product.entity';

@Entity({ name: 'order_details' })
export class OrderDetailEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'uuid',
    length: 36,
    nullable: false,
  })
  orderId: string;

  @JoinColumn({
    name: 'orderId',
  })
  @ManyToOne(() => OrderEntity, (order) => order.orderDetails)
  order: OrderEntity;

  @Column({
    type: 'uuid',
    length: 36,
    nullable: false,
  })
  productId: string;

  @JoinColumn({
    name: 'productId',
  })
  @ManyToOne(() => ProductEntity, (product) => product.orderDetails)
  product: ProductEntity;

  @Column({
    type: 'decimal',
    precision: 19,
    scale: 2,
    nullable: false,
    transformer: new ColumnNumericTransformer(),
  })
  price: number;

  @Column({
    type: 'int',
    nullable: false,
    transformer: new ColumnNumericTransformer(),
  })
  quantity: number;
}
