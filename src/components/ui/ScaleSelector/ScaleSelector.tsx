import { cn } from '@/utils/cn';

interface ScaleSelectorProps {
  label: string;
  helper?: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  lowLabel?: string;
  highLabel?: string;
}

export function ScaleSelector({
  label,
  helper,
  value,
  onChange,
  min = 1,
  max = 5,
  lowLabel = 'Rendah',
  highLabel = 'Tinggi',
}: ScaleSelectorProps) {
  const steps = Array.from({ length: max - min + 1 }, (_, i) => i + min);

  return (
    <div className="mb-5">
      <p className="text-[13px] font-semibold text-loka-text mb-1.5">{label}</p>
      {helper && <p className="text-xs text-loka-muted mb-2 leading-relaxed">{helper}</p>}
      <div className="flex gap-1.5 my-2.5">
        {steps.map((step) => (
          <button
            key={step}
            type="button"
            onClick={() => onChange(step)}
            aria-pressed={value === step}
            aria-label={`${label}: ${step}`}
            className={cn(
              'flex-1 py-2.5 rounded-lg border text-xs font-semibold transition-all duration-150',
              value === step
                ? 'bg-loka-green text-white border-loka-green'
                : 'bg-white text-loka-muted border-loka-border hover:border-loka-green/40',
            )}
          >
            {step}
          </button>
        ))}
      </div>
      <div className="flex justify-between text-[11px] text-loka-muted">
        <span>{lowLabel}</span>
        <span>{highLabel}</span>
      </div>
    </div>
  );
}
