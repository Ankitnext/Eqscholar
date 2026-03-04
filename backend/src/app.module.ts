import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { getDatabaseConfig } from './database/database.config';

// Modules
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { GamesModule } from './modules/games/games.module';
import { LessonsModule } from './modules/lessons/lessons.module';
import { MarketModule } from './modules/market/market.module';
import { AchievementsModule } from './modules/achievements/achievements.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(getDatabaseConfig()),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'development-secret',
      signOptions: { expiresIn: process.env.JWT_EXPIRATION ? parseInt(process.env.JWT_EXPIRATION) : 86400 },
    }),
    AuthModule,
    UsersModule,
    GamesModule,
    LessonsModule,
    MarketModule,
    AchievementsModule,
  ],
})
export class AppModule {}
