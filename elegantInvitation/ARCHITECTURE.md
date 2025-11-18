# Architecture Decision Guide

## Why This Architecture?

This document explains the architectural choices made and when to modify them.

---

## 1. Context API Instead of Redux

### Decision: ✅ Use Context API

**Why?**
- Wedding data structure is relatively flat
- No complex state mutations
- No circular dependencies between state slices
- Team size is small (easier to understand)
- Faster development for small-to-medium apps

**Metrics**
- Redux is best for apps with 50+ pieces of state
- This app has ~5 main state domains
- Redux adds 5 files per feature (action, reducer, types, etc.)

### When to Switch to Redux
- App grows to 100+ components
- Multiple teams need strict state patterns
- Need time-travel debugging in production
- State mutations become complex
- Performance issues with Context re-renders

---

## 2. Separation of Services and Hooks

### Decision: ✅ Separate Services from Hooks

**Architecture**
```
Service Layer (Pure business logic)
    ↓
Hook Layer (Integrates with React)
    ↓
Component Layer (UI only)
```

**Why?**
- Services are testable without React
- Hooks handle React-specific concerns
- Components stay focused on rendering
- Easy to replace HTTP client later

**Example**
```tsx
// ❌ Wrong: Logic in component
function Component() {
  const [data, setData] = useState();
  useEffect(() => {
    fetch('/api/data')
      .then(r => r.json())
      .then(setData);
  }, []);
}

// ✅ Right: Separate concerns
// service/dataService.ts
export const dataService = {
  async getData() { /* ... */ }
};

// hooks/useData.ts
export const useData = () => {
  const [data, setData] = useState();
  useEffect(() => {
    dataService.getData().then(setData);
  }, []);
  return data;
};

// Component.tsx
function Component() {
  const data = useData();
}
```

---

## 3. API Client Abstraction

### Decision: ✅ Single apiClient for all requests

**Benefits**
- One place to add headers (auth, etc.)
- One place to handle errors globally
- One place to add retry logic
- Easy to mock for testing

**How to Add Global Headers**
```typescript
// src/services/apiClient.ts
async get<T>(endpoint: string): Promise<T> {
  const token = localStorage.getItem('auth_token');
  const response = await fetch(`${this.baseURL}${endpoint}`, {
    headers: { 
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
  });
  // ...
}
```

**How to Add Global Error Handling**
```typescript
// Add to apiClient
async post<T>(endpoint: string, data: unknown): Promise<T> {
  try {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });
    
    if (response.status === 401) {
      // Handle auth failure globally
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    return response.json();
  } catch (error) {
    // Log to Sentry/error tracking
    logError(error);
    throw error;
  }
}
```

---

## 4. Component Organization

### Structure
```
components/
├── ui/              # Reusable, no business logic
│   ├── Button
│   ├── Modal
│   └── ...
└── sections/        # Page sections, compose ui components
    ├── CoverPage
    ├── InvitationCard
    └── ...
```

### Why Separate ui from sections?

**UI Components**
- No business logic
- No API calls
- Fully controlled by props
- Can be shared across projects
- Example: `<Button>`, `<Card>`, `<Modal>`

**Section Components**
- May contain business logic
- May use hooks
- May call services
- Specific to this app
- Example: `<CoverPage>`, `<ConfirmAttendanceCard>`

### When to Create a Component
1. Used in multiple places → UI component
2. Complex with internal state → Feature component
3. Page section → Section component
4. Single use → Inline (don't over-engineer)

---

## 5. Data Flow

### Unidirectional Flow (GOOD ✅)
```
User Action
    ↓
Event Handler
    ↓
Service Call
    ↓
State Update (Context)
    ↓
Component Re-render
```

### Bidirectional Flow (BAD ❌)
```
Component A ←→ Component B
   (direct prop drilling or cross-communication)
```

### The Rule
> **Always flow data down, events up**

```tsx
// ❌ Wrong: Siblings communicating
function Parent() {
  return (
    <>
      <ComponentA setSharedData={setSharedData} />
      <ComponentB sharedData={sharedData} />
    </>
  );
}

// ✅ Right: Use context
function Parent() {
  return (
    <SharedContext.Provider value={{ data, setData }}>
      <ComponentA />
      <ComponentB />
    </SharedContext.Provider>
  );
}
```

---

## 6. Error Handling Strategy

### Three Levels of Error Handling

**Level 1: Service Level**
```typescript
// guestService.ts
export const guestService = {
  async saveConfirmation(confirmation) {
    try {
      return await apiClient.post('/api/confirmations', confirmation);
    } catch (error) {
      console.error('Failed to save:', error);
      // Fallback to local storage
      return confirmation;
    }
  },
};
```

**Level 2: Hook Level**
```typescript
// useGuest.ts
const addConfirmation = async (confirmation) => {
  try {
    const saved = await guestService.saveConfirmation(confirmation);
    setConfirmations([...confirmations, saved]);
  } catch (err) {
    setError(err.message);
    throw err; // Let component decide
  }
};
```

**Level 3: Component Level**
```typescript
// Component.tsx
const handleSubmit = async (data) => {
  try {
    await addConfirmation(data);
    showSnackbar('Success!', 'success');
  } catch (err) {
    showSnackbar('Failed to save', 'error');
  }
};
```

---

## 7. Performance Considerations

### Context Re-renders
**Problem**: When context value changes, ALL consumers re-render
**Solution**: Split contexts by concern

```typescript
// ❌ Single context (all consumers update together)
<WeddingContext value={{ wedding, guests, settings }}>

// ✅ Split contexts (only affected consumers update)
<WeddingContext value={{ wedding }}>
  <GuestContext value={{ guests }}>
    <SettingsContext value={{ settings }}>
```

### When Optimization is Needed
- More than 50 components
- Re-renders happen more than once per second
- User reports sluggish behavior
- Measure with React DevTools Profiler first

---

## 8. Testing Strategy

### Unit Tests (Services)
```typescript
// guestService.test.ts
describe('guestService', () => {
  it('should save confirmation', async () => {
    const result = await guestService.saveConfirmation(mockData);
    expect(result.id).toBeDefined();
  });
});
```

### Integration Tests (Hooks)
```typescript
// useGuest.test.tsx
describe('useGuest', () => {
  it('should add confirmation', async () => {
    const { result } = renderHook(() => useGuest(), {
      wrapper: GuestProvider,
    });
    // Test hook behavior
  });
});
```

### E2E Tests (Pages)
```typescript
// invitation.e2e.test.ts
describe('Invitation Page', () => {
  it('should display cover and open on button click', () => {
    cy.visit('/');
    cy.contains('ABRIR INVITACIÓN').click();
    cy.contains('¡Nos casamos!').should('be.visible');
  });
});
```

---

## 9. Scaling Strategies

### Small (Current)
```
1-5 pages, < 30 components
Current architecture is perfect
```

### Medium
```
5-20 pages, 30-100 components
Consider:
- Add lazy loading for pages
- Split large contexts
- Add Redux or Zustand if state complexity grows
```

### Large
```
20+ pages, 100+ components
Switch to:
- Redux or MobX for state
- Feature-based folder structure
- Monorepo with shared packages
```

---

## 10. Security Considerations

### Protect Sensitive Data

**❌ Wrong**
```tsx
<input defaultValue={user.password} />
```

**✅ Right**
```tsx
// Never store passwords in state
// Use secure HTTP-only cookies for auth tokens
```

### Prevent XSS
```tsx
// ❌ Wrong
<div dangerousInnerHTML={{ __html: userInput }} />

// ✅ Right
<div>{userInput}</div> {/* React escapes by default */}
```

### Protect API Endpoints
```tsx
// Add rate limiting
// Add CSRF protection
// Validate all inputs on backend
// Use HTTPS in production
```

---

## 11. Future Improvements

### Phase 2: Enhance Features
- [ ] Photo gallery component
- [ ] Gift registry integration
- [ ] Music player
- [ ] Seat assignments
- [ ] Guest feedback form

### Phase 3: Admin Panel
- [ ] Dashboard for bride/groom
- [ ] Manage guests
- [ ] View confirmations
- [ ] Generate reports

### Phase 4: Performance
- [ ] Code splitting by route
- [ ] Image optimization
- [ ] Lazy load components
- [ ] Service Worker for offline

---

## Decision Log

| Date | Decision | Reason | Status |
|------|----------|--------|--------|
| 2024-11-18 | Context API | Simple state, small team | ✅ Active |
| 2024-11-18 | Separate services | Testability, reusability | ✅ Active |
| 2024-11-18 | Tailwind CSS | Fast, utility-first, no build config | ✅ Active |
| 2024-11-18 | Vite | Fast dev server, small bundle | ✅ Active |

---

## When to Refactor

### Signs You Need to Refactor
- 🔴 TypeScript errors increasing
- 🔴 Prop drilling > 3 levels deep
- 🔴 Components > 300 lines
- 🔴 Services > 100 lines each
- 🔴 Tests are hard to write

### How to Refactor
1. Write tests first
2. Extract small functions
3. Create new components
4. Move logic to services
5. Run tests to ensure nothing broke

---

## Questions to Ask When Making Decisions

1. **Complexity**: Does this add complexity or reduce it?
2. **Testing**: Can I easily test this?
3. **Reusability**: Will I use this in multiple places?
4. **Maintenance**: Will future devs understand this?
5. **Performance**: Does this impact load time or render time?
6. **Scalability**: Will this work as app grows?

If you answer "no" to more than 2 questions, reconsider the approach.

---

Good architecture makes coding faster, not slower! 🚀
