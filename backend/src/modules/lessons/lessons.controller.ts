import { Controller, Get, Post, Patch, UseGuards, Request, Param, Body } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Get()
  async getAllLessons() {
    return this.lessonsService.getAllLessons();
  }

  @Get(':slug')
  async getLessonBySlug(@Param('slug') slug: string) {
    return this.lessonsService.getLessonBySlug(slug);
  }

  @Get('mode/:modeId')
  async getLessonsByMode(@Param('modeId') modeId: string) {
    return this.lessonsService.getLessonsByMode(modeId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/my-lessons')
  async getUserLessons(@Request() req) {
    return this.lessonsService.getUserLessons(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':lessonId/start')
  async startLesson(@Request() req, @Param('lessonId') lessonId: string) {
    return this.lessonsService.startLesson(req.user.userId, lessonId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':lessonId/progress')
  async updateLessonProgress(
    @Request() req,
    @Param('lessonId') lessonId: string,
    @Body() body: { progressPercentage: number },
  ) {
    return this.lessonsService.updateLessonProgress(req.user.userId, lessonId, body.progressPercentage);
  }
}
