import React, { createContext, useState, type ReactNode } from 'react';
import type { Wedding, WeddingContextType } from '../types';
import { invitationService } from '../services/invitationService';

export const WeddingContext = createContext<WeddingContextType | undefined>(
  undefined
);

interface WeddingProviderProps {
  children: ReactNode;
}

export const WeddingProvider: React.FC<WeddingProviderProps> = ({ children }) => {
  const [wedding, setWedding] = useState<Wedding | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWedding = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Try to fetch from API, fall back to mock data
      try {
        const data = await invitationService.getWedding(id);
        setWedding(data);
      } catch (apiError) {
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
  };

  return (
    <WeddingContext.Provider value={{ wedding, loading, error, fetchWedding }}>
      {children}
    </WeddingContext.Provider>
  );
};
