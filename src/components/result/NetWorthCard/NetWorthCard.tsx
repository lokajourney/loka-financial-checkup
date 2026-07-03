import { motion } from 'framer-motion';
import type { NetWorthBreakdown } from '@/types/result';
import { formatRp } from '@/utils/formatting';
import { fadeInUp } from '@/hooks/useAnimationVariants';

interface NetWorthCardProps {
  netWorth: NetWorthBreakdown;
}

interface NetWorthRow {
  label: string;
  value: number;
  color?: string;
  bold?: boolean;
}

export function NetWorthCard({ netWorth }: NetWorthCardProps) {
  const rows: NetWorthRow[] = [
    { label: 'Dana darurat', value: netWorth.emergencyFund, color: '#5B8A68' },
    { label: 'Nilai investasi', value: netWorth.investment, color: '#5B8A68' },
    ...(netWorth.physicalAssets > 0
      ? [{ label: 'Aset fisik (properti, kendaraan)', value: netWorth.physicalAssets, color: '#5B8A68' }]
      : []),
    { label: 'Total Aset', value: netWorth.totalAssets, color: '#5B8A68', bold: true },
    { label: 'Total utang outstanding', value: netWorth.totalOutstandingDebt, color: netWorth.totalOutstandingDebt > 0 ? '#DC2626' : '#5E6A60' },
  ];

  return (
    <motion.div
      variants={fadeInUp}
      initial="initial"
      animate="animate"
      className="bg-white rounded-4xl border border-loka-border shadow-card p-5 mb-4"
    >
      <p className="text-[11px] font-bold text-loka-muted uppercase tracking-widest mb-3">
        Kekayaan Bersih (Net Worth)
      </p>
      <div
        className="text-[28px] font-extrabold mb-1"
        style={{ color: netWorth.isPositive ? '#5B8A68' : '#DC2626' }}
      >
        {netWorth.netWorth < 0 ? '−' : ''}{formatRp(Math.abs(netWorth.netWorth))}
      </div>
      <p className="text-xs text-loka-muted mb-4 leading-relaxed">
        {netWorth.isPositive
          ? 'Total aset lebih besar dari total utang — posisi solvabilitas yang sehat.'
          : 'Total utang melebihi total aset. Ini yang paling perlu jadi prioritas perbaikan.'}
      </p>
      <div className="divide-y divide-loka-border/50">
        {rows.map(({ label, value, color, bold }) => (
          <div key={label} className="flex justify-between items-center py-2.5">
            <span className={`text-sm ${bold ? 'font-semibold text-loka-text' : 'text-loka-muted'}`}>{label}</span>
            <span className="text-sm font-semibold" style={{ color }}>{formatRp(value)}</span>
          </div>
        ))}
        {/* Net worth total row */}
        <div className="flex justify-between items-center pt-3 mt-1 border-t border-loka-border">
          <span className="text-[15px] font-bold text-loka-text">Kekayaan Bersih</span>
          <span className="text-[15px] font-bold" style={{ color: netWorth.isPositive ? '#5B8A68' : '#DC2626' }}>
            {netWorth.netWorth < 0 ? '−' : ''}{formatRp(Math.abs(netWorth.netWorth))}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
