import React, { useState } from 'react';
import { Button } from '../ui';
import styles from './CoverPage.module.css';

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
  const [isOpen, setIsOpen] = useState(false);

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
      className={styles.coverContainer}
      style={{ '--bg-image': `url(${backgroundSrc})` } as React.CSSProperties}
    >
      <div className={styles.overlay} />

      <div className={styles.content}>
        <img
          src={coupleImageSrc}
          alt="Couple"
          className={styles.coupleImage}
        />

        <h1 className={styles.title}>{title}</h1>

        <p className={styles.subtitle}>{subtitle}</p>

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
