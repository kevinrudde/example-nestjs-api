import { Command, Console } from 'nestjs-console';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from '../entities/group.entity';

@Console()
export class CreateGroupsCommand {

  constructor(
    @InjectRepository(Group) private repository: Repository<Group>,
  ) {
  }

  @Command({
    command: 'create-groups',
    description: 'Creates groups',
  })
  async initializeTestDatabase(): Promise<void> {
    const playerGroup = {
      name: 'player',
      prefix: '',
      color: '#FFFFFF',
      power: 0,
      permissions: [
        'test.player'
      ],
    } as Group;
    await this.repository.save(playerGroup);
  }
}
