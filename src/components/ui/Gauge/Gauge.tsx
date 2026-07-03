import { motion } from 'framer-motion';

interface GaugeProps {
  value: number;      // 0–100
  size?: number;      // SVG width in px
  scoreColor: string;
}

function getArcPath(cx: number, cy: number, r: number, pct: number): string {
  if (pct <= 0) return '';
  const startAngle = -Math.PI;
  const endAngle   = startAngle + (pct / 100) * Math.PI;
  const x1 = cx + r * Math.cos(startAngle);
  const y1 = cy + r * Math.sin(startAngle);
  const x2 = cx + r * Math.cos(endAngle);
  const y2 = cy + r * Math.sin(endAngle);
  const largeArc = pct > 50 ? 1 : 0;
  return `M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 ${largeArc} 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`;
}

export function Gauge({ value, size = 200, scoreColor }: GaugeProps) {
  const clamped = Math.min(100, Math.max(0, value));
  const cx = size / 2;
  const cy = size * 0.52;
  const r  = size * 0.38;
  const sw = Math.round(size * 0.065);
  const needleAngle = -180 + (clamped / 100) * 180;
  const needleRad   = (needleAngle * Math.PI) / 180;
  const needleLen   = r * 0.8;
  const nx = (cx + needleLen * Math.cos(needleRad)).toFixed(2);
  const ny = (cy + needleLen * Math.sin(needleRad)).toFixed(2);
  const trackPath = getArcPath(cx, cy, r, 100);
  const valuePath = getArcPath(cx, cy, r, clamped);
  const viewH = Math.round(size * 0.58);

  return (
    <svg
      width={size}
      height={viewH}
      viewBox={`0 0 ${size} ${viewH}`}
      aria-label={`Financial health score: ${value} out of 100`}
      role="img"
      style={{ overflow: 'visible' }}
    >
      {/* Track arc */}
      <path
        d={trackPath}
        fill="none"
        stroke="rgba(46,77,51,0.10)"
        strokeWidth={sw}
        strokeLinecap="round"
      />
      {/* Value arc */}
      {clamped > 0 && (
        <motion.path
          d={valuePath}
          fill="none"
          stroke={scoreColor}
          strokeWidth={sw}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
        />
      )}
      {/* Needle */}
      <motion.line
        x1={cx}
        y1={cy}
        x2={nx}
        y2={ny}
        stroke="#243127"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity={0.5}
        initial={{ rotate: -180, originX: `${cx}px`, originY: `${cy}px` }}
        animate={{ rotate: needleAngle, originX: `${cx}px`, originY: `${cy}px` }}
        transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
      />
      <circle cx={cx} cy={cy} r={Math.round(size * 0.03)} fill="#243127" opacity={0.6} />
      <circle cx={cx} cy={cy} r={Math.round(size * 0.015)} fill="#FAF8F4" />
      {/* Labels */}
      <text x={cx - r - 4}       y={viewH} fontSize={11} fill="#5E6A60" fontFamily="inherit">0</text>
      <text x={cx - 7}           y={13}    fontSize={11} fill="#5E6A60" fontFamily="inherit">50</text>
      <text x={cx + r - 16}      y={viewH} fontSize={11} fill="#5E6A60" fontFamily="inherit">100</text>
    </svg>
  );
}
