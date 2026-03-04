import { Controller, Get, Post, UseGuards, Request, Param } from '@nestjs/common';
import { AchievementsService } from './achievements.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('achievements')
export class AchievementsController {
  constructor(private readonly achievementsService: AchievementsService) {}

  @Get()
  async getAllAchievements() {
    return this.achievementsService.getAllAchievements();
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  async getUserAchievements(@Request() req) {
    return this.achievementsService.getUserAchievements(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('unlock/:slug')
  async unlockAchievement(@Request() req, @Param('slug') slug: string) {
    return this.achievementsService.unlockAchievement(req.user.userId, slug);
  }
}
