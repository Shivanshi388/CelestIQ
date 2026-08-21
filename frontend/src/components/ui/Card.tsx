import * as React from 'react';
import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

export function Card({ className, hoverable = false, children, ...props }: CardProps) {
  const Component = hoverable ? motion.div : 'div';
  const animationProps = hoverable
    ? {
        whileHover: { y: -2, transition: { duration: 0.2 } },
      }
    : {};

  return (
    <Component
      className={cn(
        'glass-panel p-5 overflow-hidden flex flex-col',
        hoverable && 'glass-panel-interactive cursor-pointer',
        className
      )}
      {...animationProps as any}
      {...props as any}
    >
      {children}
    </Component>
  );
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex flex-col space-y-1.5 mb-4', className)} {...props} />;
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn('font-semibold leading-none tracking-tight text-white flex items-center justify-between', className)}
      {...props}
    />
  );
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex-1', className)} {...props} />;
}
