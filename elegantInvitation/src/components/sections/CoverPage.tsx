import React, { useState } from 'react';
import { Button } from '../ui';
import { useWindowSize } from '../../hooks/useWindowSize';

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
  const isMobile = useWindowSize(768);

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
        {/* Decorative elements */}
        {/* <DecorativeElements elements={decorativeElements} /> */}

        {/* Couple image - top-right on mobile, centered on tablet/web */}
        <img
          src={coupleImageSrc}
          alt="Couple"
          style={{
            width: isMobile ? '150px' : '300px',
            height: isMobile ? '200px' : '350px',
            position: isMobile ? 'absolute' : 'relative',
            top: isMobile ? '130px' : 'auto',
            right: isMobile ? '0px' : 'auto',
            marginBottom: isMobile ? '0px' : '32px',
          }}
          className="rounded-full border-white/70 md:border-4 md:border-white/95 object-cover animate-floatImage"
        />

        {/* Title - Couple Names with Lavishly Yours font */}
        <h1 className="couple-names text-amber-50 mb-2 animate-fadeInDown">
          {title}
        </h1>

        {/* Subtitle */}
        <p className="cover-gradient-text text-lg sm:text-xl md:text-2xl mb-8 sm:mb-10 md:mb-12 font-medium tracking-wide animate-fadeInUp">
          {subtitle}
        </p>

        {/* Decorative line */}
        <div className="w-12 h-1 bg-gradient-to-r from-transparent via-pink-300 to-transparent mb-8 animate-fadeInUp" style={{ animationDelay: '0.3s' }} />

        {/* Button */}
        <div className="relative group">
          {/* Glow effect background */}
          <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-pink-500 to-rose-500 rounded-full blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300 -z-10" />

          <Button
            onClick={handleOpen}
            variant="primary"
            size="lg"
            style={{
              background: 'linear-gradient(to right, #f472b6, #ec4899, #f43f5e)',
              boxShadow: '0 25px 50px -12px rgba(244, 63, 94, 0.25), 0 0 60px rgba(244, 63, 94, 0.15)',
            }}
            className="cover-button-premium px-20 sm:px-12 md:px-16 py-4 sm:py-4 md:py-5 font-bold tracking-widest animate-scaleIn border border-white/20 text-white rounded-full"
          >
            {/* Animated background gradient */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 -skew-x-12 group-hover:translate-x-full transition-all duration-700" />

            {/* Button content */}
            <span className="relative flex items-center justify-center gap-2 sm:gap-3">
              <span className="inline-block text-lg sm:text-xl animate-[pulse_2s_ease-in-out_infinite]">💌</span>
              <span className="whitespace-nowrap">ABRIR INVITACIÓN</span>
              <span className="inline-block text-xs sm:text-sm animate-[spin_3s_linear_infinite]">✨</span>
            </span>
          </Button>
        </div>

      </div>
    </div>
  );
};
