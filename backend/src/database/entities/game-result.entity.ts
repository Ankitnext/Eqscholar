import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { User } from './user.entity';

@Entity('game_results')
@Index(['userId'])
@Index(['modeId'])
@Index(['playedAt'])
export class GameResult {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  modeId: string;

  @Column()
  gameType: string;

  @Column({ default: 0 })
  score: number;

  @Column({ default: 0 })
  eqPointsEarned: number;

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>;

  @CreateDateColumn()
  playedAt: Date;

  // Relations
  @ManyToOne(() => User, (user) => user.gameResults, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;
}
