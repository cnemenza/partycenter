import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AuditableEntity } from '../../../config/auditable.entity';
import { ProductEntity } from '../../products/entities/product.entity';

@Entity({ name: 'categories' })
export class CategoryEntity extends AuditableEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'nvarchar',
    length: 80,
    nullable: false,
    unique: true,
  })
  name: string;

  @Column({
    type: 'nvarchar',
    length: 80,
    nullable: false,
    unique: true,
  })
  slug: string;

  @Column({
    type: 'nvarchar',
    nullable: true,
  })
  imagePath: string;

  @OneToMany(() => ProductEntity, (product) => product.category)
  products: ProductEntity[];
}
