# Quick Reference Cheat Sheet

## Common Tasks

### Access Wedding Data
```tsx
import { useWedding } from '../hooks';

function MyComponent() {
  const { wedding, loading, error } = useWedding();
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return <div>{wedding?.brideName}</div>;
}
```

### Handle Guest Confirmation
```tsx
import { useGuest } from '../hooks';

function ConfirmationForm() {
  const { addConfirmation } = useGuest();
  
  const handleSubmit = async (data) => {
    await addConfirmation({
      id: 'unique-id',
      weddingId: 'wedding_001',
      guestName: data.name,
      email: data.email,
      phone: data.phone,
      isAttending: true,
      numberOfGuests: 2,
      submittedAt: new Date().toISOString(),
    });
  };
}
```

### Countdown Timer
```tsx
import { useCountdown } from '../hooks';

function Countdown() {
  const { days, hours, minutes, seconds } = useCountdown('2025-11-08');
  
  return (
    <div>
      {days}d {hours}h {minutes}m {seconds}s
    </div>
  );
}
```

### Use Reusable Components
```tsx
import { Button, Card, Modal, Snackbar } from './components/ui';

// Button
<Button variant="primary" size="lg">Click</Button>

// Card
<Card elevation="lg" rounded="lg">Content</Card>

// Modal
<Modal isOpen={open} onClose={() => setOpen(false)}>Content</Modal>

// Snackbar
<Snackbar message="Success!" isOpen={true} type="success" />
```

### Make API Calls
```tsx
// In a service file
import { apiClient } from './apiClient';

export const myService = {
  async getData(id: string) {
    return apiClient.get(`/api/data/${id}`);
  },
  
  async saveData(data: unknown) {
    return apiClient.post('/api/data', data);
  },
};
```

### Add New Context
```tsx
// 1. Create context
import { createContext, useState, ReactNode } from 'react';

export const MyContext = createContext<MyContextType | undefined>(undefined);

export const MyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState(initialValue);
  
  return (
    <MyContext.Provider value={{ state, setState }}>
      {children}
    </MyContext.Provider>
  );
};

// 2. Create hook
export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) throw new Error('Must be used with MyProvider');
  return context;
};

// 3. Wrap app
<MyProvider>
  <App />
</MyProvider>
```

---

## File Organization Rules

- **Types**: `src/types/index.ts` - All interfaces
- **Context**: `src/context/*.tsx` - State management
- **Hooks**: `src/hooks/*.ts` - Custom hooks
- **Services**: `src/services/*.ts` - API & business logic
- **Components**: `src/components/{ui,sections}/*.tsx` - Reusable parts
- **Pages**: `src/pages/*.tsx` - Route components

---

## Naming Conventions

- **Contexts**: `WeddingContext`, `GuestContext`
- **Hooks**: `useWedding`, `useGuest`, `useCountdown`
- **Services**: `invitationService`, `guestService`
- **Components**: `InvitationCard`, `ConfirmAttendanceCard`
- **Types**: `Wedding`, `GuestConfirmation`, `WeddingEvent`
- **Interfaces**: `ButtonProps`, `CardProps`

---

## Component Props Pattern

```tsx
interface ComponentProps {
  // Required props first
  requiredProp: string;
  
  // Optional with defaults
  optionalProp?: string;
  variant?: 'primary' | 'secondary';
  
  // Callbacks last
  onClose: () => void;
}

export const Component: React.FC<ComponentProps> = ({
  requiredProp,
  optionalProp = 'default',
  variant = 'primary',
  onClose,
}) => {
  // Component code
};
```

---

## Error Handling Pattern

```tsx
try {
  const data = await apiCall();
  // Handle success
} catch (err) {
  const message = err instanceof Error ? err.message : 'Unknown error';
  console.error('Operation failed:', message);
  // Show error UI
}
```

---

## Form Handling Pattern

```tsx
const [formData, setFormData] = useState({ name: '', email: '' });
const [loading, setLoading] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  try {
    await submitForm(formData);
    // Success
  } catch (err) {
    // Error
  } finally {
    setLoading(false);
  }
};

return (
  <form onSubmit={handleSubmit}>
    <input
      value={formData.name}
      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
    />
    <Button type="submit" loading={loading}>Submit</Button>
  </form>
);
```

---

## Tailwind Classes Quick Reference

```tsx
// Spacing
p-4 (padding), m-4 (margin), gap-4 (gap)

// Colors
bg-rose-600 (background), text-white (text), border-gray-300 (border)

// Sizing
w-full, h-screen, max-w-2xl, aspect-[3/4]

// Flexbox
flex, justify-center, items-center, flex-col

// Grid
grid, grid-cols-2, gap-4

// Responsive
sm: (640px), md: (768px), lg: (1024px)
Example: md:grid-cols-2 (2 columns on medium+ screens)

// Hover/Active
hover:bg-rose-700, disabled:opacity-50

// Opacity
opacity-50, bg-black/40

// Rounded
rounded-lg, rounded-full
```

---

## Environment Variables

```
VITE_API_URL         # Backend API base URL
VITE_WEDDING_ID      # Wedding ID to load
```

Access in code:
```tsx
const apiUrl = import.meta.env.VITE_API_URL;
const weddingId = import.meta.env.VITE_WEDDING_ID;
```

---

## Debugging Tips

```tsx
// Log values
console.log('Wedding:', wedding);

// Check if hook is working
const ctx = useWedding();
console.log('Context:', ctx);

// Network requests (DevTools)
// F12 → Network tab → Filter: XHR/Fetch

// TypeScript errors
// npm run build (shows all errors)

// React DevTools
// Chrome Extension: React DevTools
```

---

## Performance Tips

1. **Memoize expensive computations**
   ```tsx
   const memoizedValue = useMemo(() => expensiveCalc(), [deps]);
   ```

2. **Memoize callbacks**
   ```tsx
   const memoizedCallback = useCallback(() => {}, [deps]);
   ```

3. **Lazy load components**
   ```tsx
   const Component = lazy(() => import('./Component'));
   ```

4. **Split code by route**
   ```tsx
   const LazyPage = lazy(() => import('./pages/Page'));
   ```

---

## Common Mistakes to Avoid

❌ **Don't**: Import types without `type` keyword (will cause build errors)
✅ **Do**: `import type { Wedding } from '../types';`

❌ **Don't**: Use context outside provider
✅ **Do**: Wrap component tree with provider in App.tsx

❌ **Don't**: Forget to handle loading/error states
✅ **Do**: Show spinner during loading, error message on failure

❌ **Don't**: Make API calls in render
✅ **Do**: Use useEffect with dependency array

❌ **Don't**: Mutate state directly
✅ **Do**: Use setState or spread operator

---

## Quick Links

- Tailwind CSS: https://tailwindcss.com/docs
- React Docs: https://react.dev
- TypeScript Handbook: https://www.typescriptlang.org/docs
- Vite Docs: https://vite.dev

Happy coding! 🎉
