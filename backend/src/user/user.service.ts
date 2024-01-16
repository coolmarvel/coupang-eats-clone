import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async findAll(page: number, size: number) {
    try {
      return await this.userRepository.find({ skip: (page - 1) * size, take: size });
    } catch (error) {
      console.error('findAll Error');
    }
  }

  async findOne(id: string) {
    return 'find user';
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  async createSeed() {
    const result = await this.userRepository.save(
      this.userRepository.create({ name: 'coolmarvel', email: 'marvel97@naver.com', emailVerified: new Date('2023-01-16') }),
    );

    return result;
  }
}
