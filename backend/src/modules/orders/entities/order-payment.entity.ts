import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ORDER_PAYMENT_TYPES } from '../../../constants/';
import { ColumnNumericTransformer } from '../../../utils';
import { OrderEntity } from '../../orders/entities/order.entity';

@Entity({ name: 'order_payments' })
export class OrderPaymentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'decimal',
    precision: 19,
    scale: 2,
    nullable: false,
    transformer: new ColumnNumericTransformer(),
  })
  prepaid: number;

  @Column({
    type: 'decimal',
    precision: 19,
    scale: 2,
    nullable: false,
    transformer: new ColumnNumericTransformer(),
  })
  balance: number;

  @Column({
    type: 'enum',
    enum: ORDER_PAYMENT_TYPES,
    nullable: false,
    default: ORDER_PAYMENT_TYPES.MANUAL,
  })
  type: ORDER_PAYMENT_TYPES;

  @Column({
    type: 'nvarchar',
    nullable: true,
  })
  entityId: string;

  @OneToOne(() => OrderEntity, (order) => order.orderPayment)
  order: OrderEntity;
}
