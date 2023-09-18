import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ORDER_PAYMENT_TYPES } from 'src/constants';

export class CreateOrderPaymentDTO {
  @IsEnum(ORDER_PAYMENT_TYPES)
  @IsNotEmpty()
  type: ORDER_PAYMENT_TYPES;

  @IsNotEmpty()
  @IsNumber()
  prepaid: number;

  @IsOptional()
  entityId: string;
}
