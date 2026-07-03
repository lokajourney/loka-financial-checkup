import { motion } from 'framer-motion';
import { Gauge } from '@/components/ui/Gauge';
import { Badge } from '@/components/ui/Badge';
import { STAGE_DATA } from '@/data/stages';
import type { JourneyStage } from '@/types/common';
import { fadeInUp } from '@/hooks/useAnimationVariants';

interface ScoreCardProps {
  score: number;
  stage: JourneyStage;
  scoreColor: string;
  name?: string;
  age?: string;
  label?: string;
}

export function ScoreCard({ score, stage, scoreColor, name, age, label }: ScoreCardProps) {
  const stageData = STAGE_DATA[stage];
  const subtitle = [name, age ? `${age} tahun` : ''].filter(Boolean).join(', ');

  return (
    <motion.div
      variants={fadeInUp}
      initial="initial"
      animate="animate"
      className="bg-white rounded-4xl border border-loka-border shadow-card p-7 text-center mb-4"
    >
      <p className="text-[11px] font-bold text-loka-muted uppercase tracking-widest mb-2">
        {label ?? 'Financial Health Score'}
      </p>
      {subtitle && (
        <p className="text-sm text-loka-muted mb-1">{subtitle}</p>
      )}
      <div className="flex justify-center mb-0">
        <Gauge value={score} size={180} scoreColor={scoreColor} />
      </div>
      <div className="text-[62px] font-extrabold leading-none -mt-4 tracking-tighter" style={{ color: scoreColor }}>
        {score}
      </div>
      <div className="flex justify-center mt-3">
        <Badge color={stageData.color} bgColor={stageData.bgColor}>
          {stageData.icon} {stage}
        </Badge>
      </div>
    </motion.div>
  );
}
