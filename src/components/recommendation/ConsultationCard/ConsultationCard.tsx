import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { fadeInUp } from '@/hooks/useAnimationVariants';
import { trackCTAClick } from '@/services/analytics';

export function ConsultationCard() {
  const handleClick = () => {
    trackCTAClick('consultation');
    // TODO: Replace with actual consultation booking URL
    // TODO: Replace with actual consultation booking URL
    window.open('https://lynk.id/loka.planner/konsultasi', '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      variants={fadeInUp}
      initial="initial"
      animate="animate"
      className="bg-white rounded-4xl border border-loka-border shadow-card p-5 mb-4"
    >
      <h3 className="text-[15px] font-bold text-loka-text mb-2">
        Butuh panduan yang lebih personal?
      </h3>
      <p className="text-sm text-loka-muted leading-relaxed mb-4">
        Konsultasi finansial tersedia untuk siapa saja — kondisi utang, persiapan pernikahan atau beli rumah, transisi karir, atau keputusan finansial besar lainnya.
      </p>
      <Button variant="secondary" onClick={handleClick}>
        Jadwalkan Konsultasi →
      </Button>
    </motion.div>
  );
}
