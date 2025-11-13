import { InputHTMLAttributes } from 'react';

export type MinimalismInputProps = InputHTMLAttributes<HTMLInputElement>;

export function MinimalismInput({ className, ...props }: MinimalismInputProps) {
  return (
    <input
      className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${className || ''}`}
      {...props}
    />
  );
}