import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Inventory } from './inventory.entity';
import { JoinColumn } from 'typeorm';

@Entity('character')
export class Character {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  profileId: string;

  @Column('smallint', { default: 0 })
  level: number;

  @Column('int', { default: 0 })
  experience: string; // pg client handles int (int8) as string, because cockroach int8 is larger than javascripts number

  @OneToOne(() => Inventory, { cascade: ['insert'] })
  @JoinColumn()
  inventory: Inventory;
}
