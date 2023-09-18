import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AuditableEntity } from '../../../config/auditable.entity';
import { ClientAddressEntity } from '../../clients/entities/client-addresses.entity';
import { OrderEntity } from '../../orders/entities/order.entity';

@Entity({ name: 'clients' })
export class ClientEntity extends AuditableEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'nvarchar',
    length: 80,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'nvarchar',
    length: 80,
  })
  lastName: string;

  @Column({
    type: 'nvarchar',
    length: 200,
    nullable: true,
  })
  fullName: string;

  @Column({
    type: 'nvarchar',
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    type: 'nvarchar',
    nullable: false,
  })
  phone: string;

  @Column({
    type: 'nvarchar',
    nullable: true,
  })
  secondaryPhone: string;

  @OneToMany(() => ClientAddressEntity, (clientAddress) => clientAddress.client)
  clientAddresses: ClientAddressEntity[];

  @OneToMany(() => OrderEntity, (order) => order.client)
  orders: OrderEntity[];
}
