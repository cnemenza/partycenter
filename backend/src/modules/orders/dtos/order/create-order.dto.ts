import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';
import { ORDER_TYPES } from 'src/constants';
import { OrderDetailDTO } from '../order-detail/order-detail.dto';
import { CreateOrderPaymentDTO } from '../order-payment/create-order-payment.dto';

export class CreateOrderDTO {
  @IsOptional()
  @IsString()
  eventAddress: string;

  @IsNotEmpty()
  @IsDate()
  eventDate: Date;

  @IsNotEmpty()
  @IsBoolean()
  withTax: boolean;

  @IsEnum(ORDER_TYPES)
  @IsNotEmpty()
  type: ORDER_TYPES;

  @IsNotEmpty()
  @IsNumber()
  shipping: number;

  @IsNotEmpty()
  @IsNumber()
  discount: number;

  @IsOptional()
  @IsUUID()
  deliveryId: string;

  @IsNotEmpty()
  @IsUUID()
  clientId: string;

  @IsOptional()
  observations?: string;

  @ValidateNested()
  @Type(() => CreateOrderPaymentDTO)
  orderPayment: CreateOrderPaymentDTO;

  @ValidateNested()
  @Type(() => OrderDetailDTO)
  orderDetails?: OrderDetailDTO[];
}
