import { IsUUID } from 'class-validator';

export class CharacterSchema {

  @IsUUID('all')
  profileId: string;
}
