import { motion } from 'framer-motion';
import type { FinancialMetrics } from '@/types/result';
import { formatPct, formatMonths } from '@/utils/formatting';

interface LivePreviewCardProps {
  metrics: FinancialMetrics;
}

interface MetricPill {
  label: string;
  value: string;
  ok: boolean;
}

export function LivePreviewCard({ metrics }: LivePreviewCardProps) {
  if (metrics.income === 0) return null;

  const pills: MetricPill[] = [
    {
      label: 'Saving Rate',
      value: formatPct(metrics.savingRate),
      ok: metrics.savingRate >= 10,
    },
    {
      label: 'DSR (cicilan)',
      value: formatPct(metrics.dsr),
      ok: metrics.dsr <= 30,
    },
    {
      label: 'Dana Darurat',
      value: `${formatMonths(metrics.efMonths)} bln`,
      ok: metrics.efMonths >= 3,
    },
    {
      label: 'Selisih',
      value: metrics.trueSelisih >= 0
        ? `Rp ${Math.round(metrics.trueSelisih / 1_000_000 * 10) / 10}jt`
        : `−Rp ${Math.round(Math.abs(metrics.trueSelisih) / 1_000_000 * 10) / 10}jt`,
      ok: metrics.trueSelisih >= 0,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-loka-green-bg rounded-3xl px-4 py-3.5 mt-2 mb-1"
    >
      <p className="text-[11px] font-bold text-loka-green uppercase tracking-widest mb-2.5">
        Preview Kalkulasi
      </p>
      <div className="grid grid-cols-2 gap-2.5">
        {pills.map(({ label, value, ok }) => (
          <div key={label}>
            <div className="text-[11px] text-loka-muted mb-0.5">{label}</div>
            <div
              className="text-lg font-extrabold"
              style={{ color: ok ? '#5B8A68' : '#D8895B' }}
            >
              {value}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
