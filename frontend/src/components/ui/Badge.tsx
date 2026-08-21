import * as React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  dot?: boolean;
}

export function Badge({ className, variant = 'default', dot = true, children, ...props }: BadgeProps) {
  
  const variants = {
    default: 'bg-surface-light text-muted border-border',
    success: 'bg-success/10 text-success border-success/20',
    warning: 'bg-warning/10 text-warning border-warning/20',
    danger: 'bg-danger/10 text-danger border-danger/20',
    info: 'bg-accent/10 text-accent border-accent/20',
  };

  const dotColors = {
    default: 'bg-muted',
    success: 'bg-success',
    warning: 'bg-warning',
    danger: 'bg-danger',
    info: 'bg-accent',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        variants[variant],
        className
      )}
      {...props}
    >
      {dot && (
        <motion.div
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className={cn('mr-1.5 h-1.5 w-1.5 rounded-full', dotColors[variant])}
        />
      )}
      {children}
    </div>
  );
}
