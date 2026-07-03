import { motion } from 'framer-motion';
import { STAGE_DATA } from '@/data/stages';
import type { JourneyStage } from '@/types/common';
import { fadeInUp } from '@/hooks/useAnimationVariants';

interface StageCardProps {
  stage: JourneyStage;
}

export function StageCard({ stage }: StageCardProps) {
  const data = STAGE_DATA[stage];

  return (
    <motion.div
      variants={fadeInUp}
      initial="initial"
      animate="animate"
      className="rounded-4xl border p-5 mb-4"
      style={{ backgroundColor: data.bgColor, borderColor: data.borderColor }}
    >
      <p className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: data.color }}>
        Kamu di tahap {stage}
      </p>
      <p className="text-[15px] text-loka-text leading-relaxed">{data.description}</p>
    </motion.div>
  );
}
