import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GameResult } from '../../database/entities/game-result.entity';
import { UserProgress } from '../../database/entities/user-progress.entity';
import { CreateGameResultDto } from './dto/game-result.dto';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(GameResult)
    private gameResultsRepository: Repository<GameResult>,
    @InjectRepository(UserProgress)
    private userProgressRepository: Repository<UserProgress>,
  ) {}

  async recordGameResult(userId: string, createGameResultDto: CreateGameResultDto) {
    const gameResult = this.gameResultsRepository.create({
      userId,
      ...createGameResultDto,
    });

    const savedResult = await this.gameResultsRepository.save(gameResult);

    // Update user progress
    let progress = await this.userProgressRepository.findOne({
      where: { userId },
    });

    if (!progress) {
      progress = this.userProgressRepository.create({
        userId,
        eqScore: createGameResultDto.score,
        eqPoints: createGameResultDto.eqPointsEarned,
        totalGamesPlayed: 1,
        modeStats: {
          [createGameResultDto.modeId]: {
            gamesPlayed: 1,
            scoreEarned: createGameResultDto.score,
          },
        },
      });
    } else {
      progress.eqScore += createGameResultDto.score;
      progress.eqPoints += createGameResultDto.eqPointsEarned;
      progress.totalGamesPlayed += 1;

      if (!progress.modeStats[createGameResultDto.modeId]) {
        progress.modeStats[createGameResultDto.modeId] = {
          gamesPlayed: 0,
          scoreEarned: 0,
        };
      }

      progress.modeStats[createGameResultDto.modeId].gamesPlayed += 1;
      progress.modeStats[createGameResultDto.modeId].scoreEarned += createGameResultDto.score;
    }

    await this.userProgressRepository.save(progress);

    return {
      gameResult: savedResult,
      updatedProgress: progress,
    };
  }

  async getUserGameResults(userId: string, limit: number = 50) {
    return this.gameResultsRepository.find({
      where: { userId },
      order: { playedAt: 'DESC' },
      take: limit,
    });
  }

  async getGameStatsByMode(userId: string, modeId: string) {
    return this.gameResultsRepository.find({
      where: { userId, modeId },
      order: { playedAt: 'DESC' },
    });
  }
}
