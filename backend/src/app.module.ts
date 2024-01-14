import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImageModule } from './image/image.module';
import { MenuModule } from './menu/menu.module';
import { OrderModule } from './order/order.module';
import { ReviewModule } from './review/review.module';
import { StoreModule } from './store/store.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ImageModule, MenuModule, OrderModule, ReviewModule, StoreModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
