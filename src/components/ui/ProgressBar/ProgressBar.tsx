import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

interface ProgressBarProps {
  segments: number;
  activeSegments: number;
  className?: string;
}

export function ProgressBar({ segments, activeSegments, className }: ProgressBarProps) {
  return (
    <div className={cn('flex gap-1.5', className)} role="progressbar" aria-valuenow={activeSegments} aria-valuemax={segments}>
      {Array.from({ length: segments }).map((_, i) => (
        <motion.div
          key={i}
          className="flex-1 h-[3px] rounded-full"
          style={{ backgroundColor: i < activeSegments ? '#2E4D33' : 'rgba(46,77,51,0.1)' }}
          animate={{ backgroundColor: i < activeSegments ? '#2E4D33' : 'rgba(46,77,51,0.1)' }}
          transition={{ duration: 0.3 }}
        />
      ))}
    </div>
  );
}
