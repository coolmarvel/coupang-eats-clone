import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
// import { User, UserSchema } from './model/user.model';

@Module({
  imports: [
    // MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
