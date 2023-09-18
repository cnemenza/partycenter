import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AuditableEntity } from '../../../config/auditable.entity';
import { ORDER_TYPES } from '../../../constants';
import { ColumnDateTransformer, ColumnNumericTransformer } from '../../../utils';
import { ClientEntity } from '../../clients/entities/client.entity';
import { DeliveryEntity } from '../../deliveries/entities/delivery.entity';
import { OrderDetailEntity } from '../../orders/entities/order-detail.entity';
import { OrderPaymentEntity } from '../../orders/entities/order-payment.entity';

@Entity({ name: 'orders' })
export class OrderEntity extends AuditableEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'nvarchar',
    nullable: true,
  })
  createdBy: string;

  @Column({
    type: 'nvarchar',
    length: 30,
    unique: true,
    nullable: false,
  })
  code: string;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  eventAddress: string;

  @Column({
    type: 'date',
    nullable: false,
    transformer: new ColumnDateTransformer(),
  })
  eventDate: Date;

  @Column({
    type: 'boolean',
    nullable: false,
    default: true,
  })
  withTax: boolean;

  @Column({
    type: 'enum',
    enum: ORDER_TYPES,
    nullable: false,
    default: ORDER_TYPES.INTERNAL,
  })
  type: ORDER_TYPES;

  @Column({
    type: 'decimal',
    precision: 19,
    scale: 2,
    nullable: false,
    transformer: new ColumnNumericTransformer(),
  })
  subTotal: number;

  @Column({
    type: 'decimal',
    precision: 19,
    scale: 2,
    nullable: false,
    transformer: new ColumnNumericTransformer(),
  })
  tax: number;

  @Column({
    type: 'decimal',
    precision: 19,
    scale: 2,
    nullable: false,
    transformer: new ColumnNumericTransformer(),
  })
  shipping: number;

  @Column({
    type: 'decimal',
    precision: 19,
    scale: 2,
    nullable: false,
    transformer: new ColumnNumericTransformer(),
  })
  discount: number;

  @Column({
    type: 'decimal',
    precision: 19,
    scale: 2,
    nullable: false,
    transformer: new ColumnNumericTransformer(),
  })
  total: number;

  @Column({
    type: 'longtext',
    nullable: true,
  })
  observations: string;

  @Column({
    type: 'uuid',
    length: 36,
    nullable: false,
  })
  orderPaymentId: string;

  @JoinColumn({
    name: 'orderPaymentId',
  })
  @OneToOne(() => OrderPaymentEntity, (orderPayment) => orderPayment.order)
  orderPayment: OrderPaymentEntity;

  @Column({
    type: 'uuid',
    length: 36,
    nullable: true,
  })
  deliveryId: string;

  @JoinColumn({
    name: 'deliveryId',
  })
  @ManyToOne(() => DeliveryEntity, (delivery) => delivery.orders)
  delivery: DeliveryEntity;

  @Column({
    type: 'uuid',
    length: 36,
    nullable: false,
  })
  clientId: string;

  @JoinColumn({
    name: 'clientId',
  })
  @ManyToOne(() => ClientEntity, (client) => client.orders)
  client: ClientEntity;

  @OneToMany(() => OrderDetailEntity, (orderDetail) => orderDetail.order)
  orderDetails: OrderDetailEntity[];
}
