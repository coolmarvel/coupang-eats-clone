import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';

import * as basicAuth from 'express-basic-auth';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const stage = configService.get('STAGE');

  const SWAGGER_ENVS = ['local', 'dev'];
  if (SWAGGER_ENVS.includes(stage)) {
    app.use(
      ['/docs', 'docs-json'],
      basicAuth({ challenge: true, users: { [configService.get('swagger.user')]: configService.get('swagger.pass') } }),
    );
    const config = new DocumentBuilder()
      .setTitle('Coupang-Eats Clone Project')
      .setDescription('Coupang-Eats Backend Project')
      .setVersion('1.0.0')
      .addBearerAuth()
      .build();
    const customOptions: SwaggerCustomOptions = { swaggerOptions: { persistAuthorization: true } };
    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('docs', app, document, customOptions);
  }

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(3000);
}
bootstrap();
