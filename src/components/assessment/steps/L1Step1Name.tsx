import type { L1FormData } from '@/types/assessment';

interface L1Step1NameProps {
  form: L1FormData;
  onChange: (value: string) => void;
}

export function L1Step1Name({ form, onChange }: L1Step1NameProps) {
  return (
    <div>
      <label htmlFor="name" className="block text-[13px] font-semibold text-loka-text mb-1.5">
        Nama kamu
      </label>
      <input
        id="name"
        type="text"
        value={form.name}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Nama panggilanmu..."
        autoFocus
        className="w-full px-4 py-3.5 rounded-xl border border-loka-border bg-white text-[15px] text-loka-text outline-none focus:border-loka-green focus:ring-2 focus:ring-loka-green-ring transition-all"
        aria-label="Nama kamu"
      />
    </div>
  );
}
