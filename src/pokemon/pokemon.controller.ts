import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonDetailResponse } from './interface/pokemon-detail-response.interface';
import { PokemonListResponse } from './interface/pokemon-list-response.interface';
import { catchError, map, Observable, throwError } from 'rxjs';
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
    return this.pokemonService.findOne(+id).pipe(
      map((data: PokemonDetailResponse) => {
        if (data.name === 'pikachu') {
          throw new NotFoundException(
            `El detalle de pikachu ha sido temporalmente deshabilitado`,
          );
        }
        return data;
      }),
      catchError((err) => {
        if (err.response.status === 404)
          throw new NotFoundException(`El recurso no existe`);
        return throwError(err);
      }),
    );
  }
}
