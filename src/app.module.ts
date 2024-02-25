import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [PokemonModule, CommonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
