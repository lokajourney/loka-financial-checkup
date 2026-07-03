import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import type { ProductRecommendation } from '@/types/result';
import { fadeInUp } from '@/hooks/useAnimationVariants';
import { trackCTAClick } from '@/services/analytics';

interface PlannerCardProps {
  recommendation: ProductRecommendation;
}

export function PlannerCard({ recommendation }: PlannerCardProps) {
  const handleClick = () => {
    trackCTAClick(`planner_${recommendation.id}`);
    // TODO: Replace with actual product URL
    // TODO: Replace with actual product URL mapping per recommendation.id
    const productUrls: Record<string, string> = {
      premium: 'https://lynk.id/loka.planner/premium-financial-planner/checkout',
      ultimate: 'https://lynk.id/loka.planner/ultimate-financial-planner/checkout',
      advanced: 'https://lynk.id/loka.planner/advanced-financial-planner/checkout',
    };
    const url = productUrls[recommendation.id] ?? 'https://lynk.id/loka.planner';
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      variants={fadeInUp}
      initial="initial"
      animate="animate"
      className="bg-white rounded-4xl border border-loka-green/15 shadow-card p-5 mb-4"
    >
      <p className="text-[11px] font-bold text-loka-green uppercase tracking-widest mb-2">
        Planner yang paling cocok
      </p>
      <h3 className="text-lg font-extrabold text-loka-text mb-3">{recommendation.name}</h3>
      <p className="text-sm text-loka-muted leading-relaxed mb-4">{recommendation.why}</p>
      <div className="mb-5 divide-y divide-loka-border/60">
        {recommendation.features.map((feature) => (
          <div key={feature} className="flex items-center gap-2.5 py-2">
            <span className="text-loka-success font-bold text-sm">✓</span>
            <span className="text-sm text-loka-text">{feature}</span>
          </div>
        ))}
      </div>
      <Button onClick={handleClick}>
        Lihat {recommendation.name} →
      </Button>
    </motion.div>
  );
}
