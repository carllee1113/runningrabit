import { InputHTMLAttributes } from 'react';
import clsx from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function MinimalismInput({ className, ...props }: InputProps) {
  return (
    <input
      className={clsx(
        'block w-full rounded-md border-gray-300 bg-white text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm placeholder-gray-500',
        className
      )}
      {...props}
    />
  );
}