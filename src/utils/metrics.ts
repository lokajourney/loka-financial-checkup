import { parseAmount } from './formatting';
import type { L1FormData } from '@/types/assessment';
import type { FinancialMetrics } from '@/types/result';

/**
 * Calculate all core financial metrics from Level 1 form data.
 * All ratio calculations are based on monthly figures.
 */
export function calculateMetrics(form: L1FormData): FinancialMetrics {
  const income        = parseAmount(form.income);
  const expenses      = parseAmount(form.expenses);
  const savingsMonthly = parseAmount(form.savingsMonthly);
  const monthlyDebt   = parseAmount(form.monthlyDebt);
  const emergencyFund = parseAmount(form.emergencyFund);
  const investment    = parseAmount(form.investment);

  // Saving Rate: alokasi nabung+investasi per bulan ÷ penghasilan
  const savingRate = income > 0 ? (savingsMonthly / income) * 100 : 0;

  // Debt Service Ratio: cicilan per bulan ÷ penghasilan
  const dsr = income > 0 ? (monthlyDebt / income) * 100 : 0;

  // Emergency Fund: dana darurat ÷ pengeluaran bulanan (dalam bulan)
  const efMonths = expenses > 0 ? emergencyFund / expenses : 0;

  // True Selisih: penghasilan − pengeluaran − cicilan − alokasi nabung/investasi
  const trueSelisih = income - expenses - monthlyDebt - savingsMonthly;

  return {
    income,
    expenses,
    savingsMonthly,
    monthlyDebt,
    emergencyFund,
    investment,
    savingRate,
    dsr,
    efMonths,
    trueSelisih,
  };
}
