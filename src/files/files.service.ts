import { HttpException, Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';

@Injectable()
export class FilesService {
  async createFile(file: Express.Multer.File): Promise<string> {
    try {
      const fileName = `${uuid.v4()}.jpg`;
      const filePath = `${path}/static`;
      await ensureDir(filePath);
      await writeFile(`${filePath}/${fileName}`, file.buffer);
      return fileName;
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }
}
