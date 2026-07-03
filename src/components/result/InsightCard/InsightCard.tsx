import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '@/hooks/useAnimationVariants';

interface InsightCardProps {
  insights: string[];
}

export function InsightCard({ insights }: InsightCardProps) {
  if (insights.length === 0) return null;

  return (
    <motion.div
      variants={fadeInUp}
      initial="initial"
      animate="animate"
      className="bg-white rounded-4xl border border-loka-border shadow-card p-5 mb-4"
    >
      <p className="text-[11px] font-bold text-loka-muted uppercase tracking-widest mb-3">
        Catatan dari Loka Finance
      </p>
      <motion.div variants={staggerContainer} initial="initial" animate="animate">
        {insights.map((paragraph, i) => (
          <motion.p
            key={i}
            variants={fadeInUp}
            className="text-[15px] leading-relaxed"
            style={{
              color: i === 0 ? '#243127' : '#5E6A60',
              fontWeight: i === 0 ? 500 : 400,
              marginTop: i > 0 ? '10px' : 0,
            }}
          >
            {paragraph}
          </motion.p>
        ))}
      </motion.div>
    </motion.div>
  );
}
