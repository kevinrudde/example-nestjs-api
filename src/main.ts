import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import * as swStats from 'swagger-stats';
import { AuthGuard } from './core/auth/auth.guard';
import { ValidationPipe } from '@nestjs/common';
import { NestExceptionFilter } from './core/exception/Nest-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.enableCors();
  await app.register(swStats.getFastifyPlugin);

  const reflector = app.get(Reflector);
  app.useGlobalGuards(new AuthGuard(reflector));
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new NestExceptionFilter());

  await app.listen(3000, '0.0.0.0');
}

// noinspection JSIgnoredPromiseFromCall
bootstrap();
