import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { User } from './user.entity';

@Entity('user_progress')
@Index(['userId'])
export class UserProgress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column({ default: 0 })
  eqScore: number;

  @Column({ default: 0 })
  eqPoints: number;

  @Column({ default: 0 })
  totalGamesPlayed: number;

  @Column({ type: 'varchar', default: 'Lost Mode' })
  currentTier: string;

  @Column({ type: 'jsonb', default: {} })
  modeStats: Record<string, { gamesPlayed: number; scoreEarned: number }>;

  @UpdateDateColumn()
  lastUpdated: Date;

  @CreateDateColumn()
  createdAt: Date;

  // Relations
  @ManyToOne(() => User, (user) => user.progress, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;
}
