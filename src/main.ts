import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true, // 유저가 보낸 타입을 원하는 타입으로 변환해준다.
    }),
  );
  await app.listen(3000);
}
//파이프 : 코드가 지나가는 곳.
// 미들웨어와 비슷한 개념
bootstrap();
