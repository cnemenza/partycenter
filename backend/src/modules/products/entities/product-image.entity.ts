import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductEntity } from '../../products/entities/product.entity';

@Entity({ name: 'product_images' })
export class ProductImageEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'bool',
    nullable: false,
  })
  default: boolean;

  @Column({
    type: 'nvarchar',
    nullable: false,
  })
  imagePath: string;

  @Column({
    type: 'uuid',
    length: 36,
    nullable: false,
  })
  productId: string;

  @JoinColumn({
    name: 'productId',
  })
  @ManyToOne(() => ProductEntity, (product) => product.productImages)
  product: ProductEntity;
}
