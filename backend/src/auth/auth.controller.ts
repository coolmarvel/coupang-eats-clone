import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() { email, password, passwordConfirm }) {
    if (password !== passwordConfirm) throw new BadRequestException();

    const { id, accessToken, refreshToken } = await this.authService.signup(email, password);

    return { id, accessToken, refreshToken };
  }
}
