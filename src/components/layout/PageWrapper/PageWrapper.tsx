import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import { pageVariants } from '@/hooks/useAnimationVariants';

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
  padBottom?: boolean;
  dark?: boolean;
}

export function PageWrapper({ children, className, padBottom = true, dark = false }: PageWrapperProps) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={cn(
        'min-h-screen',
        dark ? 'bg-loka-dark' : 'bg-loka-cream',
        className,
      )}
    >
      <div className={cn('max-w-form mx-auto px-5 pt-7', padBottom && 'pb-24')}>
        {children}
      </div>
    </motion.div>
  );
}
