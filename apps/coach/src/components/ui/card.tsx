import { ReactNode } from 'react';
import clsx from 'clsx';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function MinimalismCard({ children, className }: CardProps) {
  return (
    <div className={clsx('bg-white shadow rounded-lg p-6 border border-gray-200', className)}>
      {children}
    </div>
  );
}