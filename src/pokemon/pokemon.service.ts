import { Injectable } from '@nestjs/common';
import { AxiosAdapterService } from '../common/axios.adapter/axios.adapter.service';
import { PokemonListResponse } from './interface/pokemon-list-response.interface';
import { PokemonDetailResponse } from './interface/pokemon-detail-response.interface';
import { Observable } from 'rxjs';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class PokemonService {
  constructor(private readonly http: AxiosAdapterService) {}

  findAll(paginationDto: PaginationDto): Observable<PokemonListResponse> {
    return this.http.get<PokemonListResponse>(
      `https://pokeapi.co/api/v2/pokemon?limit=${paginationDto.limit}&offset=${paginationDto.offset}`,
    ); // TODO implement url from env
  }

  findOne(id: number): Observable<PokemonDetailResponse> {
    return this.http.get<PokemonDetailResponse>(
      `https://pokeapi.co/api/v2/pokemon/${id}`,
    ); // TODO implement url from env
  }
}
