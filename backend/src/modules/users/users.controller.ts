import { Controller, Get, UseGuards, Request, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me/progress')
  async getMyProgress(@Request() req) {
    return this.usersService.getUserProgress(req.user.userId);
  }

  @Get('leaderboard')
  async getLeaderboard() {
    return this.usersService.getLeaderboard();
  }

  @Get('tiers')
  async getTiers() {
    return {
      tiers: this.usersService.getTiersList(),
    };
  }

  @Get(':userId/public-profile')
  async getPublicProfile(@Param('userId') userId: string) {
    const progress = await this.usersService.getUserProgress(userId);
    if (!progress) {
      return null;
    }
    return {
      id: progress.userId,
      eqScore: progress.eqScore,
      tier: progress.tier,
      totalGamesPlayed: progress.totalGamesPlayed,
    };
  }
}
