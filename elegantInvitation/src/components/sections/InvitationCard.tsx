import React from 'react';

interface InvitationCardProps {
  title?: string;
  couple?: { bride: string; groom: string };
  subtitle?: string;
  topImageSrc?: string;
  bottomImageSrc?: string;
  backgroundImageSrc?: string;
}

export const InvitationCard: React.FC<InvitationCardProps> = ({
  title = "¡Nos casamos!",
  couple = { bride: "Novia", groom: "Novio" },
  subtitle = "y",
  topImageSrc,
  bottomImageSrc,
  backgroundImageSrc,
}) => {
  return (
    <div className="relative w-full max-w-2xl aspect-[3/4] mx-auto rounded-xl shadow-2xl overflow-hidden bg-white">
      {/* Background image */}
      {backgroundImageSrc && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${backgroundImageSrc})` }}
        />
      )}

      {/* Top floral decoration */}
      <div className="absolute left-0 right-0 top-0 pointer-events-none select-none z-10 -mt-4">
        {topImageSrc && (
          <img
            src={topImageSrc}
            alt="Top decoration"
            className="w-full h-auto object-cover"
          />
        )}
      </div>

      {/* Bottom floral decoration */}
      <div className="absolute left-0 right-0 bottom-0 pointer-events-none select-none z-10 -mb-4">
        {bottomImageSrc && (
          <img
            src={bottomImageSrc}
            alt="Bottom decoration"
            className="w-full h-auto object-cover"
          />
        )}
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full px-8 text-center">
        <h2 className="text-5xl font-bold text-rose-600 mb-4">{title}</h2>
        <div className="space-y-2 mb-6">
          <p className="text-2xl font-semibold text-gray-700">{couple.groom}</p>
          <p className="text-lg text-gray-500">{subtitle}</p>
          <p className="text-2xl font-semibold text-gray-700">{couple.bride}</p>
        </div>
      </div>
    </div>
  );
};
