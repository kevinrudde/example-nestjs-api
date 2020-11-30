import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from '../entities/profile.entity';
import { Repository } from 'typeorm';
import { from, Observable } from 'rxjs';

@Injectable()
export class ProfilesRepository {

  constructor(
    @InjectRepository(Profile) private readonly profileRepository: Repository<Profile>,
  ) {
  }

  findByUUID(uuid: string): Observable<Profile> {
    return from(this.profileRepository.findOne({ uuid }));
  }

  persist(profile: Profile): Observable<Profile> {
    return from(this.profileRepository.save(profile));
  }
}
