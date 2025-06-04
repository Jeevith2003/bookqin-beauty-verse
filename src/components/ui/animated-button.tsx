import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  animation?: 'pulse' | 'bounce' | 'scale' | 'shimmer';
  children: React.ReactNode;
  className?: string;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  variant = 'default',
  size = 'default',
  animation = 'scale',
  children,
  className,
  ...props
}) => {
  const animationClasses = {
    pulse: 'animate-pulse hover:animate-none',
    bounce: 'hover:animate-bounce',
    scale: 'hover:scale-105 active:scale-95 transition-transform duration-200',
    shimmer: 'relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent'
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={cn(
        animationClasses[animation],
        animation === 'shimmer' && 'relative overflow-hidden',
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
};

export default AnimatedButton;