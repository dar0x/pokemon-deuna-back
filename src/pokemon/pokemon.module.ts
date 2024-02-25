import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { CommonModule } from '../common/common.module';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports: [CommonModule],
})
export class PokemonModule {}
