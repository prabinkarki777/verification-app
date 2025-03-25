import * as React from 'react';

import { cn } from '@/utils/cn';

type ButtonVariant = 'primary' | 'secondary' | 'danger';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: ButtonVariant;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const baseStyles = 'px-4 py-2 rounded-md focus:outline-none transition-colors duration-300';

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'btn-primary text-white',
  secondary: 'bg-gray-500 text-white hover:bg-gray-600',
  danger: 'bg-red-500 text-white hover:bg-red-600',
};

const sizeStyles: Record<string, string> = {
  sm: 'px-5 py-2 text-sm',
  md: 'px-12 py-2.5 text-base font-medium',
  lg: 'px-15 py-3.5 text-lg',
};

const Button: React.FC<ButtonProps> = ({ label = 'Button', variant = 'primary', size = 'sm', className, ...props }) => {
  const buttonClassNames = cn(baseStyles, variantStyles[variant], sizeStyles[size], className);

  return (
    <button {...props} className={buttonClassNames}>
      {label}
    </button>
  );
};

export default Button;
