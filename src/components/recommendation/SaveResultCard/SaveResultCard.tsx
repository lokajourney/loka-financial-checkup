import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { saveResult } from '@/services/saveResult';
import type { AnalysisResult } from '@/types/result';
import { fadeInUp } from '@/hooks/useAnimationVariants';
import { trackCTAClick } from '@/services/analytics';

interface SaveResultCardProps {
  result: AnalysisResult;
  userName?: string;
}

export function SaveResultCard({ result, userName }: SaveResultCardProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSave = async () => {
    trackCTAClick('save_result');
    setStatus('loading');
    try {
      await saveResult({ result, name: userName });
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <motion.div
      variants={fadeInUp}
      initial="initial"
      animate="animate"
      className="bg-white rounded-4xl border-dashed border-2 border-loka-border/60 p-5 mb-5"
    >
      <h3 className="text-[15px] font-bold text-loka-text mb-2">
        Simpan Hasil Financial Journey
      </h3>
      <p className="text-sm text-loka-muted leading-relaxed mb-2">
        Jawabanmu akan disimpan. Jika nanti kamu bergabung ke Private Class atau Konsultasi Finansial, mentor kami bisa mempelajari assessmentmu terlebih dahulu — sehingga sesi langsung fokus pada solusi.
      </p>
      <p className="text-[13px] text-loka-muted mb-4">
        Skor kamu:{' '}
        <strong className="text-loka-green font-semibold">
          {result.score} — {result.stage}
        </strong>
      </p>
      {status === 'success' ? (
        <div className="py-3 text-center text-sm font-semibold text-loka-success bg-loka-success-bg rounded-xl">
          ✓ Hasil berhasil disimpan!
        </div>
      ) : (
        <Button
          variant="orange"
          onClick={handleSave}
          loading={status === 'loading'}
          disabled={status === 'loading'}
        >
          Simpan Hasilku
        </Button>
      )}
      {status === 'error' && (
        <p className="text-xs text-loka-danger mt-2 text-center">
          Terjadi kesalahan. Coba lagi.
        </p>
      )}
    </motion.div>
  );
}
