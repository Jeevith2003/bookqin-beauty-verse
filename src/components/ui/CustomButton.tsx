
import React from 'react';
import { cn } from '@/lib/utils';

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'success' | 'danger' | 'premium';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
  badge?: string | number;
}

const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ 
    className, 
    children, 
    variant = 'primary', 
    size = 'md', 
    fullWidth = false, 
    icon, 
    iconPosition = 'left',
    isLoading,
    badge,
    ...props 
  }, ref) => {
    const variants = {
      primary: 'bg-bookqin-primary hover:opacity-90 text-white shadow-sm',
      secondary: 'bg-bookqin-secondary hover:opacity-90 text-white shadow-sm',
      outline: 'border border-bookqin-primary text-bookqin-primary hover:bg-bookqin-light',
      ghost: 'bg-transparent hover:bg-bookqin-light text-bookqin-primary',
      success: 'bg-green-600 hover:bg-green-700 text-white shadow-sm',
      danger: 'bg-red-600 hover:bg-red-700 text-white shadow-sm',
      premium: 'bg-gradient-to-r from-bookqin-primary to-bookqin-secondary text-white shadow-sm hover:opacity-90'
    };

    const sizes = {
      sm: 'py-1.5 px-3 text-sm rounded-lg',
      md: 'py-2.5 px-4 rounded-xl',
      lg: 'py-3 px-6 rounded-xl text-lg',
      icon: 'p-2 rounded-full aspect-square'
    };

    return (
      <button
        ref={ref}
        disabled={isLoading}
        className={cn(
          'inline-flex items-center justify-center font-medium transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bookqin-secondary focus-visible:ring-opacity-50',
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
        ) : icon && iconPosition === 'left' ? (
          <span className="mr-2">{icon}</span>
        ) : null}
        
        {children}
        
        {!isLoading && icon && iconPosition === 'right' && (
          <span className="ml-2">{icon}</span>
        )}
        
        {badge && (
          <span className="ml-2 inline-flex items-center justify-center rounded-full bg-white text-xs font-medium text-bookqin-primary px-2 py-0.5 min-w-[1.5rem]">
            {badge}
          </span>
        )}
      </button>
    );
  }
);

CustomButton.displayName = 'CustomButton';

export default CustomButton;
