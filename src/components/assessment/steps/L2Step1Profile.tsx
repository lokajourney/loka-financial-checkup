import { AmountInput } from '@/components/ui/AmountInput';
import { ASSET_CHIPS } from '@/constants';
import type { L2FormData } from '@/types/assessment';
import type { MaritalStatus } from '@/types/common';
import { cn } from '@/utils/cn';

interface L2Step1ProfileProps {
  form: L2FormData;
  onChange: <K extends keyof L2FormData>(key: K, value: L2FormData[K]) => void;
  onAssetChange: (value: string) => void;
}

const MARITAL_OPTIONS = [
  { key: 'single', label: 'Lajang' },
  { key: 'married', label: 'Menikah' },
  { key: 'divorced', label: 'Cerai/Janda' },
];

const DEPENDENT_OPTIONS = [
  { key: '0', label: '0' },
  { key: '1', label: '1' },
  { key: '2', label: '2' },
  { key: '3+', label: '3+' },
];

export function L2Step1Profile({ form, onChange, onAssetChange }: L2Step1ProfileProps) {
  return (
    <div>
      <div className="mb-5">
        <label htmlFor="age" className="block text-[13px] font-semibold text-loka-text mb-1.5">
          Usia
        </label>
        <input
          id="age"
          type="number"
          value={form.age}
          onChange={(e) => onChange('age', e.target.value)}
          placeholder="contoh: 28"
          className="w-32 px-4 py-3.5 rounded-xl border border-loka-border bg-white text-[15px] text-loka-text outline-none focus:border-loka-green focus:ring-2 focus:ring-loka-green-ring transition-all"
          min={17}
          max={99}
        />
      </div>

      <div className="mb-5">
        <label htmlFor="occupation" className="block text-[13px] font-semibold text-loka-text mb-1.5">
          Pekerjaan
        </label>
        <input
          id="occupation"
          type="text"
          value={form.occupation}
          onChange={(e) => onChange('occupation', e.target.value)}
          placeholder="Karyawan, freelancer, wiraswasta..."
          className="w-full px-4 py-3.5 rounded-xl border border-loka-border bg-white text-[15px] text-loka-text outline-none focus:border-loka-green focus:ring-2 focus:ring-loka-green-ring transition-all"
        />
      </div>

      <div className="mb-5">
        <p className="text-[13px] font-semibold text-loka-text mb-1.5">Status pernikahan</p>
        <div className="grid grid-cols-3 gap-2">
          {MARITAL_OPTIONS.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => onChange('maritalStatus', key as MaritalStatus)}
              aria-pressed={form.maritalStatus === key}
              className={cn(
                'py-3 rounded-[10px] border text-[13px] font-medium transition-all',
                form.maritalStatus === key
                  ? 'border-loka-green bg-loka-green-hover text-loka-green font-bold'
                  : 'border-loka-border bg-white text-loka-muted hover:border-loka-green/40',
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-5">
        <p className="text-[13px] font-semibold text-loka-text mb-1.5">Jumlah tanggungan</p>
        <div className="grid grid-cols-4 gap-2">
          {DEPENDENT_OPTIONS.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => onChange('dependents', key)}
              aria-pressed={form.dependents === key}
              className={cn(
                'py-3 rounded-[10px] border text-[13px] font-medium transition-all',
                form.dependents === key
                  ? 'border-loka-green bg-loka-green-hover text-loka-green font-bold'
                  : 'border-loka-border bg-white text-loka-muted hover:border-loka-green/40',
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <AmountInput
        id="totalAssets"
        label="Total estimasi nilai aset fisik yang kamu miliki"
        helper="Estimasi nilai pasar saat ini dari properti (rumah, tanah), kendaraan, dan aset fisik lainnya. Bukan tabungan atau investasi — itu sudah dimasukkan sebelumnya. Isi 0 jika tidak ada."
        value={form.totalAssets}
        onChange={onAssetChange}
        chips={ASSET_CHIPS}
      />
    </div>
  );
}
