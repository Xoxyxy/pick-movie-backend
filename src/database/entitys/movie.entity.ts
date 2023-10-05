import { ApiProperty } from '@nestjs/swagger';
import { Movie } from '@prisma/client';

export class MovieEntity implements Movie {
  @ApiProperty({ example: 1, description: 'Movie id' })
  id: number;

  @ApiProperty({ example: 'The Godfather', description: 'Movie title' })
  title: string;

  @ApiProperty({
    example:
      'Don Vito Corleone, head of a mafia family, decides to hand over his empire to his youngest son Michael. However, his decision unintentionally puts the lives of his loved ones in grave danger.',
    description: 'Movie description',
  })
  description: string;

  @ApiProperty({ example: 1972, description: 'Movie year' })
  year: number;

  @ApiProperty({ example: 8.9, description: 'Movie rating' })
  rating: number;

  @ApiProperty({
    example: ['Crime', 'Drama'],
    description: 'Movie genres',
  })
  genres: string[];

  @ApiProperty({
    example:
      'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg',
    description: 'Movie image',
  })
  image: string;

  @ApiProperty({ example: ['United States'], description: 'Movie countries' })
  countrys: string[];
}
