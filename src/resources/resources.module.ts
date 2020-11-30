import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ProfilesModule } from './profiles/profiles.module';
import { CharactersModule } from './characters/characters.module';
import { ProxyModule } from './proxy/proxy.module';

@Module({
  imports: [
    UsersModule,
    ProfilesModule,
    CharactersModule,
    ProxyModule,
  ],
})
export class ResourcesModule {}
