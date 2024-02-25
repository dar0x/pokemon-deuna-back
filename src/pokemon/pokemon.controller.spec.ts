import { Test, TestingModule } from '@nestjs/testing';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';
import { PokemonListResponse } from './interface/pokemon-list-response.interface';
import { PokemonDetailResponse } from './interface/pokemon-detail-response.interface';

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
    name: 'Pikachu',
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

  it('should return a single pokemon', async () => {
    await expect(controller.findOne('1')).resolves.toEqual(detailResponse);
    expect(service.findOne).toHaveBeenCalledWith(1);
  });
});
