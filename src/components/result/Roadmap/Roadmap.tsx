import { motion } from 'framer-motion';
import { STAGE_ORDER, STAGE_DATA } from '@/data/stages';
import type { JourneyStage } from '@/types/common';
import { staggerContainer, fadeInUp } from '@/hooks/useAnimationVariants';

interface RoadmapProps {
  currentStage: JourneyStage;
}

export function Roadmap({ currentStage }: RoadmapProps) {
  const currentIdx = STAGE_ORDER.indexOf(currentStage);

  return (
    <motion.div
      variants={fadeInUp}
      initial="initial"
      animate="animate"
      className="bg-white rounded-4xl border border-loka-border shadow-card px-5 py-5 mb-4"
    >
      <motion.div variants={staggerContainer} initial="initial" animate="animate">
        {STAGE_ORDER.map((stage, i) => {
          const data   = STAGE_DATA[stage];
          const isPast = i < currentIdx;
          const isCur  = i === currentIdx;
          const isFut  = i > currentIdx;
          const isLast = i === STAGE_ORDER.length - 1;

          return (
            <motion.div key={stage} variants={fadeInUp} className="flex gap-4 relative">
              {/* Connector line */}
              {!isLast && (
                <div
                  className="absolute left-[11px] top-7 w-0.5 h-10"
                  style={{ backgroundColor: isPast ? '#5B8A68' : 'rgba(46,77,51,0.10)' }}
                />
              )}
              {/* Dot */}
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 z-10 text-[10px] font-bold"
                style={{
                  backgroundColor: isPast ? '#5B8A68' : isCur ? '#2E4D33' : 'rgba(46,77,51,0.12)',
                  color: isFut ? 'transparent' : 'white',
                }}
              >
                {isPast ? '✓' : isCur ? <div className="w-2 h-2 rounded-full bg-white" /> : ''}
              </div>
              {/* Label */}
              <div className={`pb-8 ${isLast ? 'pb-0' : ''}`}>
                <div
                  className="text-sm flex items-center gap-2"
                  style={{
                    fontWeight: isCur ? 700 : 500,
                    color: isPast ? '#5B8A68' : isCur ? '#2E4D33' : 'rgba(46,77,51,0.30)',
                  }}
                >
                  {data.icon} {stage}
                  {isCur && (
                    <span className="inline-flex items-center px-2 py-0.5 bg-loka-green text-white rounded-full text-[10px] font-bold">
                      Kamu di sini
                    </span>
                  )}
                </div>
                {isCur && (
                  <p className="text-xs text-loka-muted mt-0.5 leading-relaxed">
                    {data.focus}
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
