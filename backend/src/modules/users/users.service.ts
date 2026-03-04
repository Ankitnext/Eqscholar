import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../database/entities/user.entity';
import { UserProgress } from '../../database/entities/user-progress.entity';

@Injectable()
export class UsersService {
  private readonly EQ_TIERS = [
    { name: 'God Mode', min: 1300, max: 1400 },
    { name: 'Enlightened Mode', min: 1200, max: 1299 },
    { name: 'Healer Mode', min: 1100, max: 1199 },
    { name: 'Sage Mode', min: 1000, max: 1099 },
    { name: 'Monk Mode', min: 900, max: 999 },
    { name: 'Empath Mode', min: 800, max: 899 },
    { name: 'Balanced Mode', min: 700, max: 799 },
    { name: 'Awareness Mode', min: 600, max: 699 },
    { name: 'Seeker Mode', min: 500, max: 599 },
    { name: 'Shadow Walker', min: 400, max: 499 },
    { name: 'Storm Mode', min: 300, max: 399 },
    { name: 'Addiction Loop', min: 200, max: 299 },
    { name: 'Chaotic Mode', min: 100, max: 199 },
    { name: 'Lost Mode', min: 0, max: 99 },
  ];

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(UserProgress)
    private userProgressRepository: Repository<UserProgress>,
  ) {}

  async getUserProgress(userId: string) {
    const progress = await this.userProgressRepository.findOne({
      where: { userId },
    });
    if (!progress) {
      return null;
    }
    return {
      ...progress,
      tier: this.getTier(progress.eqScore),
    };
  }

  async updateUserProgress(
    userId: string,
    updateData: {
      eqScore?: number;
      eqPoints?: number;
      modeStats?: Record<string, any>;
    },
  ) {
    let progress = await this.userProgressRepository.findOne({
      where: { userId },
    });

    if (!progress) {
      progress = this.userProgressRepository.create({
        userId,
        eqScore: updateData.eqScore || 0,
        eqPoints: updateData.eqPoints || 0,
        modeStats: updateData.modeStats || {},
      });
    } else {
      if (updateData.eqScore !== undefined) {
        progress.eqScore = updateData.eqScore;
      }
      if (updateData.eqPoints !== undefined) {
        progress.eqPoints = updateData.eqPoints;
      }
      if (updateData.modeStats !== undefined) {
        progress.modeStats = updateData.modeStats;
      }
    }

    progress.totalGamesPlayed += 1;
    const updated = await this.userProgressRepository.save(progress);

    return {
      ...updated,
      tier: this.getTier(updated.eqScore),
    };
  }

  async getLeaderboard(limit: number = 100) {
    const leaders = await this.userProgressRepository
      .createQueryBuilder('progress')
      .leftJoinAndSelect('progress.user', 'user')
      .orderBy('progress.eqScore', 'DESC')
      .take(limit)
      .getMany();

    return leaders.map((p, index) => ({
      rank: index + 1,
      user: {
        id: p.user.id,
        username: p.user.username,
        avatar: p.user.avatar,
      },
      eqScore: p.eqScore,
      eqPoints: p.eqPoints,
      tier: this.getTier(p.eqScore),
      totalGamesPlayed: p.totalGamesPlayed,
    }));
  }

  getTier(score: number) {
    const tier = this.EQ_TIERS.find((t) => score >= t.min && score <= t.max);
    return tier || this.EQ_TIERS[this.EQ_TIERS.length - 1];
  }

  getTiersList() {
    return this.EQ_TIERS;
  }
}
