import React, { createContext, useState, type ReactNode } from 'react';
import type { GuestConfirmation, GuestContextType } from '../types';
import { guestService } from '../services/guestService';

export const GuestContext = createContext<GuestContextType | undefined>(
  undefined
);

interface GuestProviderProps {
  children: ReactNode;
}

export const GuestProvider: React.FC<GuestProviderProps> = ({ children }) => {
  const [confirmations, setConfirmations] = useState<GuestConfirmation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addConfirmation = async (confirmation: GuestConfirmation) => {
    try {
      setLoading(true);
      setError(null);
      const saved = await guestService.saveConfirmation(confirmation);
      setConfirmations([...confirmations, saved]);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to save confirmation';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const getConfirmation = (id: string) =>
    confirmations.find((c) => c.id === id);

  return (
    <GuestContext.Provider
      value={{ confirmations, loading, error, addConfirmation, getConfirmation }}
    >
      {children}
    </GuestContext.Provider>
  );
};
