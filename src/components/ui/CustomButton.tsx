
import React from 'react';
import { cn } from '@/lib/utils';

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: React.ReactNode;
  isLoading?: boolean;
}

const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ 
    className, 
    children, 
    variant = 'primary', 
    size = 'md', 
    fullWidth = false, 
    icon, 
    isLoading,
    ...props 
  }, ref) => {
    const variants = {
      primary: 'bg-bookqin-primary hover:opacity-90 text-white shadow-sm',
      secondary: 'bg-bookqin-secondary hover:opacity-90 text-white shadow-sm',
      outline: 'border border-bookqin-primary text-bookqin-primary hover:bg-bookqin-light',
      ghost: 'bg-transparent hover:bg-bookqin-light text-bookqin-primary'
    };

    const sizes = {
      sm: 'py-2 px-3 text-sm rounded-lg',
      md: 'py-2.5 px-4 rounded-xl',
      lg: 'py-3 px-6 rounded-xl text-lg'
    };

    return (
      <button
        ref={ref}
        disabled={isLoading}
        className={cn(
          'inline-flex items-center justify-center font-medium transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          variants[variant],
          sizes[size],
          fullWidth ? 'w-full' : '',
          isLoading && 'opacity-70 cursor-not-allowed',
          className
        )}
        {...props}
      >
        {isLoading ? (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : icon ? (
          <span className="mr-2">{icon}</span>
        ) : null}
        {children}
      </button>
    );
  }
);

CustomButton.displayName = 'CustomButton';

export default CustomButton;
