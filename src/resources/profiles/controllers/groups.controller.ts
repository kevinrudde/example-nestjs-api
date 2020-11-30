import { Controller, Get, Param } from '@nestjs/common';
import { GroupsService } from '../services/groups.service';
import { Observable } from 'rxjs';
import { Group } from '../entities/group.entity';

@Controller('groups')
export class GroupsController {

  constructor(
    private readonly groupsService: GroupsService,
  ) {
  }

  @Get(':name')
  getGroupByName(@Param('name') name: string): Observable<Group> {
    return this.groupsService.getByName(name);
  }
}
