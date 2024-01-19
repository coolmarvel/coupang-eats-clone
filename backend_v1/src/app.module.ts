import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImageModule } from './image/image.module';
import { MenuModule } from './menu/menu.module';
import { OrderModule } from './order/order.module';
import { ReviewModule } from './review/review.module';
import { StoreModule } from './store/store.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import jwtConfig from './config/jwt.config';
import mongoConfig from './config/mongo.config';
import swaggerConfig from './config/swagger.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [jwtConfig, mongoConfig, swaggerConfig] }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        let obj: TypeOrmModuleOptions = {
          type: 'mongodb',
          url: configService.get('mongo.uri'),
          database: 'coupang-eats',
          autoLoadEntities: true,
          synchronize: false,
        };

        if (configService.get('STAGE') === 'local') obj = Object.assign(obj, { logging: true });
        return obj;
      },
    }),
    ImageModule,
    MenuModule,
    OrderModule,
    ReviewModule,
    StoreModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
