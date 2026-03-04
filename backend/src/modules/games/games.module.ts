import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameResult } from '../../database/entities/game-result.entity';
import { UserProgress } from '../../database/entities/user-progress.entity';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';

@Module({
  imports: [TypeOrmModule.forFeature([GameResult, UserProgress])],
  providers: [GamesService],
  controllers: [GamesController],
})
export class GamesModule {}
