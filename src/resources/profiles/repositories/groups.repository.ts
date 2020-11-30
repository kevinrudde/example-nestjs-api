import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Group } from '../entities/group.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';

@Injectable()
export class GroupsRepository {

  constructor(
    @InjectRepository(Group) private readonly groupsRepository: Repository<Group>,
  ) {
  }

  findByName(name: string): Observable<Group> {
    return from(this.groupsRepository.findOne({ name }));
  }
}
