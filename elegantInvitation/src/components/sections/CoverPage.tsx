import React, { useState } from 'react';
import { Button } from '../ui';

interface CoverPageProps {
  title: string;
  subtitle: string;
  coupleImageSrc: string;
  backgroundSrc: string;
  backgroundMobileSrc?: string;
  onOpen: () => void;
  rememberOpen?: boolean;
}

export const CoverPage: React.FC<CoverPageProps> = ({
  title,
  subtitle,
  coupleImageSrc,
  backgroundSrc,
  backgroundMobileSrc,
  onOpen,
  rememberOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
    if (rememberOpen) {
      localStorage.setItem('invitationOpened', 'true');
    }
    onOpen();
  };

  if (isOpen) return null;

  const backgroundImage = isMobile && backgroundMobileSrc ? backgroundMobileSrc : backgroundSrc;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center w-screen h-screen cover-bg-fill"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="cover-overlay absolute inset-0" />

      <div className="relative z-10 flex flex-col items-center justify-center h-screen text-center p-4">
        <img
          src={coupleImageSrc}
          alt="Couple"
          className="cover-couple-image w-48 h-48 rounded-full border-4 border-white/95 object-cover mb-8 animate-floatImage"
        />

        <h1 className="cover-title text-5xl font-bold text-amber-50 mb-2 animate-fadeInDown">
          {title}
        </h1>

        <p className="cover-gradient-text text-2xl mb-12 font-medium tracking-wide animate-fadeInUp">
          {subtitle}
        </p>

        <Button
          onClick={handleOpen}
          className="cover-button text-lg px-8 py-3 bg-gradient-to-r from-pink-400 to-pink-500 text-white rounded-full shadow-lg transition-all duration-300 animate-scaleIn"
        >
          ABRIR INVITACIÓN
        </Button>
      </div>
    </div>
  );
};
