import { Injectable } from '@nestjs/common';
import { CharactersRepository } from '../repositories/characters.repository';
import { Observable, pipe } from 'rxjs';
import { Character } from '../entities/character.entity';
import { CharacterSchema } from '../schemas/character.schema';
import { ProfilesService } from '../../profiles/services/profiles.service';
import { Profile } from '../../profiles/entities/profile.entity';
import { map, switchMap, tap } from 'rxjs/operators';
import { ProfilesException } from '../../profiles/exceptions/profiles.exception';
import { Inventory } from '../entities/inventory.entity';
import { UpdateCharacterSchema } from '../schemas/update-character.schema';
import { CharactersException } from '../exceptions/characters.exception';

@Injectable()
export class CharactersService {

  constructor(
    private readonly charactersRepository: CharactersRepository,
    private readonly profilesService: ProfilesService,
  ) {
  }

  findById(id: string): Observable<Character> {
    return this.charactersRepository.findById(id);
  }

  findByProfileUUID(uuid: string): Observable<Character[]> {
    return this.charactersRepository.findByProfileUUID(uuid);
  }

  findInventoryByCharacter(id: string): Observable<Inventory> {
    return this.charactersRepository.findInventoryOfCharacter(id);
  }

  persist(character: Character): Observable<Character> {
    return this.charactersRepository.persist(character);
  }

  createCharacter(payload: CharacterSchema): Observable<Character> {
    return this.profilesService.getByUUID(payload.profileId).pipe(
      switchMap((profile: Profile) => {
        if (!profile) {
          throw new ProfilesException(ProfilesException.NOT_FOUND);
        }

        const character = {
          profileId: profile.uuid,
          inventory: {} as Inventory,
        } as Character;

        return this.persist(character);
      }),
    );
  }

  // TODO: implement checks like is new level higher
  updateCharacter(id: string, payload: UpdateCharacterSchema): Observable<Character> {
    return this.findById(id).pipe(
      switchMap((character: Character) => {
        if (!character) {
          throw new CharactersException(CharactersException.NOT_FOUND);
        }

        if (payload.level) {
          character.level = payload.level;
        }

        if (payload.experience) {
          character.experience = payload.experience;
        }

        return this.persist(character);
      }),
    );
  }
}
