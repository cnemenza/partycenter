import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class EditOrderPaymentDTO {
  @IsNotEmpty()
  @IsNumber()
  prepaid: number;

  @IsOptional()
  entityId: string;
}
