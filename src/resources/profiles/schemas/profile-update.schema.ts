import { IsArray, IsDateString, IsIn, IsNumber, IsOptional, IsString } from 'class-validator';

export class ProfileUpdateSchema {

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  teamspeakUniqueId: string;

  @IsOptional()
  @IsIn(['de_DE', 'en_EN'])
  language: string;

  @IsOptional()
  @IsDateString()
  lastOnline: Date;

  @IsOptional()
  @IsNumber()
  timePlayed: number;

  @IsOptional()
  @IsNumber()
  banPoints: number;

  @IsOptional()
  @IsString()
  group: string;

  @IsOptional()
  @IsArray()
  permissions: string[];
}
