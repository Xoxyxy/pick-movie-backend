import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  Delete,
  Param,
  Patch,
  BadRequestException,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { MovieDto } from '../dto/movie.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('/')
  async get() {
    const res = await this.adminService.getMovies();
    return res;
  }

  @UsePipes(new ValidationPipe())
  @Post('/create')
  async create(@Body() dto: MovieDto) {
    const res = await this.adminService.createMovie(dto);
    return res;
  }

  @Patch('/update/:id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: MovieDto) {
    if (id < 1) {
      throw new BadRequestException('Invalid id');
    }
    const res = await this.adminService.updateMovie(id, dto);
    return res;
  }

  @Delete('/delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    if (id < 1) {
      throw new BadRequestException('Invalid id');
    }
    const res = await this.adminService.deleteMovie(id);
    return res;
  }
}
