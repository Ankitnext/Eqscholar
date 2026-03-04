'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { apiClient } from '@/services/api-client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LessonsPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [lessons, setLessons] = useState<any[]>([]);
  const [userLessons, setUserLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/auth/login');
      return;
    }

    if (!authLoading && isAuthenticated) {
      fetchLessons();
    }
  }, [isAuthenticated, authLoading, router]);

  const fetchLessons = async () => {
    try {
      const [lessonsRes, userLessonsRes] = await Promise.all([
        apiClient.getLessons(),
        apiClient.getUserLessons(),
      ]);
      setLessons(lessonsRes.data);
      setUserLessons(userLessonsRes.data);
    } catch (error) {
      console.error('Failed to fetch lessons:', error);
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
          <Link href="/lessons" style={{ color: '#fff', textDecoration: 'none', marginRight: '20px', fontWeight: 'bold' }}>
            Lessons
          </Link>
          <Link href="/games" style={{ color: '#fff', textDecoration: 'none' }}>
            Games
          </Link>
        </div>
      </nav>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        <h1 style={{ marginBottom: '30px', color: '#333' }}>Learn & Grow</h1>

        {lessons.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {lessons.map((lesson) => {
              const userLesson = userLessons.find((ul) => ul.lessonId === lesson.id);
              const progress = userLesson?.progressPercentage || 0;

              return (
                <div key={lesson.id} style={{ background: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                  <div style={{ padding: '20px' }}>
                    <h3 style={{ marginBottom: '10px', color: '#333' }}>{lesson.title}</h3>
                    <p style={{ color: '#666', fontSize: '14px', marginBottom: '15px' }}>{lesson.description}</p>

                    {progress > 0 && (
                      <div style={{ marginBottom: '15px' }}>
                        <div style={{ fontSize: '12px', color: '#999', marginBottom: '5px' }}>Progress: {progress}%</div>
                        <div
                          style={{
                            width: '100%',
                            height: '8px',
                            background: '#eee',
                            borderRadius: '4px',
                            overflow: 'hidden',
                          }}
                        >
                          <div
                            style={{
                              width: `${progress}%`,
                              height: '100%',
                              background: 'linear-gradient(90deg, #667eea, #764ba2)',
                            }}
                          />
                        </div>
                      </div>
                    )}

                    <button
                      onClick={() => {
                        if (userLesson) {
                          // Continue lesson
                          alert(`Continuing ${lesson.title}...`);
                        } else {
                          // Start lesson
                          alert(`Starting ${lesson.title}...`);
                        }
                      }}
                      style={{
                        width: '100%',
                        padding: '10px',
                        background: '#667eea',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: '600',
                      }}
                    >
                      {userLesson ? 'Continue' : 'Start'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>No lessons available</div>
        )}
      </div>
    </div>
  );
}
