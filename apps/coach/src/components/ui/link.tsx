import { LinkHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

interface LinkProps extends LinkHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  href: string;
}

export function MinimalismLink({ children, href, className, ...props }: LinkProps) {
  return (
    <a
      href={href}
      className={clsx('text-blue-600 hover:text-blue-500 font-medium', className)}
      {...props}
    >
      {children}
    </a>
  );
}