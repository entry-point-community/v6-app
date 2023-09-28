import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'log', 'debug', 'verbose', 'warn'],
  });

  app.use(helmet());
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://v6-academy-web.vercel.app',
      'https://v6-academy.com',
      'https://www.v6-academy.com',
    ],
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(2000);
}
bootstrap();
