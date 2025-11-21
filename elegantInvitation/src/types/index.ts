// Wedding event data
export interface WeddingEvent {
  id: string;
  name: string;
  dateTime: string;
  location: string;
  mapUrl: string;
  icon: string;
  description?: string;
}

export interface BankAccount {
  bank: string;
  accountNumber: string;
  cci: string;
  yape?: string;
}

export interface Wedding {
  id: string;
  groomName: string;
  brideName: string;
  date: string;
  coverImage: string;
  backgroundImage: string;
  backgroundImageMobile?: string;
  events: WeddingEvent[];
  bankAccounts: BankAccount[];
  dresscode: string;
  invitedGuests: number;
  message?: string;
}

// Guest confirmation data
export interface GuestConfirmation {
  id: string;
  weddingId: string;
  guestName: string;
  email: string;
  phone: string;
  isAttending: boolean;
  numberOfGuests: number;
  dietaryRestrictions?: string;
  recommendedSong?: string;
  selectedGift?: string;
  submittedAt: string;
}

// Context types
export interface WeddingContextType {
  wedding: Wedding | null;
  loading: boolean;
  error: string | null;
  fetchWedding: (id: string) => Promise<void>;
}

export interface GuestContextType {
  confirmations: GuestConfirmation[];
  loading: boolean;
  error: string | null;
  addConfirmation: (confirmation: GuestConfirmation) => Promise<void>;
  getConfirmation: (id: string) => GuestConfirmation | undefined;
}
