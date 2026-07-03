import type { L1FormData, L2FormData } from '@/types/assessment';
import type { ProductRecommendation } from '@/types/result';
import type { ProductId } from '@/types/common';
import { PRODUCTS } from '@/data/products';

/**
 * Determine which Loka Financial Planner to recommend.
 *
 * Decision logic (evaluated in order — first match wins):
 *
 * 1. Has credit card → Advanced
 *    Reason: AFP is the only planner with a dedicated credit card tracker
 *    that separates CC billing from regular expenses.
 *
 * 2. Score ≥ 65  OR  (has investment AND emergency fund ≥ 3 months) → Advanced
 *    Reason: Financial condition is complex enough to need multi-track analysis.
 *
 * 3. More than one bank account → minimum Ultimate
 *    Reason: Multiple accounts require multi-account tracking capability
 *    which Premium does not support.
 *
 * 4. Score ≥ 42 → Ultimate
 *    Reason: Has a foundation — needs a fuller system for multi-goal planning.
 *
 * 5. Default (score < 42, single/no bank account, no CC) → Premium
 *    Reason: Focus on building core habits first.
 *
 * Note: No prices are shown to the user.
 */
export function getProductRecommendation(
  score: number,
  l1: L1FormData,
  l2: L2FormData,
): ProductRecommendation {
  const hasCreditCard  = l2.hasCreditCard;
  const hasInvestment  = parseFloat(l1.investment  || '0') > 0;
  const expenses       = parseFloat(l1.expenses     || '0');
  const emergencyFund  = parseFloat(l1.emergencyFund || '0');
  const efMonths       = expenses > 0 ? emergencyFund / expenses : 0;
  const bankAccounts   = parseInt(l2.bankAccounts   || '1', 10);
  const hasMultipleBankAccounts = bankAccounts > 1;

  let id: ProductId;
  let why: string;

  if (hasCreditCard) {
    id = 'advanced';
    why =
      'Karena kamu menggunakan kartu kredit, kamu butuh sistem yang bisa melacak tagihan kartu kredit secara terpisah dari pengeluaran rutin. Fitur credit card tracker ini hanya tersedia di Advanced Financial Planner — satu-satunya cara untuk memastikan tagihan CC tidak bercampur dengan pengeluaran harian dan kamu tidak ketinggalan bayar tagihan penuh setiap bulan.';
  } else if (score >= 65 || (hasInvestment && efMonths >= 3)) {
    id = 'advanced';
    why =
      'Kondisi keuanganmu sudah cukup kompleks dan terus berkembang — kamu sudah punya investasi, dana darurat yang memadai, dan skor yang solid. Kamu perlu sistem yang bisa track semua aspek sekaligus: portofolio investasi, multiple financial goals, dan laporan keuangan personal yang lebih detail.';
  } else if (hasMultipleBankAccounts) {
    id = 'ultimate';
    why =
      'Karena kamu mengelola lebih dari satu rekening bank, kamu butuh sistem yang bisa melacak arus uang dari berbagai sumber sekaligus. Ultimate Financial Planner dirancang untuk kondisi keuangan yang sudah mulai kompleks seperti ini — lengkap dengan fitur multi-account tracking, debt tracker, dan perencanaan beberapa tujuan keuangan dalam satu sistem.';
  } else if (score >= 42) {
    id = 'ultimate';
    why =
      'Kamu sudah punya fondasi yang baik. Yang kamu butuhkan sekarang adalah sistem yang lebih lengkap untuk mengatur beberapa tujuan keuangan sekaligus, melacak utang dengan lebih terstruktur, dan memaksimalkan alokasi penghasilanmu secara optimal.';
  } else {
    id = 'premium';
    why =
      'Berdasarkan kondisi keuanganmu saat ini, kamu akan mendapat manfaat terbesar dari sistem yang fokus membangun kebiasaan dasar yang konsisten: mencatat pengeluaran harian, memulai tabungan rutin, dan membangun dana darurat secara bertahap. Inilah fondasi yang akan menopang semua langkah finansialmu ke depan.';
  }

  return { ...PRODUCTS[id], why };
}
