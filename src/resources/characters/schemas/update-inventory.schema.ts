import { IsUUID } from 'class-validator';

export class UpdateInventorySchema {

  @IsUUID('all')
  id: string;

  data: string;
}
