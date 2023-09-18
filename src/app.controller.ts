import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { AppService } from './app.service';
import { UtilsService } from './utils/utils.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly utilsService: UtilsService,
  ) {}

  @Get('/')
  async getAll() {
    const res = await this.appService.getAllMovies();
    return res;
  }

  @Get('/:id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    this.utilsService.validateId(id);
    const res = await this.appService.getMovieById(id);
    if (res) {
      return res;
    } else {
      throw new NotFoundException();
    }
  }
}
