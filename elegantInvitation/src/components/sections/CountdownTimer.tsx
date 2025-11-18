import React from 'react';
import { useCountdown } from '../../hooks/useCountdown';

interface CountdownTimerProps {
  targetDate: string;
  title?: string;
  backgroundImage?: string;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDate,
  title = "Cuenta regresiva",
  backgroundImage = "/bg-countdown.jpg",
}) => {
  const countdown = useCountdown(targetDate);

  return (
    <div
      className="relative w-full rounded-lg overflow-hidden shadow-lg"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40" />

      <div className="relative z-10 px-8 py-12 text-center text-white">
        <h2 className="text-3xl font-bold mb-8">{title}</h2>

        <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
          <div className="flex flex-col items-center">
            <div className="text-4xl font-bold mb-2">
              {String(countdown.days).padStart(2, "0")}
            </div>
            <div className="text-sm font-medium">Días</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-4xl font-bold mb-2">
              {String(countdown.hours).padStart(2, "0")}
            </div>
            <div className="text-sm font-medium">Horas</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-4xl font-bold mb-2">
              {String(countdown.minutes).padStart(2, "0")}
            </div>
            <div className="text-sm font-medium">Minutos</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-4xl font-bold mb-2">
              {String(countdown.seconds).padStart(2, "0")}
            </div>
            <div className="text-sm font-medium">Segundos</div>
          </div>
        </div>
      </div>
    </div>
  );
};
