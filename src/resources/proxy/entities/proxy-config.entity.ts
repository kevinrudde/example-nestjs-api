import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('proxy-config')
export class ProxyConfig {

  @PrimaryColumn()
  key: string;

  @Column()
  value: string;
}
