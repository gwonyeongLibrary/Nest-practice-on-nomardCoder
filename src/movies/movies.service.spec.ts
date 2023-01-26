import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  //테스트를 하기 전 실행
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });
  // individual test
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should return a movie', () => {
      service.create({
        title: 'Test Movie',
        gerners: ['test'],
        year: 2000,
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    it('should throw 404 error', () => {
      try {
        service.getOne(999);
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
        expect(err.message).toEqual('Movie with ID 999: Not Fount');
      }
    });
    describe('deleteOne', () => {
      it('deletes a movie', () => {
        service.create({
          title: 'Test Movie',
          gerners: ['test'],
          year: 2000,
        });
        const allMovies = service.getAll();
        service.deleteOne(1);
        const afterDelete = service.getAll();
        expect(afterDelete.length).toEqual(allMovies.length - 1);
      });
      it('should return a 404', () => {
        try {
          service.deleteOne(999);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
        }
      });
    });
    describe('create', () => {
      it('should create a movie', () => {
        const beforeCreate = service.getAll().length;
        service.create({
          title: 'Test Movie',
          gerners: ['test'],
          year: 2000,
        });
        const afterCreate = service.getAll().length;
        console.log(beforeCreate, afterCreate);
        expect(afterCreate).toBeGreaterThan(beforeCreate);
      });
    });
  });
});
