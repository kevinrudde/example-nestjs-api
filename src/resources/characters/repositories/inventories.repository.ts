import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Inventory } from '../entities/inventory.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';

@Injectable()
export class InventoriesRepository {

  constructor(
    @InjectRepository(Inventory) private readonly repository: Repository<Inventory>,
  ) {
  }

  findById(id: string): Observable<Inventory> {
    return from(this.repository.findOne({ id }));
  }

  persist(inventory: Inventory): Observable<Inventory> {
    return from(this.repository.save(inventory));
  }
}
