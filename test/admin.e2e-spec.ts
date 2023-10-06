import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AdminController } from '../src/admin/admin.controller';
import { AdminService } from '../src/admin/admin.service';
import { DatabaseService } from '../src/database/database.service';
import { UtilsService } from '../src/utils/utils.service';
import { mockDto } from './mocks/dto.mock';

describe('AdminController (E2E)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
      providers: [DatabaseService, AdminService, UtilsService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('admin/create (POST)', () => {
    it('success', async () => {
      const res = await request(app.getHttpServer())
        .post('/admin/create')
        .send(mockDto);

      expect(res.status).toBe(201);
      expect(res.body.id).toBeGreaterThan(0);
    });

    it('fail', async () => {
      const res = await request(app.getHttpServer())
        .post('/admin/create')
        .send({});

      expect(res.status).toBe(400);
    });
  });

  describe('admin/update/:id (PATCH)', () => {
    it('success', async () => {
      const res = await request(app.getHttpServer())
        .patch('/admin/update/1')
        .send({
          title: 'update',
        });

      expect(res.status).toBe(200);
      expect(res.body.id).toBe(1);
    });

    it('fail', async () => {
      const res = await request(app.getHttpServer())
        .patch('/admin/update/0')
        .send({});

      expect(res.status).toBe(400);
    });
  });

  describe('admin/delete/:id (DELETE)', () => {
    it('success', async () => {
      const res = await request(app.getHttpServer()).delete('/admin/delete/1');
      expect(res.body.id).toBe(1);
      expect(res.status).toBe(200);
    });

    it('fail', async () => {
      const res = await request(app.getHttpServer()).delete('/admin/delete/0');
      expect(res.status).toBe(400);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
