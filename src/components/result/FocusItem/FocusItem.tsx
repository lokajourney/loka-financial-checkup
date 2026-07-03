import { motion } from 'framer-motion';
import type { FocusArea } from '@/types/result';
import { cardVariants } from '@/hooks/useAnimationVariants';

interface FocusItemProps {
  item: FocusArea;
}

export function FocusItem({ item }: FocusItemProps) {
  return (
    <motion.div
      variants={cardVariants}
      className="bg-loka-orange-bg border border-loka-orange/20 rounded-3xl p-4 mb-2"
    >
      <div className="flex items-center gap-2.5 mb-1">
        <span className="text-base">{item.icon}</span>
        <span className="text-sm font-bold text-loka-text">{item.title}</span>
      </div>
      <p className="text-[13px] text-loka-muted leading-relaxed">{item.description}</p>
    </motion.div>
  );
}
