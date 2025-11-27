import React, { useState, useCallback, useMemo, type ReactNode } from 'react';
import type { Wedding } from '../types';
import { WeddingContext } from './wedding';
import { invitationService } from '../services/invitationService';

interface WeddingProviderProps {
  children: ReactNode;
}

export const WeddingProvider: React.FC<WeddingProviderProps> = ({ children }) => {
  const [wedding, setWedding] = useState<Wedding | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWedding = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      // Try to fetch from API, fall back to mock data
      try {
        const data = await invitationService.getWedding(id);
        setWedding(data);
      } catch {
        console.warn('Failed to fetch from API, using mock data');
        const mockData = invitationService.getMockWedding();
        setWedding(mockData);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load wedding';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Memoize context value to prevent unnecessary re-renders of consumers
  const value = useMemo(
    () => ({ wedding, loading, error, fetchWedding }),
    [wedding, loading, error, fetchWedding]
  );

  return (
    <WeddingContext.Provider value={value}>
      {children}
    </WeddingContext.Provider>
  );
};
