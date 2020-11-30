import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { Reflector } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import * as fs from 'fs';
import { Connection } from 'typeorm';
import { AuthGuard } from '../src/core/auth/auth.guard';

export const setUpE2E = async (): Promise<INestApplication> => {
  let app: INestApplication;

  const moduleFixture = await Test.createTestingModule({
    imports: [
      AppModule,
    ],
  })
  .compile();

  // eslint-disable-next-line prefer-const
  app = moduleFixture.createNestApplication();

  const reflector = app.get(Reflector);
  app.useGlobalGuards(new AuthGuard(reflector));

  await app.init();
  return app;
};

export const get = (app: INestApplication, url: string): request.Test => {
  return request(app.getHttpServer())
  .get(url)
  .set('nest-token', '<placeholder>');
};

export const post = (app: INestApplication, url: string, payload: any): request.Test => {
  return request(app.getHttpServer())
  .post(url)
  .send(payload)
  .set('nest-token', '<placeholder>');
};

export const put = (app: INestApplication, url: string, payload: any): request.Test => {
  return request(app.getHttpServer())
  .put(url)
  .send(payload)
  .set('nest-token', '<placeholder>');
};

export const executeFixture = async (app: INestApplication, file: string): Promise<void> => {
  const connection = app.get(Connection);

  const queries: string[] = fs
    .readFileSync(__dirname + '/../' + file)
    .toString()
    .replace(/\r?\n|\r/g, '')
    .split(';')
    .filter((query) => query?.length);


  for (let i = 0; i < queries.length; i++) {
    await connection.query(queries[i]);
  }
};
