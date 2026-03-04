import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MarketItem } from '../../database/entities/market-item.entity';
import { UserInventory } from '../../database/entities/user-inventory.entity';
import { UserProgress } from '../../database/entities/user-progress.entity';

@Injectable()
export class MarketService {
  constructor(
    @InjectRepository(MarketItem)
    private marketItemsRepository: Repository<MarketItem>,
    @InjectRepository(UserInventory)
    private userInventoryRepository: Repository<UserInventory>,
    @InjectRepository(UserProgress)
    private userProgressRepository: Repository<UserProgress>,
  ) {}

  async getAllItems() {
    return this.marketItemsRepository.find({
      where: { isAvailable: true },
      order: { displayOrder: 'ASC' },
    });
  }

  async getItem(itemId: string) {
    return this.marketItemsRepository.findOne({
      where: { id: itemId },
    });
  }

  async getUserInventory(userId: string) {
    return this.userInventoryRepository.find({
      where: { userId },
      order: { acquiredAt: 'DESC' },
    });
  }

  async purchaseItem(userId: string, itemId: string) {
    const item = await this.marketItemsRepository.findOne({
      where: { id: itemId },
    });

    if (!item || !item.isAvailable) {
      throw new Error('Item not available');
    }

    const userProgress = await this.userProgressRepository.findOne({
      where: { userId },
    });

    if (!userProgress || userProgress.eqPoints < item.cost) {
      throw new Error('Insufficient points');
    }

    // Deduct points
    userProgress.eqPoints -= item.cost;
    await this.userProgressRepository.save(userProgress);

    // Add to inventory
    const inventoryItem = this.userInventoryRepository.create({
      userId,
      itemId,
      itemName: item.name,
      itemType: item.itemType,
    });

    return this.userInventoryRepository.save(inventoryItem);
  }
}
