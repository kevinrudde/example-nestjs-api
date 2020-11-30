import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Inventory } from '../entities/inventory.entity';
import { CharactersService } from '../services/characters.service';
import { InventoriesService } from '../services/inventories.service';
import { UpdateInventorySchema } from '../schemas/update-inventory.schema';

@Controller('characters/:id/inventory')
export class InventoriesController {

  constructor(
    private readonly charactersService: CharactersService,
    private readonly inventoriesService: InventoriesService,
  ) {
  }

  @Get()
  getInventory(@Param('id') id: string): Observable<Inventory> {
    return this.charactersService.findInventoryByCharacter(id);
  }

  @Put()
  updateInventory(@Param('id') id: string, @Body() updateInventory: UpdateInventorySchema): Observable<Inventory> {
    const inventory = {
      ...updateInventory,
    } as Inventory;

    return this.inventoriesService.updateInventory(inventory);
  }
}
