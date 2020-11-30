import { Injectable } from '@nestjs/common';
import { InventoriesRepository } from '../repositories/inventories.repository';
import { Inventory } from '../entities/inventory.entity';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { InventoriesException } from '../exceptions/inventories.exception';

@Injectable()
export class InventoriesService {

  constructor(
    private readonly inventoriesRepository: InventoriesRepository,
  ) {
  }

  findById(id: string): Observable<Inventory> {
    return this.inventoriesRepository.findById(id);
  }

  updateInventory(inventory: Inventory): Observable<Inventory> {
    return this.findById(inventory.id).pipe(
      switchMap((foundInventory: Inventory) => {
        if (!foundInventory) {
          throw new InventoriesException(InventoriesException.NOT_FOUND);
        }
        return this.inventoriesRepository.persist(inventory);
      })
    );
  }
}
