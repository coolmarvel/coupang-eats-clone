import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'typeorm';

export class SignupResDto {
  @ApiProperty({ required: true, type: String })
  id: ObjectId;

  @ApiProperty({ required: true })
  accessToken: string;

  @ApiProperty({ required: true })
  refreshToken: string;
}

export class SigninResDto {
  @ApiProperty({ required: true })
  accessToken: string;

  @ApiProperty({ required: true })
  refreshToken: string;
}

export class RefreshResDto {
  @ApiProperty({ required: true })
  accessToken: string;

  @ApiProperty({ required: true })
  refreshToken: string;
}
