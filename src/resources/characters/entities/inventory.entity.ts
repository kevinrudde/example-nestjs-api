import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('inventory')
export class Inventory {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('jsonb', { default: '{}' })
  data: string;
}
