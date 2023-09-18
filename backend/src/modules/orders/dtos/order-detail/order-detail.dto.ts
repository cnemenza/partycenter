import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class OrderDetailDTO {
  @IsNotEmpty()
  @IsUUID()
  productId: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
