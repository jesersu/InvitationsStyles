import React, { useState } from 'react';
import { Button } from '../ui';

interface CoverPageProps {
  title: string;
  subtitle: string;
  coupleImageSrc: string;
  backgroundSrc: string;
  onOpen: () => void;
  rememberOpen?: boolean;
}

export const CoverPage: React.FC<CoverPageProps> = ({
  title,
  subtitle,
  coupleImageSrc,
  backgroundSrc,
  onOpen,
  rememberOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(() => {
    if (rememberOpen && typeof localStorage !== 'undefined') {
      return localStorage.getItem('invitationOpened') === 'true';
    }
    return false;
  });

  const handleOpen = () => {
    setIsOpen(true);
    if (rememberOpen) {
      localStorage.setItem('invitationOpened', 'true');
    }
    onOpen();
  };

  if (isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundSrc})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40" />

      <div className="relative z-10 text-center px-4 flex flex-col items-center justify-center min-h-screen">
        <div className="mb-8">
          <img
            src={coupleImageSrc}
            alt="Couple"
            className="w-48 h-48 rounded-full border-4 border-white shadow-lg object-cover"
          />
        </div>

        <h1 className="text-5xl font-bold text-white mb-2 drop-shadow-lg">
          {title}
        </h1>

        <p className="text-2xl text-rose-200 mb-12 drop-shadow-lg">{subtitle}</p>

        <Button
          onClick={handleOpen}
          className="text-lg px-8 py-3 bg-rose-600 text-white hover:bg-rose-700 rounded-full"
        >
          ABRIR INVITACIÓN
        </Button>
      </div>
    </div>
  );
};
