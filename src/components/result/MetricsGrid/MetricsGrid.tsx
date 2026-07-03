import { motion } from 'framer-motion';
import type { FinancialMetrics } from '@/types/result';
import { formatPct, formatMonths } from '@/utils/formatting';
import { staggerContainer, cardVariants } from '@/hooks/useAnimationVariants';

interface MetricItem {
  label: string;
  value: string;
  sub: string;
  ok: boolean;
}

interface MetricsGridProps {
  metrics: FinancialMetrics;
}

export function MetricsGrid({ metrics }: MetricsGridProps) {
  const items: MetricItem[] = [
    {
      label: 'Saving Rate',
      value: formatPct(metrics.savingRate),
      sub: metrics.savingRate >= 20 ? 'Sangat baik' : metrics.savingRate >= 10 ? 'Baik' : 'Perlu naik',
      ok: metrics.savingRate >= 10,
    },
    {
      label: 'Dana Darurat',
      value: `${formatMonths(metrics.efMonths)} bln`,
      sub: metrics.efMonths >= 6 ? 'Aman' : metrics.efMonths >= 3 ? 'Cukup minimal' : 'Perlu diperkuat',
      ok: metrics.efMonths >= 3,
    },
    {
      label: 'DSR (cicilan)',
      value: formatPct(metrics.dsr),
      sub: metrics.dsr === 0 ? 'Bebas utang' : metrics.dsr <= 30 ? 'Aman' : 'Di atas ideal 30%',
      ok: metrics.dsr <= 30,
    },
    {
      label: 'Free Cashflow',
      value: metrics.trueSelisih >= 0
        ? `+Rp ${(Math.round(metrics.trueSelisih / 100_000) / 10).toFixed(1)}jt`
        : `−Rp ${(Math.round(Math.abs(metrics.trueSelisih) / 100_000) / 10).toFixed(1)}jt`,
      sub: metrics.trueSelisih >= 0 ? 'Surplus tersedia' : 'Cashflow minus',
      ok: metrics.trueSelisih >= 0,
    },
  ];

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="grid grid-cols-2 gap-2.5 mb-4"
    >
      {items.map(({ label, value, sub, ok }) => (
        <motion.div
          key={label}
          variants={cardVariants}
          className="bg-white rounded-3xl border border-loka-border shadow-card p-3.5"
        >
          <div className="text-[11px] text-loka-muted mb-1">{label}</div>
          <div className="text-xl font-extrabold" style={{ color: ok ? '#5B8A68' : '#D8895B' }}>
            {value}
          </div>
          <div className="text-[11px] text-loka-muted mt-0.5">{sub}</div>
        </motion.div>
      ))}
    </motion.div>
  );
}
