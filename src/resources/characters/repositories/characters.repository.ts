import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Character } from '../entities/character.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Inventory } from '../entities/inventory.entity';
import { map } from 'rxjs/operators';
import { CharactersException } from '../exceptions/characters.exception';

@Injectable()
export class CharactersRepository {

  constructor(
    @InjectRepository(Character) private readonly repository: Repository<Character>,
  ) {
  }

  findById(id: string): Observable<Character> {
    return from(this.repository.findOne({ id }));
  }

  findByProfileUUID(uuid: string): Observable<Character[]> {
    return from(this.repository.find({ profileId: uuid }));
  }

  findInventoryOfCharacter(id: string): Observable<Inventory> {
    return from(this.repository.createQueryBuilder('character').where('character.id = :id', { id }).leftJoinAndSelect('character.inventory', 'inventory').getOne()).pipe(
      map((character: Character) => {
        if (!character) {
          throw new CharactersException(CharactersException.NOT_FOUND);
        }
        return character.inventory;
      }),
    );
  }

  persist(character: Character): Observable<Character> {
    return from(this.repository.save(character));
  }
}
