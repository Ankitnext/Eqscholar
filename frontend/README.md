# Next.js Frontend - EQScholar

Modern React frontend for EQScholar using Next.js 14 with App Router.

## 🎯 Features

- ✅ Server-Side Rendering (SSR) with Next.js
- ✅ User Authentication (JWT)
- ✅ Dashboard & Progress Tracking
- ✅ Game Selection & Results
- ✅ Lesson Learning Management
- ✅ In-Game Store & Inventory
- ✅ Leaderboard Rankings
- ✅ Responsive Design
- ✅ SEO Optimized
- ✅ TypeScript Support

## 📦 Installation

```bash
npm install
```

## 🔧 Environment Setup

Copy `.env.example` to `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## 🚀 Running

```bash
# Development
npm run dev

# Production build
npm run build
npm start

# Linting
npm run lint

# Type checking
npm run type-check
```

Visit `http://localhost:3001`

## 📁 Project Structure

```
app/
├── page.tsx                 # Home page
├── layout.tsx               # Root layout
├── auth/
│   ├── login/page.tsx       # Login page
│   └── register/page.tsx    # Registration page
├── dashboard/
│   └── page.tsx             # User dashboard
├── games/
│   └── page.tsx             # Games page
├── lessons/
│   └── page.tsx             # Lessons page
└── market/
    └── page.tsx             # Store page

components/                 # Reusable React components
services/
├── api-client.ts           # API communication
lib/
├── auth-context.tsx        # Auth state management
styles/
└── globals.css             # Global styles
hooks/
└── useUserProgress.ts      # Custom hooks
```

## 🔑 Key Pages

### Home (`/`)
Landing page with CTA buttons for login, register, and explore

### Authentication
- **Login** (`/auth/login`) - User login
- **Register** (`/auth/register`) - New account creation

### Dashboard (`/dashboard`)
- User profile & stats
- EQ score & current tier
- Games played counter
- Leaderboard rankings

### Games (`/games`)
- Game mode selection
- Play game functionality
- Recent results history

### Lessons (`/lessons`)
- Available courses
- Progress tracking
- Start/continue lessons

### Market (`/market`)
- Store items
- Purchase with EQ points
- Inventory display

## 🔐 Authentication

- **Method:** JWT tokens stored in localStorage
- **Protected Routes:** Dashboard, Games, Lessons, Market require login
- **Token Management:** Auto-attached to API requests via axios interceptor
- **Logout:** Clears token and redirects to login

## 📡 API Integration

### API Client (`services/api-client.ts`)

```typescript
// Initialize with base URL from environment
apiClient.register(data)           // POST /auth/register
apiClient.login(data)              // POST /auth/login
apiClient.getProfile()             // GET /auth/me

// User endpoints
apiClient.getUserProgress()         // GET /users/me/progress
apiClient.getLeaderboard()          // GET /users/leaderboard
apiClient.getTiers()                // GET /users/tiers

// Game endpoints
apiClient.recordGameResult(data)    // POST /games/results
apiClient.getGameResults()          // GET /games/results
apiClient.getGameResultsByMode(id)  // GET /games/results/:modeId

// Lesson endpoints
apiClient.getLessons()              // GET /lessons
apiClient.getLessonBySlug(slug)     // GET /lessons/:slug
apiClient.getUserLessons()          // GET /lessons/user/my-lessons
apiClient.startLesson(id)           // POST /lessons/:id/start
apiClient.updateLessonProgress(id, %) // PATCH /lessons/:id/progress

// Market endpoints
apiClient.getMarketItems()          // GET /market/items
apiClient.getUserInventory()        // GET /market/inventory
apiClient.purchaseItem(itemId)      // POST /market/purchase/:itemId

// Achievement endpoints
apiClient.getAchievements()         // GET /achievements
apiClient.getUserAchievements()     // GET /achievements/user
apiClient.unlockAchievement(slug)   // POST /achievements/unlock/:slug
```

### Auth Context (`lib/auth-context.tsx`)

Global authentication state management:

```typescript
const { user, isAuthenticated, isLoading, login, register, logout } = useAuth();
```

## 🎨 Styling

Currently using inline CSS (React style objects). To upgrade:

### Option 1: CSS Modules
```typescript
import styles from './page.module.css';

export default function Page() {
  return <div className={styles.container}>...</div>;
}
```

### Option 2: Tailwind CSS
```bash
npm install -D tailwindcss autoprefixer postcss
npx tailwindcss init -p
```

Then update components:
```typescript
export default function Page() {
  return <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">...</div>;
}
```

## 🧩 Custom Hooks

### useUserProgress
```typescript
const { progress, loading, error } = useUserProgress();
```

## 🚀 Building for Production

```bash
# Build
npm run build

# Run production build locally
npm start

# Generate static export (if needed)
# Add to next.config.js: output: 'export'
```

## 📱 Responsive Design

All pages are responsive using CSS Grid and Flexbox. Key breakpoints:
- Mobile: < 640px
- Tablet: 640px - 1024px  
- Desktop: > 1024px

## 🔒 Security

- ✅ HTTPOnly cookies option available
- ✅ CSRF protection via next-auth (optional)
- ✅ Input validation
- ✅ XSS protection via React
- ✅ Environment variable protection (NEXT_PUBLIC_ prefix)

## 🚀 Performance

- ✅ Image optimization with Next.js Image
- ✅ Font optimization
- ✅ Code splitting
- ✅ SEO meta tags
- ✅ Caching strategies

## 🌐 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Other Platforms

**Netlify:**
```bash
npm run build
# Deploy the .next folder
```

**Docker:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3001
CMD ["npm", "start"]
```

**Environment Variables for Production:**
```
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

## 📚 Technologies

- **Framework:** Next.js 14
- **Language:** TypeScript
- **UI:** React 18
- **HTTP Client:** Axios
- **State Management:** React Context + Custom hooks
- **Styling:** CSS-in-JS (inline styles)

## 🛠️ Development Tips

### Enable Debug Mode
```typescript
// In components
console.log('Debug info:', variable);
```

### Add Page Title
```typescript
// In layout.tsx
export const metadata = {
  title: 'Page Title',
  description: 'Page description',
};
```

### API Error Handling
```typescript
try {
  const response = await apiClient.getProfile();
  setUser(response.data);
} catch (error: any) {
  const message = error.response?.data?.message || 'Error';
  alert(message);
}
```

## 🐛 Common Issues

### API Connection Error
```
CORS error? Check:
- Backend CORS_ORIGIN matches frontend domain
- API_URL environment variable is correct
- Backend is running
```

### Authentication Failed  
```
- Clear localStorage and re-login
- Check token expiration
- Verify JWT_SECRET matches backend
```

### Page Not Found
```
- Check routes in app/ directory
- Ensure proper file naming (page.tsx)
- Check link href paths
```

## 📖 Next.js App Router Guide

```
app/
├── layout.tsx         # Root layout wrapper
├── page.tsx           # / route
└── dashboard/
    ├── layout.tsx     # Dashboard layout
    └── page.tsx       # /dashboard route
```

## 📦 Dependencies

```json
{
  "next": "^14.0.0",
  "react": "^18.2.0",
  "axios": "^1.6.0",
  "typescript": "^5.2.0"
}
```

## 📞 Support

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Axios Docs](https://axios-http.com)
- [TypeScript Docs](https://www.typescriptlang.org/docs)

---

**Status:** Production Ready ✅
**Last Updated:** March 2026
