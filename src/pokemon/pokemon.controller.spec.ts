import { Test, TestingModule } from '@nestjs/testing';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';
import { PokemonListResponse } from './interface/pokemon-list-response.interface';
import { PokemonDetailResponse } from './interface/pokemon-detail-response.interface';
import { NotFoundException } from '@nestjs/common';
import { of, throwError } from 'rxjs';

describe('PokemonController', () => {
  let controller: PokemonController;
  let service: PokemonService;
  const findAllResponse: PokemonListResponse = {
    next: '',
    previous: undefined,
    count: 1,
    results: [
      {
        name: 'bulbasaur',
        url: 'some_url',
      },
    ],
  };
  const detailResponse: PokemonDetailResponse = {
    base_experience: 0,
    height: 0,
    id: 0,
    is_default: false,
    location_area_encounters: '',
    weight: 0,
    name: 'bulbasaur',
    order: 1,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PokemonController],
      providers: [
        {
          provide: PokemonService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(findAllResponse),
            findOne: jest.fn().mockResolvedValue(detailResponse),
          },
        },
      ],
    }).compile();

    controller = module.get<PokemonController>(PokemonController);
    service = module.get<PokemonService>(PokemonService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of pokemons', async () => {
    await expect(controller.findAll({ limit: 10, offset: 0 })).resolves.toEqual(
      findAllResponse,
    );
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return a single pokemon', (done) => {
    jest.spyOn(service, 'findOne').mockImplementation(() => of(detailResponse));

    controller.findOne('1').subscribe({
      next: (resp) => {
        expect(resp).toEqual(detailResponse);
        done();
      },
    });
  });

  it('should throw a NotFoundException if the pokemon name is pikachu', (done) => {
    detailResponse.name = 'pikachu';
    jest.spyOn(service, 'findOne').mockImplementation(() => of(detailResponse));

    controller.findOne('1').subscribe({
      error: (err) => {
        expect(err).toBeInstanceOf(NotFoundException);
        expect(err.response.message).toBe(
          `El detalle de pikachu ha sido temporalmente deshabilitado`,
        );
        done();
      },
    });
  });

  it('should handle 404 error from the service', (done) => {
    const errorResponse = {
      response: {
        status: 404,
      },
    };

    jest
      .spyOn(service, 'findOne')
      .mockImplementation(() => throwError(() => errorResponse));

    controller.findOne('1').subscribe({
      error: (err) => {
        expect(err).toBeInstanceOf(NotFoundException);
        expect(err.response.message).toBe(`El recurso no existe`);
        done();
      },
    });
  });
});
