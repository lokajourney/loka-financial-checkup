import { AmountInput } from '@/components/ui/AmountInput';
import { LivePreviewCard } from '@/components/assessment/LivePreviewCard';
import { AMOUNT_CHIPS, L1_DEBT_TYPES } from '@/constants';
import type { L1FormData } from '@/types/assessment';
import type { FinancialMetrics } from '@/types/result';
import { cn } from '@/utils/cn';

interface L1Step2FinanceProps {
  form: L1FormData;
  metrics: FinancialMetrics;
  onAmountChange: (field: keyof L1FormData, value: string) => void;
  onDebtTypeToggle: (key: string) => void;
}

export function L1Step2Finance({ form, metrics, onAmountChange, onDebtTypeToggle }: L1Step2FinanceProps) {
  return (
    <div>
      <AmountInput
        id="income"
        label="Penghasilan bulanan"
        helper="Take home pay tiap bulan, termasuk semua sumber penghasilan."
        value={form.income}
        onChange={(v) => onAmountChange('income', v)}
        chips={AMOUNT_CHIPS}
      />
      <AmountInput
        id="expenses"
        label="Pengeluaran bulanan"
        helper="Konsumsi murni tiap bulan — makan, transport, tagihan, belanja, dll. Di luar cicilan utang dan alokasi tabungan."
        value={form.expenses}
        onChange={(v) => onAmountChange('expenses', v)}
        chips={AMOUNT_CHIPS}
      />
      <AmountInput
        id="savingsMonthly"
        label="Alokasi tabungan + investasi per bulan"
        helper="Total yang kamu sisihkan setiap bulan untuk ditabung dan/atau diinvestasikan."
        value={form.savingsMonthly}
        onChange={(v) => onAmountChange('savingsMonthly', v)}
        chips={AMOUNT_CHIPS}
      />
      <AmountInput
        id="monthlyDebt"
        label="Cicilan / utang yang dibayar per bulan"
        helper="Total semua cicilan wajib per bulan. Isi 0 jika tidak ada."
        value={form.monthlyDebt}
        onChange={(v) => onAmountChange('monthlyDebt', v)}
        chips={AMOUNT_CHIPS}
      />

      {/* Quick debt type selector */}
      <div className="mb-5">
        <p className="text-[13px] font-semibold text-loka-text mb-1.5">Jenis utang yang kamu miliki</p>
        <div className="flex flex-wrap gap-1.5">
          {L1_DEBT_TYPES.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => onDebtTypeToggle(key)}
              aria-pressed={!!form.debtTypes[key]}
              className={cn(
                'rounded-full px-3.5 py-1.5 text-[13px] font-medium border transition-all duration-150',
                form.debtTypes[key]
                  ? 'bg-loka-green text-white border-loka-green font-bold'
                  : 'bg-white text-loka-muted border-loka-border hover:border-loka-green/40',
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <AmountInput
        id="emergencyFund"
        label="Dana darurat yang sudah kamu miliki saat ini"
        infoBox="Dana darurat adalah uang yang khusus kamu sisihkan untuk situasi darurat — kehilangan pekerjaan, biaya medis mendadak, dll. Ini terpisah dari tabungan tujuan lain. Isi 0 jika belum ada."
        value={form.emergencyFund}
        onChange={(v) => onAmountChange('emergencyFund', v)}
        chips={AMOUNT_CHIPS}
      />
      <AmountInput
        id="investment"
        label="Total nilai investasi saat ini"
        helper="Estimasi total nilai portofolio investasimu sekarang — reksa dana, saham, emas, obligasi, dll. Termasuk yang sedang dalam tujuan keuangan tertentu. Isi 0 jika belum ada."
        value={form.investment}
        onChange={(v) => onAmountChange('investment', v)}
        chips={AMOUNT_CHIPS}
      />

      <LivePreviewCard metrics={metrics} />
    </div>
  );
}
