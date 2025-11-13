import { ReactNode } from 'react';

export type MinimalismCardProps = {
  children: ReactNode;
  className?: string;
};

export function MinimalismCard({ children, className }: MinimalismCardProps) {
  return (
    <div className={`rounded-xl border border-gray-200 bg-white p-6 ${className || ''}`}>
      {children}
    </div>
  );
}