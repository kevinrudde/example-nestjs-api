import { Injectable } from '@nestjs/common';
import { GroupsRepository } from '../repositories/groups.repository';
import { Observable } from 'rxjs';
import { Group } from '../entities/group.entity';
import { map, tap } from 'rxjs/operators';
import { GroupsException } from '../exceptions/groups.exception';

@Injectable()
export class GroupsService {
  constructor(
    private readonly groupsRepository: GroupsRepository,
  ) {
  }

  getByName(name: string): Observable<Group> {
    return this.findByName(name).pipe(
      tap((group: Group) => {
        if (!group) {
          throw new GroupsException(GroupsException.GROUP_NOT_FOUND);
        }
    })
    );
  }

  findByName(name: string): Observable<Group> {
    return this.groupsRepository.findByName(name);
  }

  getDefaultGroup(): Observable<Group> {
    return this.findByName('player').pipe(
      map((defaultGroup: Group) => {
        if (!defaultGroup) {
          throw new GroupsException(GroupsException.NO_DEFAULT_GROUP);
        }
        return defaultGroup;
      })
    );
  }
}
