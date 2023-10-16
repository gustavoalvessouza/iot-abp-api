import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();

  const { PORT } = process.env;

  const app = await NestFactory.create(AppModule);
  await app.listen(PORT || 3000);
}
bootstrap();
