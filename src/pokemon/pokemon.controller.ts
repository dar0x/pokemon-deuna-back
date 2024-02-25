import { Controller, Get, Param } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonDetailResponse } from './interface/pokemon-detail-response.interface';
import { PokemonListResponse } from './interface/pokemon-list-response.interface';
import { Observable } from 'rxjs';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  findAll(): Observable<PokemonListResponse> {
    return this.pokemonService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<PokemonDetailResponse> {
    return this.pokemonService.findOne(+id);
  }
}
