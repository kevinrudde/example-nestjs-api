import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ProfilesService } from '../services/profiles.service';
import { Observable } from 'rxjs';
import { Profile } from '../entities/profile.entity';
import { ProfileSchema } from '../schemas/profile.schema';
import { ProfileUpdateSchema } from '../schemas/profile-update.schema';
import { Character } from '../../characters/entities/character.entity';
import { CharactersService } from '../../characters/services/characters.service';

@Controller('profiles')
export class ProfilesController {

  constructor(
    private readonly profilesService: ProfilesService,
    private readonly charactersService: CharactersService,
  ) {
  }

  @Get(':uuid')
  findByUUID(@Param('uuid') uuid: string): Observable<Profile> {
    return this.profilesService.getByUUID(uuid);
  }

  @Post()
  create(@Body() payload: ProfileSchema): Observable<Profile> {
    return this.profilesService.create(payload);
  }

  @Put(':uuid')
  update(@Param('uuid') uuid: string, @Body() payload: ProfileUpdateSchema): Observable<Profile> {
    return this.profilesService.update(uuid, payload);
  }

  @Get(':uuid/characters')
  getCharactersOfProfile(@Param('uuid') uuid: string): Observable<Character[]> {
    return this.charactersService.findByProfileUUID(uuid);
  }
}
