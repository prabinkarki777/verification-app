import * as React from 'react';

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
}
const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ variant = 'primary', size = 'md', className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`w-5 h-5 border-4 border-t-transparent border-white border-solid rounded-full animate-spin ${
          {
            primary: 'border-primary',
            secondary: 'border-gray-600',
            tertiary: 'border-tertiary',
          }[variant]
        }
          ${
            {
              sm: 'w-4 h-4',
              md: 'w-5 h-5',
              lg: 'w-7 h-7',
            }[size]
          }
          ${className}
        `}
        {...props}
      />
    );
  },
);

Spinner.displayName = 'Spinner';

export { Spinner };
