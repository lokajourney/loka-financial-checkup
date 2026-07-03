import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

type AlertVariant = 'warning' | 'danger' | 'info';

interface AlertProps {
  variant?: AlertVariant;
  icon?: string;
  title: string;
  description: string;
  className?: string;
}

const variantClasses: Record<AlertVariant, string> = {
  warning: 'bg-loka-orange-bg border-loka-orange/20',
  danger:  'bg-loka-danger-bg border-loka-danger/20',
  info:    'bg-loka-green-bg border-loka-green/15',
};

const titleClasses: Record<AlertVariant, string> = {
  warning: 'text-loka-orange',
  danger:  'text-loka-danger',
  info:    'text-loka-green',
};

export function Alert({ variant = 'warning', icon, title, description, className }: AlertProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'rounded-3xl border p-4 mb-3',
        variantClasses[variant],
        className,
      )}
    >
      <div className="flex items-center gap-2 mb-1">
        {icon && <span className="text-base">{icon}</span>}
        <span className={cn('text-sm font-bold', titleClasses[variant])}>{title}</span>
      </div>
      <p className="text-sm text-loka-muted leading-relaxed">{description}</p>
    </motion.div>
  );
}
