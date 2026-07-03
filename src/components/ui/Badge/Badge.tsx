import { cn } from '@/utils/cn';

interface BadgeProps {
  children: React.ReactNode;
  color?: string;
  bgColor?: string;
  className?: string;
}

export function Badge({ children, color, bgColor, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-bold',
        className,
      )}
      style={{ color, backgroundColor: bgColor }}
    >
      {children}
    </span>
  );
}
