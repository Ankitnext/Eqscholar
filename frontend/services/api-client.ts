import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add token to requests
    this.client.interceptors.request.use((config) => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  // Auth endpoints
  async register(data: any) {
    return this.client.post('/auth/register', data);
  }

  async login(data: any) {
    return this.client.post('/auth/login', data);
  }

  async getProfile() {
    return this.client.get('/auth/me');
  }

  // User endpoints
  async getUserProgress() {
    return this.client.get('/users/me/progress');
  }

  async getLeaderboard() {
    return this.client.get('/users/leaderboard');
  }

  async getTiers() {
    return this.client.get('/users/tiers');
  }

  // Game endpoints
  async recordGameResult(data: any) {
    return this.client.post('/games/results', data);
  }

  async getGameResults() {
    return this.client.get('/games/results');
  }

  async getGameResultsByMode(modeId: string) {
    return this.client.get(`/games/results/${modeId}`);
  }

  // Lesson endpoints
  async getLessons() {
    return this.client.get('/lessons');
  }

  async getLessonBySlug(slug: string) {
    return this.client.get(`/lessons/${slug}`);
  }

  async getLessonsByMode(modeId: string) {
    return this.client.get(`/lessons/mode/${modeId}`);
  }

  async getUserLessons() {
    return this.client.get('/lessons/user/my-lessons');
  }

  async startLesson(lessonId: string) {
    return this.client.post(`/lessons/${lessonId}/start`);
  }

  async updateLessonProgress(lessonId: string, progressPercentage: number) {
    return this.client.patch(`/lessons/${lessonId}/progress`, { progressPercentage });
  }

  // Market endpoints
  async getMarketItems() {
    return this.client.get('/market/items');
  }

  async getMarketItem(itemId: string) {
    return this.client.get(`/market/items/${itemId}`);
  }

  async getUserInventory() {
    return this.client.get('/market/inventory');
  }

  async purchaseItem(itemId: string) {
    return this.client.post(`/market/purchase/${itemId}`);
  }

  // Achievement endpoints
  async getAchievements() {
    return this.client.get('/achievements');
  }

  async getUserAchievements() {
    return this.client.get('/achievements/user');
  }

  async unlockAchievement(slug: string) {
    return this.client.post(`/achievements/unlock/${slug}`);
  }
}

export const apiClient = new ApiClient();
