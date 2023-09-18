import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AuditableEntity } from '../../../config/auditable.entity';
import { ColumnNumericTransformer } from '../../../utils';
import { ClientAddressEntity } from '../../clients/entities/client-addresses.entity';
import { OrderEntity } from '../../orders/entities/order.entity';

@Entity({ name: 'deliveries' })
export class DeliveryEntity extends AuditableEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'nvarchar',
    length: 250,
    nullable: false,
  })
  description: string;

  @Column({
    type: 'decimal',
    precision: 19,
    scale: 2,
    default: 0,
    transformer: new ColumnNumericTransformer(),
  })
  price: number;

  @OneToMany(() => ClientAddressEntity, (clientAddress) => clientAddress.delivery)
  clientAddresses: ClientAddressEntity[];

  @OneToMany(() => OrderEntity, (order) => order.delivery)
  orders: OrderEntity[];
}
