import { ReactNode } from 'react';

export type MinimalismContainerProps = {
  children: ReactNode;
  className?: string;
};

export function MinimalismContainer({ children, className }: MinimalismContainerProps) {
  return (
    <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className || ''}`}>
      {children}
    </div>
  );
}