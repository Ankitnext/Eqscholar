import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from '../../database/entities/lesson.entity';
import { UserLesson } from '../../database/entities/user-lesson.entity';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Lesson, UserLesson])],
  providers: [LessonsService],
  controllers: [LessonsController],
})
export class LessonsModule {}
