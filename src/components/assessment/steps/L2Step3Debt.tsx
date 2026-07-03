import { AmountInput } from '@/components/ui/AmountInput';
import { ChipSelector } from '@/components/ui/ChipSelector';
import { ScaleSelector } from '@/components/ui/ScaleSelector';
import { DEBT_OUTSTANDING_CHIPS, L2_DEBT_TYPES } from '@/constants';
import type { L2FormData } from '@/types/assessment';

interface L2Step3DebtProps {
  form: L2FormData;
  onChange: <K extends keyof L2FormData>(key: K, value: L2FormData[K]) => void;
  onDebtOutstandingChange: (value: string) => void;
  onDebtTypeToggle: (key: string) => void;
}

export function L2Step3Debt({ form, onChange, onDebtOutstandingChange, onDebtTypeToggle }: L2Step3DebtProps) {
  return (
    <div>
      <ScaleSelector
        label="Seberapa stres kamu soal kondisi keuanganmu?"
        helper="1 = Santai banget, 5 = Sangat tertekan"
        value={form.financialStress}
        onChange={(v) => onChange('financialStress', v)}
        lowLabel="Santai"
        highLabel="Sangat tertekan"
      />

      <ScaleSelector
        label="Seberapa percaya diri kamu mengelola keuangan?"
        helper="1 = Belum percaya diri, 5 = Sangat percaya diri"
        value={form.financialConfidence}
        onChange={(v) => onChange('financialConfidence', v)}
        lowLabel="Belum PD"
        highLabel="Sangat PD"
      />

      <AmountInput
        id="totalOutstandingDebt"
        label="Total seluruh utang outstanding"
        helper="Bukan cicilan per bulan — ini total saldo utang yang masih ada. Sisa pokok KPR, total tagihan kartu kredit, sisa pinjaman, dll. Isi 0 jika tidak ada."
        value={form.totalOutstandingDebt}
        onChange={onDebtOutstandingChange}
        chips={DEBT_OUTSTANDING_CHIPS}
      />

      <ChipSelector
        label="Jenis utang yang kamu miliki"
        options={L2_DEBT_TYPES}
        selected={form.debtTypes}
        onToggle={onDebtTypeToggle}
        columns={2}
      />
    </div>
  );
}
