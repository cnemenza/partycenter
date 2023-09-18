import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/modules/users/services/users.service';
import { comparePassword } from 'src/utils';
import { LoginDto } from './dtos/login.dto';
import { IAuthResponse, IPayloadToken } from './interfaces/auth.interface';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private jwtService: JwtService) {}

  public async login({ username, password }: LoginDto): Promise<IAuthResponse> {
    const user = await this.usersService.getByUsername(username);

    if (user === null || !(await comparePassword(password, user.password)))
      throw new HttpException(`Username or password incorrect`, HttpStatus.BAD_REQUEST);

    const payload: IPayloadToken = {
      sub: user.id,
      role: user.role,
      fullName: user.fullName,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
