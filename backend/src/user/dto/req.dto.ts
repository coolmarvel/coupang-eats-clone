import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { ObjectId } from 'mongodb';

export class FindUserReqDto {
  @ApiProperty({ required: true, type: String })
  id: ObjectId;
}
