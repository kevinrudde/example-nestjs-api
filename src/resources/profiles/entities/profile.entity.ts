import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Group } from './group.entity';
import { Character } from '../../characters/entities/character.entity';

@Entity('profile')
export class Profile {

  @PrimaryColumn('uuid')
  uuid: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  teamspeakUniqueId: string;

  @Column()
  language: string;

  @CreateDateColumn()
  lastOnline: Date;

  @Column({ default: 0 })
  timePlayed: number;

  @Column({ default: 0 })
  banPoints: number;

  @ManyToOne(() => Group, { eager: true })
  group: Group;

  @Column('text', { array: true, nullable: true })
  permissions: string[];

  @CreateDateColumn()
  creationDate: Date;

  @OneToMany(() => Character, character => character.profileId)
  characters: Character[];
}
