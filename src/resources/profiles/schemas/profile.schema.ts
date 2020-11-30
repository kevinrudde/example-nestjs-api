import { IsIn, IsString, IsUUID } from 'class-validator';

export class ProfileSchema {

  @IsUUID('all')
  uuid: string;

  @IsString()
  name: string;

  @IsIn(['de_DE', 'en_EN'])
  language: string;
}
