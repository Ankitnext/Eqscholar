// Placeholder hook for user data
import { useEffect, useState } from 'react';
import { apiClient } from '@/services/api-client';

export function useUserProgress() {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await apiClient.getUserProgress();
        setProgress(response.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, []);

  return { progress, loading, error };
}
