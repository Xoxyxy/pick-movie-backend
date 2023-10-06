import { IsNumber, IsString, IsArray, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MovieDto {
  @IsString()
  @ApiProperty({ example: 'The Godfather', description: 'Movie title' })
  title: string;

  @IsString()
  @ApiProperty({
    example:
      'Don Vito Corleone, head of a mafia family, decides to hand over his empire to his youngest son Michael. However, his decision unintentionally puts the lives of his loved ones in grave danger.',
    description: 'Movie description',
  })
  description: string;

  @IsNumber()
  @ApiProperty({ example: 1972, description: 'Movie year' })
  year: number;

  @Min(0)
  @Max(10)
  @IsNumber()
  @ApiProperty({ example: 8.9, description: 'Movie rating' })
  rating: number;

  @IsArray()
  @ApiProperty({
    example: ['Crime', 'Drama'],
    description: 'Movie genres',
  })
  genres: string[];

  @IsString()
  @ApiProperty({
    example:
      'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg',
    description: 'Movie image',
  })
  image: string;

  @IsArray()
  @ApiProperty({ example: ['United States'], description: 'Movie countries' })
  countrys: string[];
}
