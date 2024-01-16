import { Controller, Get, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(@Query() { page, size }) {
    return await this.userService.findAll((page = 1), (size = 10));
  }

  @Post()
  async createSeed() {
    return await this.userService.createSeed();
  }
}
