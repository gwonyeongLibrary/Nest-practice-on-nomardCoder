import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

// 베이스 라우터 "/movile"를 붙여야 접속
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }
  @Get('/search')
  search(@Query('year') searchingYear: string) {
    return `We are searchong for a movie to title ${searchingYear}`;
  }

  @Get('/:id')
  getOne(@Param('id') movieId: string) {
    return this.moviesService.getOne(movieId);
  }

  @Post()
  create(@Body() movieData) {
    console.log(movieData);
    return this.moviesService.create(movieData);
  }

  @Delete('/:id')
  remove(@Param('id') movieId: string) {
    return this.moviesService.deleteOne(movieId);
  }

  @Patch('/:id')
  patch(@Param('id') movieId: string, @Body() updateData) {
    return {
      updatedMovie: movieId,
      ...updateData, // object
    };
  }
}
