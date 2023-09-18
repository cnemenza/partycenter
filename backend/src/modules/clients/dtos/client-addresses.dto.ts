import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class ClientAddressDTO {
  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsUUID()
  deliveryId: string;
}
