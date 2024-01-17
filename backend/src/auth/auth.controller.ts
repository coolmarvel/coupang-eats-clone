import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { RefreshResDto, SigninResDto, SignupResDto } from './dto/res.dto';
import { ApiPostResponse } from 'src/common/decorator/swagger.decorator';
import { SigninReqDto, SignupReqDto } from './dto/req.dto';
import { Public } from 'src/common/decorator/public.decorator';

@ApiTags('Auth')
@Controller('auth')
@ApiExtraModels(SignupResDto, SigninResDto, RefreshResDto)
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiPostResponse(SignupResDto)
  @Public()
  @Post('signup')
  async signup(@Body() { email, password, passwordConfirm }: SignupReqDto): Promise<SignupResDto> {
    if (password !== passwordConfirm) throw new BadRequestException();

    const { id, accessToken, refreshToken } = await this.authService.signup(email, password);

    return { id, accessToken, refreshToken };
  }

  @ApiPostResponse(SigninResDto)
  @Public()
  @Post('signin')
  async signin(@Body() { email, password }: SigninReqDto) {
    return this.authService.signin(email, password);
  }
}
