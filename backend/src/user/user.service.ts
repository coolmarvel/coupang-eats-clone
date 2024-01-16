import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { User, UserDocument } from './model/user.model';
// import { Model } from 'mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  //   constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async findAll() {
    try {
      //   const result = await this.userModel.find({}).exec();

      const result = await this.userRepository.find({});

      return result;
    } catch (error) {
      console.error('findAll Error');
    }
  }

  async createSeed() {
    // const result = await this.userModel.create({
    //   name: 'coolmarvel',
    //   email: 'marvel97@naver.com',
    //   emailVerified: '2023-01-16',
    //   createdAt: new Date().toISOString(),
    //   updatedAt: new Date().toString(),
    // });

    const result = await this.userRepository.save(
      this.userRepository.create({ name: 'test', email: 'test@test.com', emailVerified: new Date('2023-01-16') }),
    );

    return result;
  }
}
