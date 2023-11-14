import { Test, TestingModule } from '@nestjs/testing';
import { Body, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('authentication test', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });


  it('/signup', () => {
    return request(app.getHttpServer())
      .post('/auth/signup').send({email: 'z2.ahmadi@yahoo.com', password: '123456'})
      .expect(201)
      .then(res => {
        const { id, email } = res.body;
        expect(id).toBeDefined;
        expect(email).toBe('z2.ahmadi@yahoo.com');
      });
      
  });

});
