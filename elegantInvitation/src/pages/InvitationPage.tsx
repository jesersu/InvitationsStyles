import React, { useEffect } from 'react';
import { useWedding } from '../hooks/useWedding';
import {
  CoverPage,
  InvitationCard,
  CountdownTimer,
  LocationCard,
  ConfirmAttendanceCard,
} from '../components/sections';

const InvitationPage: React.FC = () => {
  const { wedding, loading, error, fetchWedding } = useWedding();

  useEffect(() => {
    // Get wedding ID from environment or use default
    const weddingId = import.meta.env.VITE_WEDDING_ID || 'wedding_001';
    fetchWedding(weddingId);
  }, [fetchWedding]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            Cargando invitación...
          </h2>
          <div className="w-12 h-12 border-4 border-rose-200 border-t-rose-600 rounded-full animate-spin mx-auto" />
        </div>
      </div>
    );
  }

  if (error || !wedding) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-white flex items-center justify-center">
        <div className="text-center px-4">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            Error al cargar la invitación
          </h2>
          <p className="text-gray-600 mb-4">{error || 'Invitación no encontrada'}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-white">
      {/* Cover page overlay */}
      <CoverPage
        title={`${wedding.groomName} & ${wedding.brideName}`}
        subtitle="Te invitamos a nuestra boda"
        coupleImageSrc={wedding.coverImage}
        backgroundSrc={wedding.backgroundImage}
        onOpen={() => {}}
        rememberOpen={true}
      />

      {/* Main content */}
      <main className="max-w-4xl mx-auto py-12 px-4 space-y-12">
        {/* Invitation Card */}
        <InvitationCard
          title="¡Nos casamos!"
          couple={{ groom: wedding.groomName, bride: wedding.brideName }}
          subtitle="y"
        />

        {/* Wedding Message */}
        {wedding.message && (
          <div className="text-center py-8 px-4">
            <p className="text-lg text-gray-700 italic">{wedding.message}</p>
          </div>
        )}

        {/* Countdown Timer */}
        <CountdownTimer
          targetDate={wedding.date}
          title="Cuenta regresiva para nuestra boda"
        />

        {/* Events/Locations */}
        {wedding.events.map((event) => (
          <LocationCard
            key={event.id}
            title={event.name}
            time={new Date(event.dateTime).toLocaleTimeString('es-ES', {
              hour: '2-digit',
              minute: '2-digit',
            })}
            venue={event.location}
            mapUrl={event.mapUrl}
            icon={event.icon}
          />
        ))}

        {/* Dress Code Info */}
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-rose-600 mb-2">
            Código de Vestimenta
          </h3>
          <p className="text-3xl font-bold text-gray-700">{wedding.dresscode}</p>
        </div>

        {/* Bank Accounts */}
        {wedding.bankAccounts.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold text-rose-600 mb-6 text-center">
              Datos Bancarios
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {wedding.bankAccounts.map((account, idx) => (
                <div key={idx} className="border-l-4 border-rose-600 pl-4">
                  <p className="font-semibold text-gray-700">{account.bank}</p>
                  <p className="text-sm text-gray-600 mt-2">
                    <span className="font-medium">Cuenta:</span> {account.accountNumber}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">CCI:</span> {account.cci}
                  </p>
                  {account.yape && (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">YAPE:</span> {account.yape}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Confirm Attendance */}
        <ConfirmAttendanceCard weddingId={wedding.id} />

        {/* Footer */}
        <div className="text-center py-8 text-gray-600">
          <p>¡Gracias por ser parte de nuestra historia!</p>
          <p className="text-sm mt-2">
            Con amor,<br />
            {wedding.groomName} & {wedding.brideName}
          </p>
        </div>
      </main>
    </div>
  );
};

export default InvitationPage;
