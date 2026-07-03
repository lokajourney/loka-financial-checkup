import { cn } from '@/utils/cn';

export interface ChipOption {
  key: string;
  label: string;
  icon?: string;
}

interface ChipSelectorProps {
  label?: string;
  options: ChipOption[];
  selected: Record<string, boolean>;
  onToggle: (key: string) => void;
  multiSelect?: boolean;
  columns?: 2 | 3 | 4;
  helper?: string;
  className?: string;
}

export function ChipSelector({
  label,
  options,
  selected,
  onToggle,
  multiSelect = true,
  columns = 2,
  helper,
  className,
}: ChipSelectorProps) {
  const colClass =
    columns === 4 ? 'grid-cols-4' : columns === 3 ? 'grid-cols-3' : 'grid-cols-2';
  const roleAttr = multiSelect ? 'group' : 'radiogroup';

  return (
    <div className={cn('mb-5', className)} role={roleAttr}>
      {label && (
        <p className="text-[13px] font-semibold text-loka-text mb-1.5">{label}</p>
      )}
      {helper && (
        <p className="text-xs text-loka-muted mb-2 leading-relaxed">{helper}</p>
      )}
      <div className={cn('grid gap-2', colClass)}>
        {options.map(({ key, label: optLabel, icon }) => (
          <button
            key={key}
            type="button"
            onClick={() => onToggle(key)}
            aria-pressed={!!selected[key]}
            className={cn(
              'rounded-[10px] border p-3 text-center text-[13px] font-medium transition-all duration-150 cursor-pointer',
              selected[key]
                ? 'border-loka-green bg-loka-green-hover text-loka-green font-bold'
                : 'border-loka-border bg-white text-loka-muted hover:border-loka-green/40',
            )}
          >
            {icon && <div className="text-xl mb-1.5">{icon}</div>}
            {optLabel}
          </button>
        ))}
      </div>
    </div>
  );
}
