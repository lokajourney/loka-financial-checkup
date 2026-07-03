import { motion } from 'framer-motion';
import { GOALS } from '@/constants/goals';
import type { L1FormData } from '@/types/assessment';
import { cn } from '@/utils/cn';
import { staggerContainer, fadeInUp } from '@/hooks/useAnimationVariants';

interface L1Step4GoalsProps {
  form: L1FormData;
  onToggle: (key: string) => void;
}

export function L1Step4Goals({ form, onToggle }: L1Step4GoalsProps) {
  const selectedCount = Object.values(form.goals).filter(Boolean).length;

  return (
    <div>
      <p className="text-[13px] text-loka-muted mb-3.5 leading-relaxed">
        Boleh pilih lebih dari satu.{' '}
        {selectedCount > 0 && (
          <strong className="text-loka-green font-semibold">{selectedCount} terpilih</strong>
        )}
      </p>
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="grid grid-cols-2 gap-2"
      >
        {GOALS.map(({ key, icon, label }) => {
          const selected = !!form.goals[key];
          return (
            <motion.div
              key={key}
              variants={fadeInUp}
              onClick={() => onToggle(key)}
              role="checkbox"
              aria-checked={selected}
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') onToggle(key); }}
              className={cn(
                'relative p-4 rounded-3xl border text-center cursor-pointer transition-all duration-150 select-none',
                selected
                  ? 'border-loka-green bg-loka-green-hover'
                  : 'border-loka-border bg-white hover:border-loka-green/40',
              )}
            >
              {selected && (
                <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-loka-green flex items-center justify-center">
                  <span className="text-white text-[9px] font-bold">✓</span>
                </div>
              )}
              <div className="text-xl mb-1.5">{icon}</div>
              <div className={cn('text-[13px]', selected ? 'font-bold text-loka-green' : 'font-medium text-loka-muted')}>
                {label}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
