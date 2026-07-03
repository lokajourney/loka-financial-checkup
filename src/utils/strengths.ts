import type { L1FormData } from '@/types/assessment';
import type { FinancialMetrics, Strength } from '@/types/result';
import { formatRp, formatMonths } from './formatting';

/**
 * Generate a list of financial strengths from form data and metrics.
 * Returns all applicable strengths; callers can slice as needed.
 */
export function getStrengths(
  form: L1FormData,
  metrics: FinancialMetrics,
): Strength[] {
  const items: Strength[] = [];

  if (metrics.savingRate >= 20) {
    items.push({
      icon: '💰',
      title: 'Saving rate sangat baik',
      description: `Kamu sudah mengalokasikan ${Math.round(metrics.savingRate)}% dari penghasilan untuk tabungan dan investasi. Ini jauh di atas rata-rata.`,
    });
  } else if (metrics.savingRate >= 10) {
    items.push({
      icon: '💰',
      title: 'Saving rate sudah di jalur yang baik',
      description: `Alokasi tabungan dan investasimu sudah ${Math.round(metrics.savingRate)}% dari penghasilan. Terus tingkatkan secara bertahap.`,
    });
  }

  if (metrics.monthlyDebt === 0) {
    items.push({
      icon: '🎯',
      title: 'Bebas cicilan',
      description: 'Tidak ada beban cicilan bulanan — ini memberikan kebebasan dan fleksibilitas finansial yang sangat besar.',
    });
  }

  if (metrics.efMonths >= 3) {
    items.push({
      icon: '🛡️',
      title: 'Dana darurat sudah memadai',
      description: `Dana daruratmu sudah bisa menutup ${formatMonths(metrics.efMonths)} bulan pengeluaran. Kamu siap menghadapi hal tak terduga.`,
    });
  }

  if (metrics.investment > 0) {
    items.push({
      icon: '📈',
      title: 'Sudah berinvestasi',
      description: `Kamu sudah memiliki portofolio investasi senilai ${formatRp(metrics.investment)}. Konsistensi akan membuat ini berkembang signifikan jangka panjang.`,
    });
  }

  if (form.habits['re']) {
    items.push({
      icon: '📊',
      title: 'Rutin mencatat pengeluaran',
      description: 'Kebiasaan ini adalah fondasi dari semua keputusan keuangan yang baik.',
    });
  }

  if (form.habits['sp']) {
    items.push({
      icon: '🏦',
      title: 'Pos keuangan sudah terpisah',
      description: 'Memisahkan kantong keuangan adalah tanda sistem keuangan yang terorganisir dengan baik.',
    });
  }

  if (form.habits['fg']) {
    items.push({
      icon: '🎯',
      title: 'Punya tujuan finansial yang jelas',
      description: 'Tujuan yang spesifik dan terukur adalah fondasi dari setiap keputusan keuangan yang tepat sasaran.',
    });
  }

  return items;
}
