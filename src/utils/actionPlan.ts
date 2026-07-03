import type { L1FormData, L2FormData } from '@/types/assessment';
import type { FinancialMetrics } from '@/types/result';
import { formatRp } from './formatting';

/**
 * Generate a personalized action plan (max 4 steps).
 * Steps are ordered by priority: warnings first, then foundation, then growth.
 * Budget advice follows Loka's philosophy: record first, then adjust.
 */
export function getActionPlan(
  form: L1FormData,
  metrics: FinancialMetrics,
  l2: L2FormData,
): string[] {
  const steps: string[] = [];
  const hasPinjol = form.debtTypes['pl'] || l2.debtTypes['pl'];
  const ccBad = l2.hasCreditCard && l2.creditCardManagement !== 'full' && l2.creditCardManagement !== '';
  const goals = Object.keys(form.goals).filter((k) => form.goals[k]);

  // Priority 1: Pinjol — highest urgency
  if (hasPinjol) {
    steps.push(
      'Prioritaskan pelunasan pinjol di atas semua jenis utang lainnya. Bunganya bisa sangat tinggi dan menggerus kondisi keuanganmu dengan cepat bila dibiarkan.',
    );
  }

  // Priority 2: Credit card mismanagement
  if (ccBad) {
    steps.push(
      'Mulai bayar tagihan kartu kredit secara penuh setiap bulan. Bunga kartu kredit bisa sangat mahal dan menumpuk lebih cepat dari yang kamu sadari.',
    );
  }

  // Priority 3: Emergency fund
  if (metrics.efMonths < 3) {
    const target3 = formatRp(metrics.expenses * 3);
    const target6 = formatRp(metrics.expenses * 6);
    steps.push(
      `Perkuat dana darurat sampai 3–6 bulan pengeluaran (target: ${target3}–${target6}). Sisihkan otomatis ke rekening terpisah khusus dana darurat di hari gajian, sebelum dipakai untuk hal lain.`,
    );
  }

  // Priority 4: Start investing
  if (metrics.investment === 0) {
    steps.push(
      'Mulai berinvestasi, sekecil apapun nominalnya. Yang terpenting adalah konsistensi dan ketepatan instrumen sesuai tujuan dan jangka waktumu.',
    );
  }

  // Priority 5: Budgeting — Loka approach (NOT 50/30/20)
  if (!form.habits['re'] && steps.length < 4) {
    steps.push(
      'Mulai catat semua pengeluaran selama minimal 1 bulan penuh tanpa mencoba mengubah apapun dulu. Setelah ada data nyata, baru susun anggaran yang benar-benar sesuai kondisi dan kebiasaanmu — bukan formula yang dipaksakan.',
    );
  }

  // Priority 6: Goal-specific
  if (goals.includes('mr') && steps.length < 4) {
    steps.push(
      'Untuk persiapan pernikahan, hitung estimasi biaya total, tentukan timeline, dan buka rekening atau pos tabungan khusus. Pilih instrumen investasi yang sesuai jangka waktunya.',
    );
  }

  if (goals.includes('hs') && steps.length < 4) {
    steps.push(
      'Untuk beli rumah, tentukan target harga dan kapan waktunya. Hitung berapa down payment yang dibutuhkan dan mulai sisihkan ke pos khusus dengan instrumen yang sesuai jangka waktunya.',
    );
  }

  return steps.slice(0, 4);
}
