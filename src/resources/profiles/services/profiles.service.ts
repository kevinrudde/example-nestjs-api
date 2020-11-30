import { Injectable } from '@nestjs/common';
import { ProfilesRepository } from '../repositories/profiles.repository';
import { Observable } from 'rxjs';
import { Profile } from '../entities/profile.entity';
import { ProfileSchema } from '../schemas/profile.schema';
import { GroupsService } from './groups.service';
import { map, switchMap } from 'rxjs/operators';
import { Group } from '../entities/group.entity';
import { ProfilesException } from '../exceptions/profiles.exception';
import { ProfileUpdateSchema } from '../schemas/profile-update.schema';

@Injectable()
export class ProfilesService {

  constructor(
    private readonly profilesRepository: ProfilesRepository,
    private readonly groupsService: GroupsService,
  ) {
  }

  getByUUID(uuid: string): Observable<Profile> {
    return this.profilesRepository.findByUUID(uuid).pipe(
      map((profile: Profile) => {
        if (!profile) {
          throw new ProfilesException(ProfilesException.NOT_FOUND);
        }

        return profile;
      }),
    );
  }

  create(payload: ProfileSchema): Observable<Profile> {
    const profile = {
      ...payload,
    } as Profile;

    return this.profilesRepository.findByUUID(payload.uuid).pipe(
      switchMap((foundProfile: Profile) => {
        if (foundProfile) {
          throw new ProfilesException(ProfilesException.ALREADY_EXISTS);
        }

        return this.groupsService.getDefaultGroup().pipe(
          switchMap((defaultGroup: Group) => {
            profile.group = defaultGroup;

            return this.persist(profile);
          }),
        );
      })
    );
  }

  persist(profile: Profile): Observable<Profile> {
    return this.profilesRepository.persist(profile);
  }

  update(uuid: string, payload: ProfileUpdateSchema): Observable<Profile> {
    return this.profilesRepository.findByUUID(uuid).pipe(
      switchMap((profile: Profile) => {
        if (!profile) {
          throw new ProfilesException(ProfilesException.NOT_FOUND);
        }

        if (payload.banPoints) {
          profile.banPoints = payload.banPoints;
        }
        if (payload.language) {
          profile.language = payload.language;
        }
        if (payload.lastOnline) {
          profile.lastOnline = payload.lastOnline;
        }
        if (payload.name) {
          profile.name = payload.name;
        }
        if (payload.permissions) {
          profile.permissions = payload.permissions;
        }
        if (payload.teamspeakUniqueId) {
          profile.teamspeakUniqueId = payload.teamspeakUniqueId;
        }
        if (payload.timePlayed) {
          profile.timePlayed = payload.timePlayed;
        }

        if (payload.group) {
          return this.groupsService.findByName(payload.group).pipe(
            switchMap((group: Group) => {
              profile.group = group;

              return this.persist(profile);
            }),
          );
        }

        return this.persist(profile);
      }),
    );
  }
}
