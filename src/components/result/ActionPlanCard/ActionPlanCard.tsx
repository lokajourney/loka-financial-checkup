import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '@/hooks/useAnimationVariants';

interface ActionPlanCardProps {
  steps: string[];
}

export function ActionPlanCard({ steps }: ActionPlanCardProps) {
  if (steps.length === 0) return null;

  return (
    <motion.div
      variants={fadeInUp}
      initial="initial"
      animate="animate"
      className="bg-white rounded-4xl border border-loka-border shadow-card px-5 py-4 mb-4"
    >
      <motion.div variants={staggerContainer} initial="initial" animate="animate">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            variants={fadeInUp}
            className="flex gap-3.5 py-3 border-b border-loka-border/50 last:border-b-0"
          >
            <div className="w-[26px] h-[26px] rounded-full bg-loka-green text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
              {i + 1}
            </div>
            <p className="text-sm text-loka-text leading-relaxed">{step}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
