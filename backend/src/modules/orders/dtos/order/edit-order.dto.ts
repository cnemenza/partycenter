import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';
import { ORDER_TYPES } from 'src/constants';
import { OrderDetailDTO } from '../order-detail/order-detail.dto';
import { EditOrderPaymentDTO } from '../order-payment/edit-order-payment.dto';

export class EditOrderDTO {
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

  @IsOptional()
  observations?: string;

  @ValidateNested()
  @Type(() => EditOrderPaymentDTO)
  orderPayment: EditOrderPaymentDTO;

  @ValidateNested()
  @Type(() => OrderDetailDTO)
  orderDetails?: OrderDetailDTO[];
}
