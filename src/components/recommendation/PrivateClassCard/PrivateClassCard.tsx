import { motion } from 'framer-motion';
import { fadeInUp } from '@/hooks/useAnimationVariants';
import { trackCTAClick } from '@/services/analytics';

export function PrivateClassCard() {
  const handleClick = () => {
    trackCTAClick('private_class');
    // TODO: Replace with actual Private Class URL
    // TODO: Replace with actual Private Class URL from Lynk.id
    window.open('https://lynk.id/loka.planner/private-class', '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      variants={fadeInUp}
      initial="initial"
      animate="animate"
      className="rounded-4xl p-5 mb-4"
      style={{ backgroundColor: '#2E4D33' }}
    >
      <p className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>
        Mau belajar dari dasar dulu?
      </p>
      <h3 className="text-lg font-extrabold text-white mb-2.5">
        Private Class Finansial dari Nol
      </h3>
      <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(255,255,255,0.75)' }}>
        Cocok untuk kamu yang ingin memahami personal finance secara menyeluruh sebelum membangun sistem keuanganmu sendiri. Dipandu langsung, bukan sekadar materi.
      </p>
      <button
        onClick={handleClick}
        className="w-full py-3.5 rounded-xl text-[15px] font-semibold text-white transition-all duration-150 hover:bg-white/20"
        style={{ border: '1.5px solid rgba(255,255,255,0.35)', background: 'rgba(255,255,255,0.10)' }}
      >
        Pelajari Private Class →
      </button>
    </motion.div>
  );
}
