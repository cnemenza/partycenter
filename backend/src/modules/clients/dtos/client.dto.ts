import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { ClientAddressDTO } from './client-addresses.dto';

export class ClientDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail(
    {},
    {
      message: 'email is not in the correct format',
    },
  )
  email: string;

  @IsNotEmpty()
  phone: string;

  @IsOptional()
  secondaryPhone: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => ClientAddressDTO)
  clientAddresses?: ClientAddressDTO[];
}
