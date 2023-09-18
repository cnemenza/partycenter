import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  public async login(@Res({ passthrough: true }) response: Response, @Body() body: LoginDto) {
    const { access_token } = await this.authService.login(body);

    response.cookie('access_token', access_token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 6,
    });

    return { access_token };
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('/logout')
  public async logout(@Res({ passthrough: true }) response: Response) {
    response.cookie('access_token', null, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 0,
    });

    return;
  }
}
