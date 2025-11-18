import { useContext } from 'react';
import { WeddingContext } from '../context/WeddingContext';

export const useWedding = () => {
  const context = useContext(WeddingContext);
  if (!context) {
    throw new Error('useWedding must be used within WeddingProvider');
  }
  return context;
};
