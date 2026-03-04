import { IsString, IsNumber, IsOptional, IsObject } from 'class-validator';

export class CreateGameResultDto {
  @IsString()
  modeId: string;

  @IsString()
  gameType: string;

  @IsNumber()
  score: number;

  @IsNumber()
  eqPointsEarned: number;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}
