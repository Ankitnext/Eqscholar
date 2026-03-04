import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from '../../database/entities/lesson.entity';
import { UserLesson } from '../../database/entities/user-lesson.entity';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private lessonsRepository: Repository<Lesson>,
    @InjectRepository(UserLesson)
    private userLessonsRepository: Repository<UserLesson>,
  ) {}

  async getAllLessons() {
    return this.lessonsRepository.find({
      order: { displayOrder: 'ASC' },
      where: { publishedAt: null }, // Only show published lessons
    });
  }

  async getLessonBySlug(slug: string) {
    return this.lessonsRepository.findOne({
      where: { slug },
    });
  }

  async getLessonsByMode(modeId: string) {
    return this.lessonsRepository.find({
      where: { modeId },
      order: { displayOrder: 'ASC' },
    });
  }

  async getUserLessons(userId: string) {
    return this.userLessonsRepository.find({
      where: { userId },
      order: { startedAt: 'DESC' },
    });
  }

  async startLesson(userId: string, lessonId: string) {
    let userLesson = await this.userLessonsRepository.findOne({
      where: { userId, lessonId },
    });

    if (!userLesson) {
      userLesson = this.userLessonsRepository.create({
        userId,
        lessonId,
        progressPercentage: 0,
      });
    }

    return this.userLessonsRepository.save(userLesson);
  }

  async updateLessonProgress(userId: string, lessonId: string, progressPercentage: number) {
    const userLesson = await this.userLessonsRepository.findOne({
      where: { userId, lessonId },
    });

    if (!userLesson) {
      return null;
    }

    userLesson.progressPercentage = progressPercentage;
    if (progressPercentage === 100) {
      userLesson.isCompleted = true;
      userLesson.completedAt = new Date();
    }

    return this.userLessonsRepository.save(userLesson);
  }
}
