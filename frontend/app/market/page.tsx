'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { apiClient } from '@/services/api-client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function MarketPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [items, setItems] = useState<any[]>([]);
  const [inventory, setInventory] = useState<any[]>([]);
  const [userPoints, setUserPoints] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/auth/login');
      return;
    }

    if (!authLoading && isAuthenticated) {
      fetchMarketData();
    }
  }, [isAuthenticated, authLoading, router]);

  const fetchMarketData = async () => {
    try {
      const [itemsRes, inventoryRes, progressRes] = await Promise.all([
        apiClient.getMarketItems(),
        apiClient.getUserInventory(),
        apiClient.getUserProgress(),
      ]);
      setItems(itemsRes.data);
      setInventory(inventoryRes.data);
      setUserPoints(progressRes.data.eqPoints);
    } catch (error) {
      console.error('Failed to fetch market data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async (itemId: string) => {
    try {
      await apiClient.purchaseItem(itemId);
      // Refresh data after purchase
      await fetchMarketData();
      alert('Item purchased successfully!');
    } catch (error: any) {
      alert(error.response?.data?.message || 'Purchase failed');
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ background: 'rgba(255,200,0,0.2)', padding: '8px 16px', borderRadius: '20px', fontWeight: '600' }}>💰 {userPoints} Points</div>
          <Link href="/dashboard" style={{ color: '#fff', textDecoration: 'none' }}>
            Dashboard
          </Link>
          <Link href="/market" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>
            Market
          </Link>
        </div>
      </nav>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        <h1 style={{ marginBottom: '30px', color: '#333' }}>EQ Market Store</h1>

        {/* Market Items */}
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ marginBottom: '20px', color: '#333' }}>Available Items</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
            {items.map((item) => (
              <div key={item.id} style={{ background: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <h3 style={{ marginBottom: '10px', color: '#333' }}>{item.name}</h3>
                <p style={{ color: '#666', fontSize: '14px', marginBottom: '15px' }}>{item.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#f5576c' }}>💰 {item.cost}</span>
                  <button
                    onClick={() => handlePurchase(item.id)}
                    disabled={userPoints < item.cost}
                    style={{
                      padding: '8px 16px',
                      background: userPoints < item.cost ? '#ccc' : '#667eea',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: userPoints < item.cost ? 'not-allowed' : 'pointer',
                      fontWeight: '600',
                    }}
                  >
                    Buy
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Inventory */}
        {inventory.length > 0 && (
          <div>
            <h2 style={{ marginBottom: '20px', color: '#333' }}>Your Inventory</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
              {inventory.map((item) => (
                <div
                  key={item.id}
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: '#fff',
                    padding: '20px',
                    borderRadius: '12px',
                    textAlign: 'center',
                  }}
                >
                  <h3 style={{ marginBottom: '10px' }}>{item.itemName}</h3>
                  <div style={{ fontSize: '12px', opacity: 0.8 }}>Acquired: {new Date(item.acquiredAt).toLocaleDateString()}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
