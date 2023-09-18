import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AuditableEntity } from '../../../config/auditable.entity';
import { ROLES } from '../../../constants';

@Entity({ name: 'users' })
export class UserEntity extends AuditableEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'nvarchar',
    unique: true,
    nullable: false,
  })
  username: string;

  @Column({
    type: 'nvarchar',
    nullable: false,
  })
  fullName: string;

  @Exclude()
  @Column({
    type: 'nvarchar',
    nullable: false,
  })
  password: string;

  @Column({
    type: 'enum',
    enum: ROLES,
    nullable: false,
  })
  role: ROLES;
}
