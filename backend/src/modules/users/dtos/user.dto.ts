import { IsEnum, IsNotEmpty } from 'class-validator';
import { ROLES } from 'src/constants';

export class UserDTO {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsEnum(ROLES)
  role: ROLES;

  @IsNotEmpty()
  fullName: string;
}
