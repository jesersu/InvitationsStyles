# Wedding Invitation - Implementation Guide

## ✅ Implementation Complete!

Your elegant wedding invitation app has been fully implemented with a professional React + TypeScript architecture. The app is currently running on `http://localhost:5174/`

---

## What Was Implemented

### 1. **Type System** (`src/types/index.ts`)
Comprehensive TypeScript interfaces for:
- `Wedding` - Main wedding data structure
- `WeddingEvent` - Individual events (ceremony, reception, etc.)
- `GuestConfirmation` - Guest RSVP data
- `BankAccount` - Payment information
- All context types for type safety

### 2. **State Management with Context API**

#### WeddingContext (`src/context/WeddingContext.tsx`)
Manages global wedding data:
- Fetches wedding details from API
- Falls back to mock data during development
- Handles loading and error states
- No external dependencies needed

#### GuestContext (`src/context/GuestContext.tsx`)
Manages guest confirmations:
- Stores confirmed RSVPs
- Handles form submissions
- Integrates with guest service

**Why Context API instead of Redux?**
- Simple, flat data structure (no deeply nested state)
- Built into React (no additional dependencies)
- Perfect for medium-complexity apps
- Easier to understand and maintain

### 3. **Custom Hooks** (`src/hooks/`)

#### `useWedding()`
Access wedding data and loading state anywhere in your app:
```tsx
const { wedding, loading, error, fetchWedding } = useWedding();
```

#### `useGuest()`
Access guest confirmations:
```tsx
const { confirmations, addConfirmation } = useGuest();
```

#### `useCountdown(targetDate)`
Real-time countdown timer:
```tsx
const countdown = useCountdown('2025-11-08T11:00:00-05:00');
// Returns: { days, hours, minutes, seconds }
```

### 4. **Service Layer** (`src/services/`)

#### `apiClient.ts`
Centralized API communication:
- Handles GET, POST, PUT requests
- Error handling
- Converts responses to JSON
- Configurable base URL from environment

#### `invitationService.ts`
Wedding data operations:
- Fetch wedding by ID
- Mock data for development
- Easy to replace with real API

#### `guestService.ts`
Guest operations:
- Save confirmations
- Retrieve confirmations
- Graceful fallback to local handling

### 5. **UI Components** (`src/components/ui/`)

#### Button
```tsx
<Button variant="primary" size="lg" fullWidth loading={isLoading}>
  Click me
</Button>
```
Variants: `primary` | `secondary` | `outline`
Sizes: `sm` | `md` | `lg`

#### Card
```tsx
<Card elevation="lg" rounded="lg">
  Content here
</Card>
```

#### Modal
```tsx
<Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Title">
  Content
</Modal>
```

#### Snackbar
```tsx
<Snackbar 
  message="Success!" 
  isOpen={showSnackbar} 
  onClose={handleClose}
  type="success" // 'success' | 'error' | 'info'
/>
```

### 6. **Section Components** (`src/components/sections/`)

These are the main invitation page sections:

#### CoverPage
Full-screen cover with couple image and open button
```tsx
<CoverPage
  title="Aron & Johanna"
  subtitle="Te invitamos a nuestra boda"
  coupleImageSrc="/couple.jpg"
  backgroundSrc="/bg.jpg"
  onOpen={() => {}}
  rememberOpen={true}
/>
```

#### InvitationCard
Beautiful invitation card with floral decorations
```tsx
<InvitationCard
  title="¡Nos casamos!"
  couple={{ groom: "Aron", bride: "Johanna" }}
/>
```

#### CountdownTimer
Live countdown to wedding date
```tsx
<CountdownTimer
  targetDate="2025-11-08T11:00:00-05:00"
  title="Cuenta regresiva"
/>
```

#### LocationCard
Map location with event details
```tsx
<LocationCard
  title="Ceremonia Religiosa"
  time="11:00 am"
  venue="Iglesia Santisima Cruz"
  mapUrl="https://maps.app.goo.gl/..."
  icon="⛪"
/>
```

#### ConfirmAttendanceCard
Guest RSVP form with validation
```tsx
<ConfirmAttendanceCard
  weddingId="wedding_001"
/>
```

### 7. **Main Page** (`src/pages/InvitationPage.tsx`)
Orchestrates all components:
- Fetches wedding data on mount
- Displays loading state
- Shows error handling
- Responsive layout
- Beautiful gradient background

---

## Project Structure

```
src/
├── types/
│   └── index.ts              # All TypeScript interfaces
│
├── context/
│   ├── WeddingContext.tsx    # Wedding state management
│   └── GuestContext.tsx      # Guest confirmations state
│
├── hooks/
│   ├── useWedding.ts         # Access wedding context
│   ├── useGuest.ts           # Access guest context
│   ├── useCountdown.ts       # Countdown logic
│   └── index.ts              # Barrel export
│
├── services/
│   ├── apiClient.ts          # HTTP wrapper
│   ├── invitationService.ts  # Wedding API calls
│   ├── guestService.ts       # Guest API calls
│   └── types.ts              # API response types
│
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   ├── Snackbar.tsx
│   │   └── index.ts
│   │
│   └── sections/
│       ├── CoverPage.tsx
│       ├── InvitationCard.tsx
│       ├── CountdownTimer.tsx
│       ├── LocationCard.tsx
│       ├── ConfirmAttendanceCard.tsx
│       └── index.ts
│
├── pages/
│   └── InvitationPage.tsx    # Main invitation page
│
├── App.tsx                   # App with providers
├── main.tsx                  # Entry point
└── index.css                 # Global styles
```

---

## How to Use

### 1. Start Development Server
```bash
npm run dev
```
Open `http://localhost:5174/`

### 2. Build for Production
```bash
npm run build
```
Creates optimized build in `dist/` folder

### 3. Run Linting
```bash
npm run lint
```

---

## Environment Variables

Create a `.env` file in the project root:

```env
# API Configuration (optional, has a default)
VITE_API_URL=http://localhost:3001

# Wedding ID to fetch
VITE_WEDDING_ID=wedding_001
```

During development, the app uses mock wedding data, so you don't need a backend to see it working!

---

## Data Flow Diagram

```
User Opens App
     ↓
App.tsx wraps with WeddingProvider & GuestProvider
     ↓
InvitationPage useEffect fetches wedding
     ↓
WeddingContext stores wedding data
     ↓
All child components access via useWedding() hook
     ↓
When guest submits form:
  ├→ ConfirmAttendanceCard collects data
  ├→ Calls useGuest().addConfirmation()
  ├→ GuestContext calls guestService.saveConfirmation()
  ├→ apiClient.post() sends to backend
  └→ Snackbar shows success/error
```

---

## Integrating with a Real Backend

### 1. Update API Endpoints

In `src/services/invitationService.ts`:
```typescript
export const invitationService = {
  async getWedding(id: string): Promise<Wedding> {
    // This will call: http://localhost:3001/api/weddings/{id}
    return apiClient.get<Wedding>(`/api/weddings/${id}`);
  },
};
```

### 2. Backend API should respond with:
```json
{
  "id": "wedding_001",
  "groomName": "Aron",
  "brideName": "Johanna",
  "date": "2025-11-08T11:00:00-05:00",
  "coverImage": "/couple-7.png",
  "backgroundImage": "/bg-web-2.jpg",
  "events": [
    {
      "id": "event_1",
      "name": "Ceremonia Religiosa",
      "dateTime": "2025-11-08T11:00:00-05:00",
      "location": "Iglesia Santisima Cruz",
      "mapUrl": "https://maps.app.goo.gl/...",
      "icon": "⛪"
    }
  ],
  "bankAccounts": [
    {
      "bank": "BCP",
      "accountNumber": "2159492904101428",
      "cci": "00221519492904101408",
      "yape": "+51 993727469"
    }
  ],
  "dresscode": "Elegante",
  "invitedGuests": 150
}
```

### 3. Handle Guest Confirmations

Backend endpoint: `POST /api/confirmations`

```json
{
  "id": "wedding_001-1234567890",
  "weddingId": "wedding_001",
  "guestName": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "isAttending": true,
  "numberOfGuests": 2,
  "dietaryRestrictions": "Vegetarian",
  "submittedAt": "2025-11-18T22:30:00Z"
}
```

---

## Customization Guide

### 1. Change Colors
Update `src/index.css` and component classes:
```css
/* Primary color: Rose/Pink */
/* Secondary color: Amber/Gold */
/* Modify Tailwind color references */
```

### 2. Modify Wedding Data Structure
1. Update `src/types/index.ts` with new fields
2. Update mock data in `src/services/invitationService.ts`
3. Components automatically get the new data

### 3. Add More Sections
1. Create new component in `src/components/sections/`
2. Export it in `src/components/sections/index.ts`
3. Use it in `src/pages/InvitationPage.tsx`

### 4. Add New Features
- Gift registry: Create `GiftService` + `GiftContext`
- Photo gallery: Create `Gallery` component
- Music player: Create `MusicPlayer` component
- Guest list management: Extend `GuestContext`

---

## Best Practices Used

✅ **Type Safety** - Full TypeScript, strict mode enabled
✅ **Separation of Concerns** - Services, hooks, components, context
✅ **Reusable Components** - UI components don't depend on business logic
✅ **Error Handling** - Try-catch blocks, fallback to mock data
✅ **Performance** - useCallback, useMemo where needed
✅ **Accessibility** - Semantic HTML, proper ARIA attributes
✅ **Responsive Design** - Mobile-first with Tailwind CSS
✅ **Clean Code** - Clear naming, no commented code, DRY principle

---

## Troubleshooting

### Port 5173 is already in use
The dev server automatically tries the next port (5174, 5175, etc.)

### Styles not appearing
Make sure `src/index.css` is imported in `src/main.tsx`

### API calls failing in development
The app falls back to mock data automatically. To use a real API:
1. Start your backend on `http://localhost:3001`
2. Update `VITE_API_URL` in `.env`

### Form submissions not working
Check the browser console for errors. Guest confirmations are handled with mock responses during development.

---

## Next Steps

1. **Add images** - Replace placeholder URLs in `invitationService.ts`
2. **Connect backend** - Update API endpoints
3. **Customize styles** - Modify Tailwind classes
4. **Add more features** - Photo galleries, gift registry, etc.
5. **Deploy** - Use Vercel, Netlify, or your preferred host

---

## Running Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview

# Lint code
npm run lint
```

Enjoy your elegant wedding invitation app! 🎉
