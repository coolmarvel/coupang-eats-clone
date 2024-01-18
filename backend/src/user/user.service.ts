import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { ObjectId, Repository } from 'typeorm';
import { Role } from './enum/user.enum';

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

  async findOne(id: ObjectId) {
    return await this.userRepository.findOneBy({ id });
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  async checkUserIsAdmin(id: ObjectId) {
    const user = await this.userRepository.findOneBy({ id });

    return user.role === Role.Admin;
  }
}
