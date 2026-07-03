import type { L1FormData } from '@/types/assessment';
import type { FinancialMetrics, FocusArea } from '@/types/result';
import { formatMonths, formatPct } from './formatting';

/**
 * Generate a list of financial focus areas (things to improve).
 * Returns all applicable areas; callers can slice as needed.
 */
export function getFocusAreas(
  form: L1FormData,
  metrics: FinancialMetrics,
): FocusArea[] {
  const items: FocusArea[] = [];

  if (metrics.efMonths < 3) {
    items.push({
      icon: '⚠️',
      title: 'Dana darurat perlu diperkuat',
      description: `Dana daruratmu baru menutup ${formatMonths(metrics.efMonths)} bulan pengeluaran. Targetkan 3–6 bulan sebelum investasi agresif.`,
    });
  }

  if (metrics.savingRate < 10 && metrics.income > 0) {
    items.push({
      icon: '📊',
      title: 'Saving rate masih bisa ditingkatkan',
      description: `Kamu mengalokasikan ${formatPct(metrics.savingRate)} dari penghasilan untuk tabungan dan investasi. Idealnya minimal 10–20%.`,
    });
  }

  if (metrics.investment === 0) {
    items.push({
      icon: '📉',
      title: 'Belum mulai berinvestasi',
      description: 'Bahkan Rp 100.000 per bulan yang diinvestasikan konsisten bisa menjadi pondasi kekayaan jangka panjang.',
    });
  }

  if (metrics.dsr > 30) {
    items.push({
      icon: '🔴',
      title: 'Beban cicilan perlu diperhatikan',
      description: `Cicilanmu mengambil ${formatPct(metrics.dsr)} dari penghasilan, di atas batas ideal 30%.`,
    });
  }

  if (!form.habits['re']) {
    items.push({
      icon: '📝',
      title: 'Mulai catat pengeluaran',
      description: 'Tanpa data pengeluaran yang akurat, sulit mengetahui ke mana uang pergi setiap bulannya.',
    });
  }

  if (!form.habits['fg']) {
    items.push({
      icon: '🎯',
      title: 'Tujuan finansial belum terdefinisi',
      description: 'Tanpa tujuan yang spesifik, tabungan sering tidak bertahan lama.',
    });
  }

  return items;
}
