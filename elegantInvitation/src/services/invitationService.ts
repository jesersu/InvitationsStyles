import { apiClient } from './apiClient';
import type { Wedding } from '../types';
import coupleImage from '../assets/cover-couple.png';
import backgroundImageMobile from '../assets/bg-cover.png';
import backgroundImageWeb from '../assets/cover-bg-web.png';

export const invitationService = {
  async getWedding(id: string): Promise<Wedding> {
    return apiClient.get<Wedding>(`/api/weddings/${id}`);
  },

  async getAllWeddings(): Promise<Wedding[]> {
    return apiClient.get<Wedding[]>('/api/weddings');
  },

  // Fallback mock data for development
  getMockWedding(): Wedding {
    return {
      id: 'wedding_001',
      groomName: 'Aron',
      brideName: 'Johanna',
      date: '2025-11-08T11:00:00-05:00',
      coverImage: coupleImage,
      backgroundImage: backgroundImageWeb,
      backgroundImageMobile: backgroundImageMobile,
      events: [
        {
          id: 'event_1',
          name: 'Ceremonia Religiosa',
          dateTime: '2025-11-08T11:00:00-05:00',
          location: 'Iglesia Santisima Cruz de la Tomilla - Cayma',
          mapUrl: 'https://maps.app.goo.gl/AfT2Yk1YWmnHmC3M8',
          icon: '⛪',
        },
        {
          id: 'event_2',
          name: 'Recepción',
          dateTime: '2025-11-08T13:00:00-05:00',
          location: 'Boulevard Paraiso',
          mapUrl: 'https://maps.app.goo.gl/S96Rn3avCsm1U1rr7',
          icon: '🎉',
        },
      ],
      bankAccounts: [
        {
          bank: 'BCP',
          accountNumber: '2159492904101428',
          cci: '00221519492904101408',
          yape: '+51 993727469',
        },
      ],
      dresscode: 'Elegante',
      invitedGuests: 150,
      message: 'Nos llena de alegría compartir este momento con ustedes. ¡Gracias por ser parte de nuestra historia!',
    };
  },
};
