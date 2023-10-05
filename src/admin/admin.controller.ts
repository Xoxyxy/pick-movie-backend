import {
  Body,
  Controller,
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
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { UtilsService } from '../utils/utils.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { MovieDto } from '../dto/movie.dto';
import { MovieEntity } from '../database/entitys/movie.entity';

@ApiTags('/api/admin')
@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly utilsService: UtilsService,
  ) {}

  @ApiOperation({ summary: 'Create movie' })
  @ApiResponse({ status: 201, type: MovieEntity })
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

  @ApiOperation({ summary: 'Update movie' })
  @ApiResponse({ status: 200, type: MovieEntity })
  @Patch('/update/:id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: MovieDto) {
    this.utilsService.validateId(id);
    const res = await this.adminService.updateMovie(id, dto);
    return res;
  }

  @ApiOperation({ summary: 'Delete movie' })
  @ApiResponse({ status: 200, type: MovieEntity })
  @Delete('/delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    this.utilsService.validateId(id);
    const res = await this.adminService.deleteMovie(id);
    return res;
  }
}
