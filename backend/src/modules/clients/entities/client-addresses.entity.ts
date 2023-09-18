import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ClientEntity } from '../../clients/entities/client.entity';
import { DeliveryEntity } from '../../deliveries/entities/delivery.entity';

@Entity({ name: 'client_addresses' })
export class ClientAddressEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 200,
  })
  address: string;

  @Column({
    type: 'uuid',
    length: 36,
    nullable: false,
  })
  clientId: string;

  @Column({
    type: 'uuid',
    length: 36,
    nullable: false,
  })
  deliveryId: string;

  @JoinColumn({
    name: 'clientId',
  })
  @ManyToOne(() => ClientEntity, (client) => client.clientAddresses)
  client: ClientEntity;

  @JoinColumn({
    name: 'deliveryId',
  })
  @ManyToOne(() => DeliveryEntity, (delivery) => delivery.clientAddresses)
  delivery: DeliveryEntity;
}
