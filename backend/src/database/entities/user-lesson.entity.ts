import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { User } from './user.entity';

@Entity('user_lessons')
@Index(['userId'])
@Index(['lessonId'])
export class UserLesson {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  lessonId: string;

  @Column({ default: false })
  isCompleted: boolean;

  @Column({ default: 0 })
  progressPercentage: number;

  @CreateDateColumn()
  startedAt: Date;

  @UpdateDateColumn()
  lastAccessedAt: Date;

  @Column({ nullable: true })
  completedAt: Date;

  // Relations
  @ManyToOne(() => User, (user) => user.lessons, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;
}
