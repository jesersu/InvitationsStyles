import { WeddingProvider } from './context/WeddingContext';
import { GuestProvider } from './context/GuestContext';
import InvitationPage from './pages/InvitationPage';
import './index.css';

function App() {
  return (
    <WeddingProvider>
      <GuestProvider>
        <InvitationPage />
      </GuestProvider>
    </WeddingProvider>
  );
}

export default App;
