import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  elevation?: 'none' | 'sm' | 'md' | 'lg';
  rounded?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  elevation = 'md',
  rounded = 'lg',
  children,
  className = '',
  ...props
}) => {
  const elevationClasses: Record<string, string> = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
  };

  const roundedClasses: Record<string, string> = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
  };

  return (
    <div
      className={`bg-white p-6 ${elevationClasses[elevation]} ${roundedClasses[rounded]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
