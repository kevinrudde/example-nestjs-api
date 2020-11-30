import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Character } from './entities/character.entity';
import { Inventory } from './entities/inventory.entity';
import { CharactersController } from './controllers/characters.controller';
import { CharactersRepository } from './repositories/characters.repository';
import { CharactersService } from './services/characters.service';
import { InventoriesController } from './controllers/inventories.controller';
import { InventoriesRepository } from './repositories/inventories.repository';
import { InventoriesService } from './services/inventories.service';

const PROVIDERS = [
  CharactersRepository,
  CharactersService,
  InventoriesRepository,
  InventoriesService,
];

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([Character, Inventory]),
  ],
  controllers: [
    CharactersController,
    InventoriesController,
  ],
  providers: PROVIDERS,
  exports: PROVIDERS,
})
export class CharactersModule {}
