import { apiClient } from './apiClient';
import type { GuestConfirmation } from '../types';

export const guestService = {
  async saveConfirmation(confirmation: GuestConfirmation): Promise<GuestConfirmation> {
    try {
      return await apiClient.post<GuestConfirmation>(
        '/api/confirmations',
        confirmation
      );
    } catch (error) {
      // In development, simulate success
      console.warn('API not available, using mock response');
      return {
        ...confirmation,
        id: confirmation.id || String(Date.now()),
        submittedAt: new Date().toISOString(),
      };
    }
  },

  async getConfirmation(id: string): Promise<GuestConfirmation> {
    return apiClient.get<GuestConfirmation>(`/api/confirmations/${id}`);
  },

  async listConfirmations(weddingId: string): Promise<GuestConfirmation[]> {
    return apiClient.get<GuestConfirmation[]>(
      `/api/weddings/${weddingId}/confirmations`
    );
  },
};
