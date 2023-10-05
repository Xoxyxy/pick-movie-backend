import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';
import { UtilsService } from './utils/utils.service';
import { MovieEntity } from './database/entitys/movie.entity';

@ApiTags('/api')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly utilsService: UtilsService,
  ) {}

  @ApiOperation({ summary: 'Get all movies' })
  @ApiResponse({ status: 200, type: [MovieEntity] })
  @Get('/')
  async getAll() {
    const res = await this.appService.getAllMovies();
    return res;
  }

  @ApiOperation({ summary: 'Get movie by id' })
  @ApiResponse({ status: 200, type: MovieEntity })
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
