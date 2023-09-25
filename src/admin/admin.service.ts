import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { FilesService } from '../files/files.service';
import { MovieDto } from '../dto/movie.dto';

@Injectable()
export class AdminService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly filesService: FilesService,
  ) {}

  async getMovies() {
    try {
      return await this.databaseService.movie.findMany();
    } catch (error) {
      return new NotFoundException('No movies found');
    }
  }

  async createMovie(dto: MovieDto, img: Express.Multer.File) {
    const file = await this.filesService.createFile(img);
    return await this.databaseService.movie.create({
      data: { ...dto, image: file },
    });
  }

  async updateMovie(id: number, dto: MovieDto) {
    return await this.databaseService.movie.update({
      where: {
        id,
      },
      data: dto,
    });
  }

  async deleteMovie(id: number) {
    return await this.databaseService.movie.delete({
      where: {
        id,
      },
    });
  }
}
