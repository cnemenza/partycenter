import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { PRODUCT_TYPES } from 'src/constants';

export class UpdateProductDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsString()
  @IsOptional()
  description: string;

  @IsBoolean()
  enabled: boolean;

  @IsEnum(PRODUCT_TYPES)
  @IsNotEmpty()
  type: PRODUCT_TYPES;

  @IsNotEmpty()
  @IsString()
  categoryId: string;
}
