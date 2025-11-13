import { ButtonHTMLAttributes, ReactNode } from 'react';

export type MinimalismButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'danger';
  children: ReactNode;
};

export function MinimalismButton({
  size = 'md',
  variant = 'primary',
  children,
  className,
  ...props
}: MinimalismButtonProps) {
  const base = 'inline-flex items-center justify-center rounded-md font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  const sizes = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-400',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  };

  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant]} ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  );
}