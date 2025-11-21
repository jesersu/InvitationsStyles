import { useContext } from 'react';
import { WeddingContext } from '../context/wedding';

export const useWedding = () => {
  const context = useContext(WeddingContext);
  if (!context) {//if context is null or undefined
    throw new Error('useWedding must be used within WeddingProvider');
  }
  return context;
};
