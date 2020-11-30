import { IsNumber, IsOptional } from 'class-validator';

export class UpdateCharacterSchema {

  @IsOptional()
  @IsNumber()
  level: number;

  @IsOptional()
  @IsNumber()
  experience: string;
}
