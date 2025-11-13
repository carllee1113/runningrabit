import { AnchorHTMLAttributes, ReactNode } from 'react';

export type MinimalismLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
};

export function MinimalismLink({ children, className, ...props }: MinimalismLinkProps) {
  return (
    <a
      className={`text-blue-600 hover:text-blue-700 underline ${className || ''}`}
      {...props}
    >
      {children}
    </a>
  );
}