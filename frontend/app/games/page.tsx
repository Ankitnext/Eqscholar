'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { apiClient } from '@/services/api-client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function GamesPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [gameResults, setGameResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const GAME_MODES = [
    { id: 'lost', name: 'Lost Mode', emoji: '😕' },
    { id: 'chaotic', name: 'Chaotic Mode', emoji: '🌪️' },
    { id: 'addiction', name: 'Addiction Loop', emoji: '🔄' },
    { id: 'storm', name: 'Storm Mode', emoji: '⛈️' },
    { id: 'shadow', name: 'Shadow Walker', emoji: '👤' },
  ];

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/auth/login');
      return;
    }

    if (!authLoading && isAuthenticated) {
      fetchGameResults();
    }
  }, [isAuthenticated, authLoading, router]);

  const fetchGameResults = async () => {
    try {
      const response = await apiClient.getGameResults();
      setGameResults(response.data);
    } catch (error) {
      console.error('Failed to fetch game results:', error);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return <div style={{ textAlign: 'center', padding: '40px' }}>Loading...</div>;
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      {/* Header */}
      <nav style={{ background: '#000', padding: '20px', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffd700', textDecoration: 'none' }}>
          EQScholar
        </Link>
        <div>
          <Link href="/dashboard" style={{ color: '#fff', textDecoration: 'none', marginRight: '20px' }}>
            Dashboard
          </Link>
          <Link href="/games" style={{ color: '#fff', textDecoration: 'none', marginRight: '20px', fontWeight: 'bold' }}>
            Games
          </Link>
          <Link href="/lessons" style={{ color: '#fff', textDecoration: 'none' }}>
            Lessons
          </Link>
        </div>
      </nav>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        <h1 style={{ marginBottom: '30px', color: '#333' }}>Play Games & Master EQ</h1>

        {/* Game Modes Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          {GAME_MODES.map((mode) => (
            <div
              key={mode.id}
              style={{
                background: '#fff',
                padding: '30px',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'transform 0.3s, box-shadow 0.3s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 16px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
              }}
            >
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>{mode.emoji}</div>
              <h3 style={{ marginBottom: '16px', color: '#333' }}>{mode.name}</h3>
              <button
                onClick={() => {
                  // TODO: Implement game launch
                  alert(`Launching ${mode.name}...`);
                }}
                style={{
                  padding: '10px 20px',
                  background: '#667eea',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: '600',
                }}
              >
                Play Now
              </button>
            </div>
          ))}
        </div>

        {/* Recent Results */}
        {gameResults.length > 0 && (
          <div style={{ background: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <h2 style={{ marginBottom: '20px', color: '#333' }}>Recent Results</h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #eee' }}>
                    <th style={{ padding: '12px', textAlign: 'left', color: '#666' }}>Mode</th>
                    <th style={{ padding: '12px', textAlign: 'left', color: '#666' }}>Score</th>
                    <th style={{ padding: '12px', textAlign: 'left', color: '#666' }}>Points Earned</th>
                    <th style={{ padding: '12px', textAlign: 'left', color: '#666' }}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {gameResults.slice(0, 10).map((result, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '12px', color: '#333' }}>{result.modeId}</td>
                      <td style={{ padding: '12px', color: '#667eea', fontWeight: 'bold' }}>{result.score}</td>
                      <td style={{ padding: '12px', color: '#f5576c' }}>+{result.eqPointsEarned}</td>
                      <td style={{ padding: '12px', color: '#999' }}>{new Date(result.playedAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
