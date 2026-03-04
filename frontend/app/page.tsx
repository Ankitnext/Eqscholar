'use client';

import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <nav style={{ background: '#000', padding: '20px', color: '#fff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '30px', justifyContent: 'space-between' }}>
          <Link href="/" style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffd700' }}>
            EQScholar
          </Link>
          <div style={{ display: 'flex', gap: '20px' }}>
            <Link href="/auth/login">Login</Link>
            <Link href="/auth/register">Register</Link>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/games">Games</Link>
            <Link href="/lessons">Lessons</Link>
            <Link href="/market">Market</Link>
          </div>
        </div>
      </nav>

      <section
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
        }}
      >
        <div style={{ textAlign: 'center', color: '#fff' }}>
          <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>Welcome to EQScholar</h1>
          <p style={{ fontSize: '18px', marginBottom: '30px' }}>Master your emotional intelligence through interactive games and lessons</p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
            <Link
              href="/auth/register"
              style={{
                padding: '12px 30px',
                background: '#ffd700',
                color: '#000',
                textDecoration: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
              }}
            >
              Get Started
            </Link>
            <Link
              href="/dashboard"
              style={{
                padding: '12px 30px',
                background: 'rgba(255,255,255,0.2)',
                color: '#fff',
                textDecoration: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                border: '2px solid #fff',
              }}
            >
              Explore
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
