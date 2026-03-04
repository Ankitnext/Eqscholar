# NestJS Backend - EQScholar API

Production-ready NestJS backend API for the EQScholar emotional intelligence platform.

## 🎯 Features

- ✅ JWT Authentication & Authorization
- ✅ User Profile Management
- ✅ Game Results Tracking
- ✅ Progress & Statistics
- ✅ Lesson Management
- ✅ In-game Marketplace
- ✅ Achievement System
- ✅ Leaderboard Rankings
- ✅ PostgreSQL Database with TypeORM
- ✅ Input Validation
- ✅ Error Handling

## 📦 Installation

```bash
npm install
```

## 🔧 Environment Setup

Copy `.env.example` to `.env` and configure:

```env
# Database
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=eqscholar
DATABASE_PASSWORD=your_secure_password
DATABASE_NAME=eqscholar_db

# JWT
JWT_SECRET=your_jwt_secret_key_change_this
JWT_EXPIRATION=24h

# App
NODE_ENV=development
PORT=3000

# CORS
CORS_ORIGIN=http://localhost:3001
```

## 🚀 Running

```bash
# Development (with hot reload)
npm run start:dev

# Production
npm run build
npm run start:prod

# Watch mode
npm run start -- --watch
```

## 📁 Project Structure

```
src/
├── modules/
│   ├── auth/              # Authentication
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.module.ts
│   │   ├── strategies/    # Passport strategies
│   │   ├── guards/        # JWT guards
│   │   └── dto/           # Data transfer objects
│   ├── users/             # User management
│   ├── games/             # Game results
│   ├── lessons/           # Educational content
│   ├── market/            # Store
│   └── achievements/      # Badge system
├── database/
│   ├── entities/          # TypeORM entities
│   ├── database.config.ts # Database configuration
│   └── migrations/        # Database migrations
├── common/                # Shared utilities
├── app.module.ts          # Root module
└── main.ts                # Entry point
```

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR UNIQUE NOT NULL,
  username VARCHAR NOT NULL,
  password VARCHAR NOT NULL,
  firstName VARCHAR,
  lastName VARCHAR,
  emailVerified BOOLEAN DEFAULT false,
  isActive BOOLEAN DEFAULT true,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### User Progress Table
```sql
CREATE TABLE user_progress (
  id UUID PRIMARY KEY,
  userId UUID REFERENCES users(id) ON DELETE CASCADE,
  eqScore INTEGER DEFAULT 0,
  eqPoints INTEGER DEFAULT 0,
  totalGamesPlayed INTEGER DEFAULT 0,
  currentTier VARCHAR DEFAULT 'Lost Mode',
  modeStats JSONB DEFAULT '{}',
  lastUpdated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

Additional tables: `game_results`, `lessons`, `user_lessons`, `market_items`, `user_inventory`, `achievements`, `user_achievements`

## 🔑 Key Endpoints

### Authentication
```
POST   /api/auth/register      Register new user
POST   /api/auth/login         User login
GET    /api/auth/me            Get current user (protected)
```

### Users
```
GET    /api/users/me/progress            Current user's progress (protected)
GET    /api/users/leaderboard            Top 100 players
GET    /api/users/tiers                  Available EQ tiers
GET    /api/users/:userId/public-profile Public user profile
```

### Games
```
POST   /api/games/results                Record game result (protected)
GET    /api/games/results                User's results (protected)
GET    /api/games/results/:modeId        Results for specific mode (protected)
```

### Lessons
```
GET    /api/lessons                      All lessons
GET    /api/lessons/:slug                Single lesson
GET    /api/lessons/mode/:modeId         Lessons by mode
GET    /api/lessons/user/my-lessons      User's lessons (protected)
POST   /api/lessons/:lessonId/start      Start lesson (protected)
PATCH  /api/lessons/:lessonId/progress   Update progress (protected)
```

### Market
```
GET    /api/market/items                 All items
GET    /api/market/items/:itemId         Single item
GET    /api/market/inventory             User inventory (protected)
POST   /api/market/purchase/:itemId      Purchase item (protected)
```

### Achievements
```
GET    /api/achievements                 All achievements
GET    /api/achievements/user            User's achievements (protected)
POST   /api/achievements/unlock/:slug    Unlock achievement (protected)
```

## 🧪 Testing

```bash
# Unit tests
npm test

# Integration tests
npm run test:e2e

# Coverage
npm run test:cov
```

## 🔐 Security Features

- ✅ Password hashing with bcrypt
- ✅ JWT-based authentication
- ✅ Protected routes with guards
- ✅ Input validation with class-validator
- ✅ CORS protection
- ✅ Environment variable protection

## 🚀 Deployment

For production deployment:

1. Build the application
```bash
npm run build
```

2. Set production environment variables

3. Run migrations if needed
```bash
npm run migration:run
```

4. Start the server
```bash
npm run start:prod
```

### Deployment Platforms
- Heroku
- Railway
- AWS
- DigitalOcean
- Render
- Fly.io

## 📚 Technologies

- **Framework:** NestJS
- **ORM:** TypeORM
- **Database:** PostgreSQL
- **Authentication:** Passport.js + JWT
- **Validation:** Class Validator
- **Password:** Bcrypt

## 🛠️ Development

```bash
# Linting
npm run lint
npm run lint -- --fix

# Format code
npm run format

# Generate migration
npm run migration:generate -- -n MigrationName

# Run migrations
npm run migration:run

# Revert migration
npm run migration:revert
```

## 📖 TypeORM Commands

```bash
# Create migration
typeorm migration:create src/database/migrations/CreateUsersTable

# Run migrations
npm run migration:run

# Show migrations
npm run migration:show

# Revert last migration
npm run migration:revert
```

## 🐛 Common Issues

### Port Already in Use
```bash
# Use different port
PORT=3001 npm run start:dev
```

### Database Connection Failed
```bash
# Check PostgreSQL is running
# Verify credentials in .env
# Check database exists
psql -l | grep eqscholar_db
```

### JWT Errors
```bash
# Clear token and re-login
# Verify JWT_SECRET in .env
```

## 📝 Environment Variables Reference

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| DATABASE_HOST | Yes | localhost | PostgreSQL host |
| DATABASE_PORT | Yes | 5432 | PostgreSQL port |
| DATABASE_USERNAME | Yes | eqscholar | DB user |
| DATABASE_PASSWORD | Yes | - | DB password |
| DATABASE_NAME | Yes | eqscholar_db | Database name |
| JWT_SECRET | Yes | - | JWT signing secret |
| JWT_EXPIRATION | No | 24h | Token expiration |
| NODE_ENV | No | development | Environment |
| PORT | No | 3000 | Server port |
| CORS_ORIGIN | No | http://localhost:3001 | CORS origin |

## 📞 Support & Documentation

- [NestJS Docs](https://docs.nestjs.com)
- [TypeORM Docs](https://typeorm.io)
- [Passport.js](https://www.passportjs.org)

---

**Status:** Production Ready ✅
