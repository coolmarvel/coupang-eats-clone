import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { ObjectId } from 'typeorm';

export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();

  return request.user;
});

export interface UserAfterAuth {
  id: ObjectId;
}
