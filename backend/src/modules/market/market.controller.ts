import { Controller, Get, Post, UseGuards, Request, Param, Body } from '@nestjs/common';
import { MarketService } from './market.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('market')
export class MarketController {
  constructor(private readonly marketService: MarketService) {}

  @Get('items')
  async getAllItems() {
    return this.marketService.getAllItems();
  }

  @Get('items/:itemId')
  async getItem(@Param('itemId') itemId: string) {
    return this.marketService.getItem(itemId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('inventory')
  async getUserInventory(@Request() req) {
    return this.marketService.getUserInventory(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('purchase/:itemId')
  async purchaseItem(@Request() req, @Param('itemId') itemId: string) {
    return this.marketService.purchaseItem(req.user.userId, itemId);
  }
}
