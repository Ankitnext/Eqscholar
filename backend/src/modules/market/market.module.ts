import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarketItem } from '../../database/entities/market-item.entity';
import { UserInventory } from '../../database/entities/user-inventory.entity';
import { UserProgress } from '../../database/entities/user-progress.entity';
import { MarketService } from './market.service';
import { MarketController } from './market.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MarketItem, UserInventory, UserProgress])],
  providers: [MarketService],
  controllers: [MarketController],
})
export class MarketModule {}
