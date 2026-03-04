import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { GameResult } from './game-result.entity';
import { UserProgress } from './user-progress.entity';
import { UserLesson } from './user-lesson.entity';
import { UserInventory } from './user-inventory.entity';
import { UserAchievement } from './user-achievement.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  username: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ type: 'text', nullable: true })
  avatar: string;

  @Column({ default: false })
  emailVerified: boolean;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @OneToMany(() => GameResult, (gameResult) => gameResult.user, { cascade: true })
  gameResults: GameResult[];

  @OneToMany(() => UserProgress, (userProgress) => userProgress.user, { cascade: true })
  progress: UserProgress[];

  @OneToMany(() => UserLesson, (userLesson) => userLesson.user, { cascade: true })
  lessons: UserLesson[];

  @OneToMany(() => UserInventory, (inventory) => inventory.user, { cascade: true })
  inventory: UserInventory[];

  @OneToMany(() => UserAchievement, (achievement) => achievement.user, { cascade: true })
  achievements: UserAchievement[];
}
