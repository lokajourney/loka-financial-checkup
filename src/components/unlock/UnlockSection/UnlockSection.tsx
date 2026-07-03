import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { UNLOCK_ITEMS } from '@/data/unlockItems';
import { staggerContainer, fadeInUp } from '@/hooks/useAnimationVariants';
import { trackCTAClick } from '@/services/analytics';

interface UnlockSectionProps {
  onUnlock: () => void;
}

export function UnlockSection({ onUnlock }: UnlockSectionProps) {
  const handleUnlock = () => {
    trackCTAClick('unlock_level2');
    onUnlock();
  };

  return (
    <motion.div
      variants={fadeInUp}
      initial="initial"
      animate="animate"
      className="rounded-[22px] p-6 mt-6"
      style={{ backgroundColor: '#1A2E1C' }}
    >
      {/* Progress indicator */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.45)' }}>
            Analisismu
          </p>
          <p className="text-xl font-extrabold text-white">Baru 40% Selesai</p>
        </div>
        <div
          className="w-[52px] h-[52px] rounded-full flex items-center justify-center text-[13px] font-extrabold flex-shrink-0"
          style={{
            background: 'rgba(216,137,91,0.18)',
            border: '2px solid rgba(216,137,91,0.40)',
            color: '#D8895B',
          }}
        >
          40%
        </div>
      </div>

      <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.65)' }}>
        Masih ada beberapa aspek penting yang belum dapat kami analisis. Lanjutkan sekitar 3 menit lagi untuk mendapatkan:
      </p>

      {/* Unlock items */}
      <motion.div variants={staggerContainer} initial="initial" animate="animate" className="mb-5">
        {UNLOCK_ITEMS.map((item) => (
          <motion.div
            key={item}
            variants={fadeInUp}
            className="flex items-center gap-3 py-2.5 border-b"
            style={{ borderColor: 'rgba(255,255,255,0.06)' }}
          >
            <div
              className="w-[22px] h-[22px] rounded-full flex items-center justify-center flex-shrink-0 text-[11px] font-bold"
              style={{ background: 'rgba(216,137,91,0.20)', color: '#D8895B' }}
            >
              ✓
            </div>
            <span className="text-sm" style={{ color: 'rgba(255,255,255,0.85)' }}>{item}</span>
          </motion.div>
        ))}
      </motion.div>

      <Button variant="orange" onClick={handleUnlock}>
        Lanjutkan Analisis Lengkap →
      </Button>
      <p className="text-center text-xs mt-2.5" style={{ color: 'rgba(255,255,255,0.35)' }}>
        Hanya butuh 3 menit lagi
      </p>
    </motion.div>
  );
}
