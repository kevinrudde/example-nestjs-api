import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CharactersService } from '../services/characters.service';
import { Observable } from 'rxjs';
import { Character } from '../entities/character.entity';
import { CharacterSchema } from '../schemas/character.schema';
import { UpdateCharacterSchema } from '../schemas/update-character.schema';

@Controller('characters')
export class CharactersController {

  constructor(
    private readonly charactersService: CharactersService,
  ) {
  }

  @Get(':id')
  getById(@Param('id') id: string): Observable<Character> {
    return this.charactersService.findById(id);
  }

  @Post()
  createCharacter(@Body() payload: CharacterSchema): Observable<Character> {
    return this.charactersService.createCharacter(payload);
  }

  @Put(':id')
  updateCharacter(@Param('id') id: string, @Body() payload: UpdateCharacterSchema): Observable<Character> {
    return this.charactersService.updateCharacter(id, payload);
  }
}
