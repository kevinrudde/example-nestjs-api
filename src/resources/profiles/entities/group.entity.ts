import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('group')
export class Group {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  prefix: string;

  @Column()
  color: string;

  @Column()
  power: number;

  @Column('text', { array: true })
  permissions: string[];
}
