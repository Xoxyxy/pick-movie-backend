import { Module } from '@nestjs/common';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { DatabaseModule } from '../database/database.module';
import { UtilsModule } from '../utils/utils.module';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [DatabaseModule, UtilsModule, FilesModule, NestjsFormDataModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
