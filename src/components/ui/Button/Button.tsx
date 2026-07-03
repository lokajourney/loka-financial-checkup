import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

type ButtonVariant = 'primary' | 'secondary' | 'orange' | 'ghost';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  loading?: boolean;
  fullWidth?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-loka-green text-white shadow-green hover:opacity-90 disabled:bg-loka-green/30 disabled:cursor-not-allowed',
  secondary:
    'bg-white text-loka-green border border-loka-green hover:bg-loka-green-hover disabled:opacity-40 disabled:cursor-not-allowed',
  orange:
    'bg-loka-orange text-white shadow-orange hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed',
  ghost:
    'bg-transparent text-loka-muted underline hover:text-loka-text disabled:opacity-40 disabled:cursor-not-allowed',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      loading = false,
      fullWidth = true,
      className,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
        className={cn(
          'rounded-2xl px-6 py-4 text-base font-bold transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-loka-green focus-visible:ring-offset-2',
          fullWidth && 'w-full block',
          variantClasses[variant],
          className,
        )}
        disabled={disabled || loading}
        aria-busy={loading}
        {...(props as React.ComponentPropsWithoutRef<typeof motion.button>)}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            Memproses...
          </span>
        ) : (
          children
        )}
      </motion.button>
    );
  },
);

Button.displayName = 'Button';
