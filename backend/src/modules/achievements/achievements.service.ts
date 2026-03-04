import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Achievement } from '../../database/entities/achievement.entity';
import { UserAchievement } from '../../database/entities/user-achievement.entity';

@Injectable()
export class AchievementsService {
  constructor(
    @InjectRepository(Achievement)
    private achievementsRepository: Repository<Achievement>,
    @InjectRepository(UserAchievement)
    private userAchievementsRepository: Repository<UserAchievement>,
  ) {}

  async getAllAchievements() {
    return this.achievementsRepository.find({
      where: { isHidden: false },
    });
  }

  async getUserAchievements(userId: string) {
    return this.userAchievementsRepository.find({
      where: { userId },
      order: { unlockedAt: 'DESC' },
    });
  }

  async unlockAchievement(userId: string, achievementSlug: string) {
    const achievement = await this.achievementsRepository.findOne({
      where: { slug: achievementSlug },
    });

    if (!achievement) {
      throw new Error('Achievement not found');
    }

    const existingAchievement = await this.userAchievementsRepository.findOne({
      where: { userId, achievementSlug },
    });

    if (existingAchievement) {
      return existingAchievement; // Already unlocked
    }

    const userAchievement = this.userAchievementsRepository.create({
      userId,
      achievementId: achievement.id,
      achievementSlug,
    });

    return this.userAchievementsRepository.save(userAchievement);
  }
}
