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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { UtilsService } from '../utils/utils.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { MovieDto } from '../dto/movie.dto';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly utilsService: UtilsService,
  ) {}

  @Get('/')
  async get() {
    const res = await this.adminService.getMovies();
    return res;
  }

  @UsePipes(new ValidationPipe())
  @Post('/create')
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() dto: MovieDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    const res = await this.adminService.createMovie(dto, image);
    return res;
  }

  @Patch('/update/:id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: MovieDto) {
    this.utilsService.validateId(id);
    const res = await this.adminService.updateMovie(id, dto);
    return res;
  }

  @Delete('/delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    this.utilsService.validateId(id);
    const res = await this.adminService.deleteMovie(id);
    return res;
  }
}
