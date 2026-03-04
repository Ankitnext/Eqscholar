import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { User } from './user.entity';

@Entity('user_inventory')
@Index(['userId'])
export class UserInventory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  itemId: string;

  @Column()
  itemName: string;

  @Column()
  itemType: string;

  @CreateDateColumn()
  acquiredAt: Date;

  // Relations
  @ManyToOne(() => User, (user) => user.inventory, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;
}
