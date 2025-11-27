import React, { createContext, useReducer, useMemo, type ReactNode } from 'react';
import type { GuestConfirmation, GuestContextType } from '../types';
import { guestService } from '../services/guestService';

export const GuestContext = createContext<GuestContextType | undefined>(
  undefined
);

interface GuestState {
  confirmations: GuestConfirmation[];
  loading: boolean;
  error: string | null;
}

type GuestAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'ADD_CONFIRMATION'; payload: GuestConfirmation }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'CLEAR_ERROR' };

const guestReducer = (state: GuestState, action: GuestAction): GuestState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'ADD_CONFIRMATION':
      return { ...state, confirmations: [...state.confirmations, action.payload] };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
};

interface GuestProviderProps {
  children: ReactNode;
}

export const GuestProvider: React.FC<GuestProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(guestReducer, {
    confirmations: [],
    loading: false,
    error: null,
  });

  const addConfirmation = async (confirmation: GuestConfirmation) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'CLEAR_ERROR' });
      const saved = await guestService.saveConfirmation(confirmation);
      dispatch({ type: 'ADD_CONFIRMATION', payload: saved });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to save confirmation';
      dispatch({ type: 'SET_ERROR', payload: message });
      throw new Error(message);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const getConfirmation = (id: string) =>
    state.confirmations.find((c) => c.id === id);

  // Memoize context value to prevent unnecessary re-renders of consumers
  const value = useMemo(
    () => ({
      confirmations: state.confirmations,
      loading: state.loading,
      error: state.error,
      addConfirmation,
      getConfirmation,
    }),
    [state.confirmations, state.loading, state.error]
  );

  return (
    <GuestContext.Provider value={value}>
      {children}
    </GuestContext.Provider>
  );
};
