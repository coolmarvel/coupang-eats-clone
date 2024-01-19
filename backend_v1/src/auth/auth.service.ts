import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
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

      return { id: userEntity.id, accessToken, refreshToken: refreshTokenEntity.token };
    } catch (e) {
      error = e;
    } finally {
      if (error) throw error;
    }
  }

  async signin(email: string, password: string) {
    const user = await this.validateUser(email, password);

    const refreshToken = this.generateRefreshToken(user.id);
    await this.createRefreshTokenUsingUser(user.id, refreshToken);

    return { accessToken: this.generateAccessToken(user.id), refreshToken };
  }

  async refresh(token: string, userId: ObjectId) {
    const refreshTokenEntity = await this.refreshTokenRepository.findOneBy({ token });
    if (!refreshTokenEntity) throw new BadRequestException();

    const accessToken = this.generateAccessToken(userId);
    const refreshToken = this.generateRefreshToken(userId);
    refreshTokenEntity.token = refreshToken;

    await this.refreshTokenRepository.save(refreshTokenEntity);

    return { accessToken, refreshToken };
  }

  private generateAccessToken(userId: ObjectId) {
    const payload = { sub: userId, tokenType: 'access' };

    return this.jwtService.sign(payload, { expiresIn: '1d' });
  }

  private generateRefreshToken(userId: ObjectId) {
    const payload = { sub: userId, tokenType: 'refresh' };

    return this.jwtService.sign(payload, { expiresIn: '30d' });
  }

  private async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findOneByEmail(email);
    if (!user) throw new UnauthorizedException();

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException();

    return user;
  }

  private async createRefreshTokenUsingUser(userId: ObjectId, refreshToken: string) {
    let refreshTokenEntity = await this.refreshTokenRepository.findOneBy({ user: { id: userId } });

    if (refreshTokenEntity) refreshTokenEntity.token = refreshToken;
    else refreshTokenEntity = this.refreshTokenRepository.create({ user: { id: userId }, token: refreshToken });

    await this.refreshTokenRepository.save(refreshTokenEntity);
  }
}