import { motion } from 'framer-motion';
import { HABITS } from '@/constants/habits';
import type { L1FormData } from '@/types/assessment';
import { cn } from '@/utils/cn';
import { staggerContainer, fadeInUp } from '@/hooks/useAnimationVariants';

interface L1Step3HabitsProps {
  form: L1FormData;
  onToggle: (key: string) => void;
}

export function L1Step3Habits({ form, onToggle }: L1Step3HabitsProps) {
  return (
    <div>
      <motion.div variants={staggerContainer} initial="initial" animate="animate">
        {HABITS.map(({ key, label }) => {
          const checked = !!form.habits[key];
          return (
            <motion.div
              key={key}
              variants={fadeInUp}
              onClick={() => onToggle(key)}
              role="checkbox"
              aria-checked={checked}
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') onToggle(key); }}
              className={cn(
                'flex items-center gap-3 px-4 py-3.5 rounded-xl border mb-2 cursor-pointer transition-all duration-150 select-none',
                checked
                  ? 'border-loka-green bg-loka-green-hover'
                  : 'border-loka-border bg-white hover:border-loka-green/40',
              )}
            >
              <div
                className={cn(
                  'w-[22px] h-[22px] rounded-[6px] border-[1.5px] flex items-center justify-center flex-shrink-0 transition-all duration-200 text-xs font-bold',
                  checked
                    ? 'bg-loka-green border-loka-green text-white'
                    : 'bg-white border-loka-border/70 text-transparent',
                )}
              >
                ✓
              </div>
              <span className={cn('text-sm text-loka-text', checked && 'font-semibold')}>
                {label}
              </span>
            </motion.div>
          );
        })}
      </motion.div>
      <p className="text-xs text-loka-muted mt-2.5 leading-relaxed">
        Centang hanya yang sudah kamu lakukan secara konsisten, bukan yang ingin kamu lakukan.
      </p>
    </div>
  );
}
