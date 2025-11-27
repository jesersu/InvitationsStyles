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
  const baseClasses = 'font-semibold rounded-full transition-all duration-300 relative overflow-hidden group shadow-lg hover:shadow-2xl active:shadow-md transform hover:scale-105 active:scale-95';

  const variantClasses: Record<string, string> = {
    primary: 'bg-gradient-to-r from-pink-400 via-pink-500 to-rose-500 text-white hover:from-pink-500 hover:via-pink-600 hover:to-rose-600 disabled:from-pink-300 disabled:via-pink-300 disabled:to-rose-300 disabled:cursor-not-allowed',
    secondary: 'bg-gradient-to-r from-amber-200 to-amber-300 text-amber-900 hover:from-amber-300 hover:to-amber-400 disabled:from-amber-100 disabled:to-amber-100',
    outline: 'border-2 border-rose-400 text-rose-500 hover:bg-rose-50 hover:border-rose-500 disabled:border-rose-300 disabled:text-rose-300 bg-white/30 backdrop-blur-sm',
  };

  const sizeClasses: Record<string, string> = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-7 py-3 text-base',
    lg: 'px-8 py-3.5 text-lg',
  };

  const widthClass = fullWidth ? 'w-full' : '';
  const finalClassName = `${baseClasses} ${variantClasses[variant || 'primary']} ${sizeClasses[size || 'md']} ${widthClass} ${className || ''}`;

  return (
    <button
      disabled={disabled || loading}
      className={finalClassName}
      {...props}
    >
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 -skew-x-12 transform group-hover:translate-x-full transition-all duration-700" />
      <span className="relative flex items-center justify-center gap-2">
        {loading ? 'Cargando...' : children}
      </span>
    </button>
  );
};
