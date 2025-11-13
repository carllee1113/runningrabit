import { ReactNode } from 'react';
import clsx from 'clsx';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export function MinimalismContainer({ children, className }: ContainerProps) {
  return (
    <div className={clsx('max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-900', className)}>
      {children}
    </div>
  );
}