import { Injectable } from '@nestjs/common';
import { AxiosAdapterService } from '../common/axios.adapter/axios.adapter.service';
import { PokemonListResponse } from './interface/pokemon-list-response.interface';
import { PokemonDetailResponse } from './interface/pokemon-detail-response.interface';
import { Observable } from 'rxjs';
import { PaginationDto } from '../common/dto/pagination.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PokemonService {
  private readonly baseUrl: string;

  constructor(
    private readonly http: AxiosAdapterService,
    private readonly configService: ConfigService,
  ) {
    this.baseUrl = configService.get<string>('pokemonApi');
  }

  findAll(paginationDto: PaginationDto): Observable<PokemonListResponse> {
    return this.http.get<PokemonListResponse>(
      `${this.baseUrl}/v2/pokemon?limit=${paginationDto.limit}&offset=${paginationDto.offset}`,
    );
  }

  findOne(id: number): Observable<PokemonDetailResponse> {
    return this.http.get<PokemonDetailResponse>(
      `${this.baseUrl}/v2/pokemon/${id}`,
    );
  }
}
