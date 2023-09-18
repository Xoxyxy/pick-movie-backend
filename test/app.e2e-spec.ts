import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppController } from '../src/app.controller';
import { AppService } from '../src/app.service';
import { AdminController } from '../src/admin/admin.controller';
import { AdminService } from '../src/admin/admin.service';
import { DatabaseService } from '../src/database/database.service';
import { UtilsService } from '../src/utils/utils.service';
import { mockDto } from './mocks/dto.mock';

describe('AppController (E2E)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AppController, AdminController],
      providers: [DatabaseService, AppService, AdminService, UtilsService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/ (GET)', () => {
    it('success', async () => {
      const res = await request(app.getHttpServer()).get('/');
      expect(res.status).toBe(200);
    });
  });

  describe('/:id (GET)', () => {
    it('success', async () => {
      await request(app.getHttpServer()).post('/admin/create').send(mockDto);
      const res = await request(app.getHttpServer()).get('/1');
      expect(res.body.id).toBe(1);
      expect(res.status).toBe(200);
    });

    it('fail - (404)', async () => {
      const res = await request(app.getHttpServer()).get('/9999');
      expect(res.status).toBe(404);
    });

    it('fail - (400)', async () => {
      const res = await request(app.getHttpServer()).get('/0');
      expect(res.status).toBe(400);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
