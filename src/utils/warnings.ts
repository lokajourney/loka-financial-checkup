import type { L1FormData, L2FormData } from '@/types/assessment';
import type { Warning } from '@/types/result';

/**
 * Generate financial warnings for critical issues.
 * Currently detects: pinjol and poor credit card management.
 */
export function getWarnings(l1: L1FormData, l2: L2FormData): Warning[] {
  const warnings: Warning[] = [];

  const hasPinjol = l1.debtTypes['pl'] || l2.debtTypes['pl'];
  if (hasPinjol) {
    warnings.push({
      type: 'pinjol',
      title: 'Pinjol terdeteksi',
      description:
        'Pinjol umumnya memiliki bunga yang jauh lebih tinggi dari instrumen keuangan lainnya. Prioritaskan pelunasannya sebelum memikirkan investasi atau tujuan keuangan lainnya.',
    });
  }

  const ccBad =
    l2.hasCreditCard &&
    l2.creditCardManagement !== '' &&
    l2.creditCardManagement !== 'full';
  if (ccBad) {
    warnings.push({
      type: 'credit-card',
      title: 'Pengelolaan kartu kredit perlu diperhatikan',
      description:
        'Membayar tagihan kartu kredit secara minimum atau mencicil membuat bunga menumpuk sangat cepat. Targetkan untuk membayar penuh setiap bulan.',
    });
  }

  return warnings;
}
