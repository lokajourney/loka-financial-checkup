import { ChipSelector } from '@/components/ui/ChipSelector';
import { INVESTMENT_TYPES } from '@/constants';
import type { L2FormData } from '@/types/assessment';
import type { CreditCardManagement } from '@/types/common';
import { cn } from '@/utils/cn';

interface L2Step2ProtectionProps {
  form: L2FormData;
  onChange: <K extends keyof L2FormData>(key: K, value: L2FormData[K]) => void;
  onInvestmentTypeToggle: (key: string) => void;
}

const BANK_ACCOUNT_OPTIONS = ['1', '2', '3', '4+'];
const CC_MGMT_OPTIONS: { key: CreditCardManagement; label: string }[] = [
  { key: 'full', label: 'Dibayar penuh setiap bulan' },
  { key: 'minimum', label: 'Dibayar minimum saja' },
  { key: 'sometimes', label: 'Kadang-kadang dicicil' },
];

export function L2Step2Protection({ form, onChange, onInvestmentTypeToggle }: L2Step2ProtectionProps) {
  return (
    <div>
      {/* Insurance */}
      <div className="mb-5">
        <p className="text-[13px] font-semibold text-loka-text mb-1.5">Asuransi yang aktif</p>
        {[
          { key: 'hasHealthInsurance', label: 'Asuransi Kesehatan (BPJS/swasta)' },
          { key: 'hasLifeInsurance', label: 'Asuransi Jiwa' },
        ].map(({ key, label }) => {
          const checked = form[key as keyof L2FormData] as boolean;
          return (
            <div
              key={key}
              onClick={() => onChange(key as keyof L2FormData, !checked)}
              role="checkbox"
              aria-checked={checked}
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') onChange(key as keyof L2FormData, !checked); }}
              className={cn(
                'flex items-center gap-3 px-4 py-3.5 rounded-xl border mb-2 cursor-pointer transition-all select-none',
                checked ? 'border-loka-green bg-loka-green-hover' : 'border-loka-border bg-white hover:border-loka-green/40',
              )}
            >
              <div className={cn('w-[22px] h-[22px] rounded-[6px] border-[1.5px] flex items-center justify-center flex-shrink-0 text-xs font-bold', checked ? 'bg-loka-green border-loka-green text-white' : 'bg-white border-loka-border/70 text-transparent')}>✓</div>
              <span className={cn('text-sm text-loka-text', checked && 'font-semibold')}>{label}</span>
            </div>
          );
        })}
      </div>

      {/* Bank accounts */}
      <div className="mb-5">
        <p className="text-[13px] font-semibold text-loka-text mb-1.5">Jumlah rekening bank aktif</p>
        <div className="grid grid-cols-4 gap-2">
          {BANK_ACCOUNT_OPTIONS.map((opt) => (
            <button key={opt} type="button" onClick={() => onChange('bankAccounts', opt)}
              aria-pressed={form.bankAccounts === opt}
              className={cn('py-3 rounded-[10px] border text-[13px] font-medium transition-all', form.bankAccounts === opt ? 'border-loka-green bg-loka-green-hover text-loka-green font-bold' : 'border-loka-border bg-white text-loka-muted hover:border-loka-green/40')}>
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Credit card */}
      <div className="mb-5">
        <p className="text-[13px] font-semibold text-loka-text mb-1.5">Apakah kamu menggunakan kartu kredit?</p>
        <div className="grid grid-cols-2 gap-2 mb-3">
          {[{ v: true, l: 'Ya, punya kartu kredit' }, { v: false, l: 'Tidak punya' }].map(({ v, l }) => (
            <button key={String(v)} type="button" onClick={() => onChange('hasCreditCard', v)}
              aria-pressed={form.hasCreditCard === v}
              className={cn('py-3 rounded-[10px] border text-[13px] font-medium transition-all', form.hasCreditCard === v ? 'border-loka-green bg-loka-green-hover text-loka-green font-bold' : 'border-loka-border bg-white text-loka-muted hover:border-loka-green/40')}>
              {l}
            </button>
          ))}
        </div>
        {form.hasCreditCard && (
          <div>
            <p className="text-xs text-loka-muted mb-2">Bagaimana kamu biasanya mengelola tagihan kartu kredit?</p>
            {CC_MGMT_OPTIONS.map(({ key, label }) => {
              const sel = form.creditCardManagement === key;
              return (
                <div key={key} onClick={() => onChange('creditCardManagement', key)}
                  role="radio" aria-checked={sel} tabIndex={0}
                  onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') onChange('creditCardManagement', key); }}
                  className={cn('flex items-center gap-3 px-4 py-3 rounded-xl border mb-2 cursor-pointer transition-all select-none', sel ? 'border-loka-green bg-loka-green-hover' : 'border-loka-border bg-white hover:border-loka-green/40')}>
                  <div className={cn('w-[22px] h-[22px] rounded-full border-[1.5px] flex items-center justify-center flex-shrink-0', sel ? 'bg-loka-green border-loka-green' : 'bg-white border-loka-border/70')}>
                    {sel && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                  <span className={cn('text-sm text-loka-text', sel && 'font-semibold')}>{label}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Investment types */}
      <ChipSelector
        label="Instrumen investasi yang kamu miliki"
        options={INVESTMENT_TYPES}
        selected={form.investmentTypes}
        onToggle={onInvestmentTypeToggle}
        columns={2}
      />
    </div>
  );
}
