import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class UtilsService {
  validateId(id: number) {
    if (id < 1) {
      throw new BadRequestException('Invalid id');
    }
  }
}
