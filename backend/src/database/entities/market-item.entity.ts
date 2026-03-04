import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('market_items')
export class MarketItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  itemType: string;

  @Column({ default: 0 })
  cost: number;

  @Column({ nullable: true })
  imagePath: string;

  @Column({ default: true })
  isAvailable: boolean;

  @Column({ default: 0 })
  displayOrder: number;

  @CreateDateColumn()
  createdAt: Date;
}
