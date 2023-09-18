import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DeliveryDTO {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
