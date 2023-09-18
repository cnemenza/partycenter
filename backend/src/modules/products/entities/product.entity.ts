import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AuditableEntity } from '../../../config/auditable.entity';
import { PRODUCT_TYPES } from '../../../constants';
import { ColumnNumericTransformer } from '../../../utils';
import { CategoryEntity } from '../../categories/entities/category.entity';
import { OrderDetailEntity } from '../../orders/entities/order-detail.entity';
import { ProductImageEntity } from '../../products/entities/product-image.entity';

@Entity({ name: 'products' })
export class ProductEntity extends AuditableEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'nvarchar',
    nullable: false,
    unique: true,
  })
  name: string;

  @Column({
    type: 'nvarchar',
    nullable: false,
    unique: true,
  })
  slug: string;

  @Column({
    type: 'longtext',
    nullable: true,
  })
  description: string;

  @Column({
    type: 'nvarchar',
    length: 30,
    unique: true,
    nullable: false,
  })
  code: string;

  @Column({
    type: 'bool',
    default: true,
    nullable: false,
  })
  enabled: boolean;

  @Column({
    type: 'int',
    default: 0,
    transformer: new ColumnNumericTransformer(),
  })
  totalStock: number;

  @Column({
    type: 'decimal',
    precision: 19,
    scale: 2,
    nullable: false,
    transformer: new ColumnNumericTransformer(),
  })
  price: number;

  @Column({
    type: 'enum',
    enum: PRODUCT_TYPES,
    nullable: false,
    default: PRODUCT_TYPES.SIMPLE,
  })
  type: PRODUCT_TYPES;

  @Column({
    type: 'uuid',
    length: 36,
    nullable: false,
  })
  categoryId: string;

  @JoinColumn({
    name: 'categoryId',
  })
  @ManyToOne(() => CategoryEntity, (category) => category.products)
  category: CategoryEntity;

  @OneToMany(() => ProductImageEntity, (productImage) => productImage.product)
  productImages: ProductImageEntity[];

  @OneToMany(() => OrderDetailEntity, (orderDetail) => orderDetail.product)
  orderDetails: OrderDetailEntity[];
}
