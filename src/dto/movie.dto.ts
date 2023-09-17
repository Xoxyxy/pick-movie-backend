import { IsNumber, IsString, IsArray, Min, Max } from 'class-validator';

export class MovieDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  year: number;

  @Min(0)
  @Max(10)
  @IsNumber()
  rating: number;

  @IsArray()
  genres: string[];

  @IsString()
  image: string;

  @IsArray()
  countrys: string[];
}
