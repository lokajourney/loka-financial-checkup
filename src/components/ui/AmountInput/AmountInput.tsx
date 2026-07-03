import { cn } from '@/utils/cn';
import type { Chip } from '@/constants/chips';
import { parseAmount } from '@/utils/formatting';

interface AmountInputProps {
  id: string;
  label: string;
  helper?: string;
  value: string;
  onChange: (value: string) => void;
  chips?: Chip[];
  placeholder?: string;
  infoBox?: string;
}

export function AmountInput({
  id,
  label,
  helper,
  value,
  onChange,
  chips,
  placeholder = 'atau ketik manual...',
  infoBox,
}: AmountInputProps) {
  const numericValue = parseAmount(value);

  return (
    <div className="mb-5">
      <label htmlFor={id} className="block text-[13px] font-semibold text-loka-text mb-1.5">
        {label}
      </label>
      {helper && (
        <p className="text-xs text-loka-muted mb-2 leading-relaxed">{helper}</p>
      )}
      {infoBox && (
        <div className="bg-loka-green-bg rounded-xl px-3.5 py-2.5 mb-2 text-xs text-loka-muted leading-relaxed">
          {infoBox}
        </div>
      )}
      {chips && (
        <div className="flex flex-wrap gap-1.5 mb-2.5">
          {chips.map(({ label: chipLabel, value: chipValue }) => (
            <button
              key={chipValue}
              type="button"
              onClick={() => onChange(String(chipValue))}
              className={cn(
                'rounded-full px-3.5 py-1.5 text-[13px] font-medium border transition-all duration-150 whitespace-nowrap',
                numericValue === chipValue && value !== ''
                  ? 'bg-loka-green text-white border-loka-green font-bold'
                  : 'bg-white text-loka-muted border-loka-border hover:border-loka-green/50',
              )}
            >
              {chipLabel}
            </button>
          ))}
        </div>
      )}
      <div className="flex items-center border border-loka-border rounded-xl bg-white overflow-hidden focus-within:border-loka-green focus-within:ring-2 focus-within:ring-loka-green-ring transition-all">
        <span className="pl-4 text-sm text-loka-muted whitespace-nowrap flex-shrink-0">Rp</span>
        <input
          id={id}
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 px-3.5 py-3 text-[15px] text-loka-text bg-transparent outline-none placeholder:text-loka-border"
          aria-label={label}
          min={0}
        />
      </div>
    </div>
  );
}
