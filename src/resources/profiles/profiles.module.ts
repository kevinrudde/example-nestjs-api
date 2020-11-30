import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Group } from './entities/group.entity';
import { ProfilesController } from './controllers/profiles.controller';
import { ProfilesRepository } from './repositories/profiles.repository';
import { ProfilesService } from './services/profiles.service';
import { GroupsRepository } from './repositories/groups.repository';
import { GroupsService } from './services/groups.service';
import { CreateGroupsCommand } from './commands/create-groups.command';
import { GroupsController } from './controllers/groups.controller';

const PROVIDERS = [
  ProfilesRepository,
  GroupsRepository,
  ProfilesService,
  GroupsService,
  CreateGroupsCommand,
];

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([Profile, Group]),
  ],
  controllers: [
    ProfilesController,
    GroupsController,
  ],
  providers: PROVIDERS,
  exports: PROVIDERS,
})
export class ProfilesModule {}
