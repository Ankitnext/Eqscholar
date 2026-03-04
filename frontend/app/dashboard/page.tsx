'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { apiClient } from '@/services/api-client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface UserProgress {
  eqScore: number;
  eqPoints: number;
  totalGamesPlayed: number;
  tier: { name: string; min: number; max: number };
}

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, logout, isLoading: authLoading } = useAuth();
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/auth/login');
      return;
    }

    if (!authLoading && isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated, authLoading, router]);

  const fetchData = async () => {
    try {
      const [progressRes, leaderboardRes] = await Promise.all([
        apiClient.getUserProgress(),
        apiClient.getLeaderboard(),
      ]);
      setProgress(progressRes.data);
      setLeaderboard(leaderboardRes.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return <div style={{ textAlign: 'center', padding: '40px' }}>Loading...</div>;
  }

  if (!user) {
    return <div>Not authenticated</div>;
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      {/* Header */}
      <nav style={{ background: '#000', padding: '20px', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffd700', textDecoration: 'none' }}>
          EQScholar
        </Link>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <Link href="/games" style={{ color: '#fff', textDecoration: 'none' }}>
            Games
          </Link>
          <Link href="/lessons" style={{ color: '#fff', textDecoration: 'none' }}>
            Lessons
          </Link>
          <Link href="/market" style={{ color: '#fff', textDecoration: 'none' }}>
            Market
          </Link>
          <span>{user.username}</span>
          <button
            onClick={logout}
            style={{ padding: '8px 16px', background: '#667eea', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        {/* User Info */}
        <div style={{ background: '#fff', padding: '30px', borderRadius: '12px', marginBottom: '30px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <h1 style={{ marginBottom: '20px', color: '#333' }}>Welcome, {user.firstName || user.username}!</h1>
          {progress && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
              <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#fff', padding: '20px', borderRadius: '8px' }}>
                <div style={{ fontSize: '14px', opacity: 0.8 }}>EQ Score</div>
                <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{progress.eqScore}</div>
              </div>
              <div style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: '#fff', padding: '20px', borderRadius: '8px' }}>
                <div style={{ fontSize: '14px', opacity: 0.8 }}>EQ Points</div>
                <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{progress.eqPoints}</div>
              </div>
              <div style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', color: '#fff', padding: '20px', borderRadius: '8px' }}>
                <div style={{ fontSize: '14px', opacity: 0.8 }}>Current Tier</div>
                <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{progress.tier.name}</div>
              </div>
              <div style={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', color: '#fff', padding: '20px', borderRadius: '8px' }}>
                <div style={{ fontSize: '14px', opacity: 0.8 }}>Games Played</div>
                <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{progress.totalGamesPlayed}</div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
          <Link
            href="/games"
            style={{
              padding: '30px',
              background: '#fff',
              border: '2px solid #667eea',
              borderRadius: '12px',
              textDecoration: 'none',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.boxShadow = '0 8px 16px rgba(102, 126, 234, 0.3)';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.boxShadow = 'none';
            }}
          >
            <div style={{ fontSize: '24px', marginBottom: '10px' }}>🎮</div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }}>Play Games</div>
          </Link>
          <Link
            href="/lessons"
            style={{
              padding: '30px',
              background: '#fff',
              border: '2px solid #f093fb',
              borderRadius: '12px',
              textDecoration: 'none',
              textAlign: 'center',
              cursor: 'pointer',
            }}
          >
            <div style={{ fontSize: '24px', marginBottom: '10px' }}>📚</div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }}>Learn Lessons</div>
          </Link>
          <Link
            href="/market"
            style={{
              padding: '30px',
              background: '#fff',
              border: '2px solid #4facfe',
              borderRadius: '12px',
              textDecoration: 'none',
              textAlign: 'center',
              cursor: 'pointer',
            }}
          >
            <div style={{ fontSize: '24px', marginBottom: '10px' }}>🛍️</div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }}>EQ Market</div>
          </Link>
        </div>

        {/* Leaderboard */}
        <div style={{ background: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <h2 style={{ marginBottom: '20px', color: '#333' }}>Top Players</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #eee' }}>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#666' }}>Rank</th>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#666' }}>Player</th>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#666' }}>EQ Score</th>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#666' }}>Tier</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.slice(0, 10).map((entry, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '12px', color: '#333' }}>{entry.rank}</td>
                    <td style={{ padding: '12px', color: '#333' }}>{entry.user.username}</td>
                    <td style={{ padding: '12px', color: '#667eea', fontWeight: 'bold' }}>{entry.eqScore}</td>
                    <td style={{ padding: '12px', color: '#f5576c' }}>{entry.tier.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
