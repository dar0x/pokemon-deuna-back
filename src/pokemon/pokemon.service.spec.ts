import { PokemonService } from './pokemon.service';
import { Test, TestingModule } from '@nestjs/testing';
import { PokemonListResponse } from './interface/pokemon-list-response.interface';
import { AxiosAdapterService } from '../common/axios.adapter/axios.adapter.service';
import { of } from 'rxjs';
import { PokemonDetailResponse } from './interface/pokemon-detail-response.interface';
import { PaginationDto } from '../common/dto/pagination.dto';
import { ConfigService } from '@nestjs/config';

describe('PokemonService', () => {
  let service: PokemonService;
  let axiosAdapter: AxiosAdapterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PokemonService, AxiosAdapterService, ConfigService],
    }).compile();

    const config = module.get<ConfigService>(ConfigService);
    service = module.get<PokemonService>(PokemonService);
    axiosAdapter = module.get<AxiosAdapterService>(AxiosAdapterService);

    config.set('pokemonApi', 'https://pokeapi.co/api');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a list of pokemons', (done) => {
    const mockResponse: PokemonListResponse = {
      count: 1302,
      next: 'http://api.com/next',
      previous: null,
      results: [
        {
          name: 'bulbasaur',
          url: 'https://api.com/1/',
        },
      ],
    };
    const queryParams: PaginationDto = {
      limit: 10,
      offset: 0,
    };
    jest.spyOn(axiosAdapter, 'get').mockImplementation(() => of(mockResponse));

    service.findAll(queryParams).subscribe((response: PokemonListResponse) => {
      expect(response).toEqual(mockResponse);
      expect(axiosAdapter.get).toBeCalledTimes(1);
      expect(axiosAdapter.get).toBeCalledWith(
        'https://pokeapi.co/api/v2/pokemon?limit=10&offset=0',
      );
      done();
    });
  });

  it('should return data for a single pokemon', (done) => {
    const mockResponse: PokemonDetailResponse = {
      base_experience: 0,
      height: 7,
      id: 0,
      is_default: false,
      location_area_encounters: '',
      name: 'charizard',
      order: 0,
      weight: 0,
    };
    jest.spyOn(axiosAdapter, 'get').mockImplementation(() => of(mockResponse));

    service.findOne(1).subscribe((response: PokemonDetailResponse) => {
      expect(response).toEqual(mockResponse);
      expect(axiosAdapter.get).toBeCalledTimes(1);
      done();
    });
  });
});
