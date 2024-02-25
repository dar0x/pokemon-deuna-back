import { Controller, Get, Param, Query } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonDetailResponse } from './interface/pokemon-detail-response.interface';
import { PokemonListResponse } from './interface/pokemon-list-response.interface';
import { Observable } from 'rxjs';
import { PaginationDto } from '../common/dto/pagination.dto';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  findAll(
    @Query() paginationDto: PaginationDto,
  ): Observable<PokemonListResponse> {
    return this.pokemonService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<PokemonDetailResponse> {
    return this.pokemonService.findOne(+id);
  }
}
