import { cn } from '@/utils/cn';

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionTitle({ children, className }: SectionTitleProps) {
  return (
    <h3 className={cn('text-[11px] font-bold text-loka-muted uppercase tracking-widest mt-7 mb-2.5', className)}>
      {children}
    </h3>
  );
}
