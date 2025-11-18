import React, { useState } from 'react';
import { useGuest } from '../../hooks/useGuest';
import type { GuestConfirmation } from '../../types';
import { Button, Snackbar } from '../ui';

interface ConfirmAttendanceCardProps {
  weddingId: string;
  backgroundImage?: string;
}

export const ConfirmAttendanceCard: React.FC<ConfirmAttendanceCardProps> = ({
  weddingId,
  backgroundImage = "/bg-confirm.jpg",
}) => {
  const { addConfirmation } = useGuest();
  const [showForm, setShowForm] = useState(true);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    guestName: "",
    email: "",
    phone: "",
    isAttending: true,
    numberOfGuests: 1,
    dietaryRestrictions: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const confirmation: GuestConfirmation = {
        id: `${weddingId}-${Date.now()}`,
        weddingId,
        ...formData,
        submittedAt: new Date().toISOString(),
      };
      await addConfirmation(confirmation);
      setShowForm(false);
      setShowSnackbar(true);
      setFormData({
        guestName: "",
        email: "",
        phone: "",
        isAttending: true,
        numberOfGuests: 1,
        dietaryRestrictions: "",
      });
    } catch (error) {
      console.error("Failed to save confirmation:", error);
      alert("Error al confirmar. Intente nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="relative w-full rounded-lg overflow-hidden shadow-lg min-h-[400px] bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40" />

        <div className="relative z-10 px-8 py-12 text-center text-white flex flex-col justify-center min-h-[400px]">
          {showForm ? (
            <div className="max-w-md mx-auto w-full">
              <h2 className="text-3xl font-bold mb-2">Confirma tu asistencia</h2>
              <p className="mb-8">
                Tu presencia hará que este día sea aún más especial para nosotros.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Tu nombre"
                  value={formData.guestName}
                  onChange={(e) =>
                    setFormData({ ...formData, guestName: e.target.value })
                  }
                  required
                  className="w-full px-4 py-2 rounded-lg text-gray-900 placeholder-gray-500"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="w-full px-4 py-2 rounded-lg text-gray-900 placeholder-gray-500"
                />
                <input
                  type="tel"
                  placeholder="Teléfono"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg text-gray-900 placeholder-gray-500"
                />
                <input
                  type="number"
                  min="1"
                  placeholder="Número de personas"
                  value={formData.numberOfGuests}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      numberOfGuests: parseInt(e.target.value),
                    })
                  }
                  className="w-full px-4 py-2 rounded-lg text-gray-900 placeholder-gray-500"
                />
                <input
                  type="text"
                  placeholder="Restricciones dietéticas (opcional)"
                  value={formData.dietaryRestrictions}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      dietaryRestrictions: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 rounded-lg text-gray-900 placeholder-gray-500"
                />

                <Button
                  type="submit"
                  fullWidth
                  loading={loading}
                  variant="primary"
                  className="text-white"
                >
                  CONFIRMAR ASISTENCIA
                </Button>
              </form>
            </div>
          ) : (
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">¡Gracias por confirmar!</h2>
              <p className="text-lg">Te esperamos en nuestra boda.</p>
              <Button
                onClick={() => setShowForm(true)}
                variant="outline"
                className="text-white border-white hover:bg-white hover:bg-opacity-10"
              >
                MODIFICAR RESPUESTA
              </Button>
            </div>
          )}
        </div>
      </div>

      <Snackbar
        message="¡Confirmación guardada correctamente!"
        isOpen={showSnackbar}
        onClose={() => setShowSnackbar(false)}
        type="success"
      />
    </>
  );
};
