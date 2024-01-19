import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'typeorm';

export class FindUserResDto {
  @ApiProperty({ required: true, type: String })
  id: ObjectId;

  @ApiProperty({ required: true })
  email: string;

  @ApiProperty({ required: true })
  createdAt: string;
}
