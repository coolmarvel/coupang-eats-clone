import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { ObjectId, Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entity/user.entity';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from './entity/refresh-token.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(RefreshToken) private refreshTokenRepository: Repository<RefreshToken>,
  ) {}

  async signup(email: string, password: string) {
    let error: any;
    try {
      const user = await this.userService.findOneByEmail(email);
      if (user) throw new BadRequestException();

      const saltRounds = 10;
      const hash = await bcrypt.hash(password, saltRounds);

      const userEntity = await this.userRepository.save(this.userRepository.create({ email, password: hash }));

      const accessToken = this.generateAccessToken(userEntity.id);

      const refreshTokenEntity = await this.refreshTokenRepository.save(
        this.refreshTokenRepository.create({
          user: { id: userEntity.id },
          token: this.generateRefreshToken(userEntity.id),
        }),
      );

      return { id: userEntity.id, accessToken, refreshToken: refreshTokenEntity.id };
    } catch (e) {
      error = e;
    } finally {
      if (error) throw error;
    }
  }

  private generateAccessToken(userId: ObjectId) {
    const payload = { sub: userId, tokenType: 'access' };

    return this.jwtService.sign(payload, { expiresIn: '1d' });
  }

  private generateRefreshToken(userId: ObjectId) {
    const payload = { sub: userId, tokenType: 'refresh' };

    return this.jwtService.sign(payload, { expiresIn: '30d' });
  }
}
