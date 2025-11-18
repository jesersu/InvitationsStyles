import React from 'react';
import { Button } from '../ui';

interface LocationCardProps {
  title: string;
  time: string;
  venue: string;
  mapUrl: string;
  icon?: string;
  backgroundImage?: string;
}

export const LocationCard: React.FC<LocationCardProps> = ({
  title,
  time,
  venue,
  mapUrl,
  icon = "📍",
  backgroundImage = "/bg-location.jpg",
}) => {
  return (
    <div
      className="relative w-full rounded-lg overflow-hidden shadow-lg min-h-[300px] bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      <div className="relative z-10 px-8 py-12 text-center text-white flex flex-col justify-center min-h-[300px]">
        <div className="text-5xl mb-4">{icon}</div>
        <h3 className="text-3xl font-bold mb-2">{title}</h3>
        <p className="text-lg mb-2">{time}</p>
        <p className="text-xl font-semibold mb-6">{venue}</p>

        <a href={mapUrl} target="_blank" rel="noopener noreferrer">
          <Button
            variant="outline"
            className="text-white border-white hover:bg-white hover:bg-opacity-10"
          >
            VER EN MAPA
          </Button>
        </a>
      </div>
    </div>
  );
};
