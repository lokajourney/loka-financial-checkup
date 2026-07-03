import { motion } from 'framer-motion';
import type { FinancialMetrics } from '@/types/result';
import { formatRp } from '@/utils/formatting';
import { fadeInUp } from '@/hooks/useAnimationVariants';

interface SurplusCardProps {
  metrics: FinancialMetrics;
}

export function SurplusCard({ metrics }: SurplusCardProps) {
  const isPositive = metrics.trueSelisih >= 0;
  const absValue = formatRp(Math.abs(metrics.trueSelisih));

  return (
    <motion.div
      variants={fadeInUp}
      initial="initial"
      animate="animate"
      className="bg-white rounded-3xl border border-loka-border shadow-card px-4 py-3.5 mb-4"
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs font-semibold text-loka-muted mb-0.5">Free Cashflow per Bulan</div>
          <div className="text-[11px] text-loka-muted/70">
            Penghasilan − pengeluaran − cicilan − tabungan/investasi
          </div>
        </div>
        <div
          className="text-xl font-extrabold ml-3 flex-shrink-0 text-right"
          style={{ color: isPositive ? '#2E4D33' : '#DC2626' }}
        >
          {isPositive ? '' : '−'}{absValue}
        </div>
      </div>
      {!isPositive && (
        <p className="text-xs text-loka-danger mt-2 leading-relaxed">
          ⚠️ Alokasi pengeluaran, cicilan, dan tabunganmu melebihi penghasilan. Ini perlu segera ditinjau.
        </p>
      )}
      {isPositive && metrics.trueSelisih > 0 && (
        <p className="text-xs text-loka-muted mt-2 leading-relaxed">
          Uang ini belum punya tugas tiap bulan — bisa dialokasikan untuk memperkuat dana darurat, investasi, atau tujuan finansial lainnya.
        </p>
      )}
    </motion.div>
  );
}
