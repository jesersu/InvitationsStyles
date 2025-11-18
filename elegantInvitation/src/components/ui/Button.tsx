import React from 'react';

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  children,
  disabled,
  className,
  ...props
}) => {
  const baseClasses = 'font-semibold rounded-lg transition-colors duration-200';

  const variantClasses: Record<string, string> = {
    primary: 'bg-rose-600 text-white hover:bg-rose-700 disabled:bg-rose-400',
    secondary: 'bg-amber-100 text-amber-900 hover:bg-amber-200 disabled:bg-amber-50',
    outline: 'border-2 border-rose-600 text-rose-600 hover:bg-rose-50 disabled:border-rose-300 disabled:text-rose-300',
  };

  const sizeClasses: Record<string, string> = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const widthClass = fullWidth ? 'w-full' : '';
  const finalClassName = `${baseClasses} ${variantClasses[variant || 'primary']} ${sizeClasses[size || 'md']} ${widthClass} ${className || ''}`;

  return (
    <button
      disabled={disabled || loading}
      className={finalClassName}
      {...props}
    >
      {loading ? 'Cargando...' : children}
    </button>
  );
};
