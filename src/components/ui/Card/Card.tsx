import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'tinted' | 'dark';
  style?: React.CSSProperties;
  onClick?: () => void;
}

export function Card({ children, className, variant = 'default', style, onClick }: CardProps) {
  return (
    <motion.div
      onClick={onClick}
      className={cn(
        'rounded-4xl border shadow-card mb-4',
        variant === 'default' && 'bg-white border-loka-border',
        variant === 'tinted' && 'bg-loka-green-bg border-loka-green/10',
        variant === 'dark' && 'bg-loka-dark border-loka-dark',
        onClick && 'cursor-pointer',
        className,
      )}
      style={style}
    >
      {children}
    </motion.div>
  );
}
