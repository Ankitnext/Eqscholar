import { Controller, Post, Get, UseGuards, Request, Param, Body } from '@nestjs/common';
import { GamesService } from './games.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateGameResultDto } from './dto/game-result.dto';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @UseGuards(JwtAuthGuard)
  @Post('results')
  async recordGameResult(@Request() req, @Body() createGameResultDto: CreateGameResultDto) {
    return this.gamesService.recordGameResult(req.user.userId, createGameResultDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('results')
  async getGameResults(@Request() req) {
    return this.gamesService.getUserGameResults(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('results/:modeId')
  async getGameResultsByMode(@Request() req, @Param('modeId') modeId: string) {
    return this.gamesService.getGameStatsByMode(req.user.userId, modeId);
  }
}
