import type { JourneyStage } from '@/types/common';
import type { FinancialMetrics } from '@/types/result';
import type { L2FormData } from '@/types/assessment';

/**
 * Generate personalized financial insights (2 paragraphs).
 * Tone: warm financial coach, never judgmental.
 */
export function getInsights(
  stage: JourneyStage,
  metrics: FinancialMetrics,
  l2: L2FormData,
): string[] {
  const isStressed = l2.financialStress >= 4;

  switch (stage) {
    case 'Starter':
      return [
        'Setiap perjalanan finansial yang kuat dimulai dari titik yang sama: kesadaran. Dan kamu sudah ada di sini.',
        isStressed
          ? 'Kamu menyebutkan kondisi keuangan terasa cukup menekan. Itu sinyal penting — bukan sesuatu yang perlu dihindari, tapi yang perlu segera direspons dengan langkah konkret pertama, sekecil apapun.'
          : 'Yang paling penting sekarang bukan seberapa banyak yang kamu punya, tapi seberapa konsisten kamu bisa membangun satu kebiasaan keuangan baru setiap bulan.',
      ];

    case 'Builder':
      if (metrics.efMonths < 3) {
        return [
          'Fondasi sudah mulai terbentuk, tapi ada satu hal yang perlu diprioritaskan sebelum melangkah lebih jauh: memperkuat dana darurat.',
          'Dana darurat bukan sekadar tabungan biasa. Ia adalah "shield" yang melindungi semua rencanamu dari kejadian tak terduga. Sampai dana darurat mencapai 3–6 bulan pengeluaran, ini yang harus jadi prioritas utama.',
        ];
      }
      if (metrics.investment === 0) {
        return [
          'Kamu sudah punya fondasi yang cukup baik dan dana darurat yang memadai.',
          'Langkah berikutnya yang paling berdampak adalah mulai berinvestasi, berapapun nominalnya. Konsistensi jauh lebih penting dari jumlah di tahap ini.',
        ];
      }
      return [
        'Kamu sudah punya fondasi yang baik — dana darurat ada, sudah berinvestasi, dan cashflow terkendali.',
        'Pertahankan konsistensi investasimu dan pastikan setiap instrumen punya tujuan serta jangka waktu yang jelas. Ini yang membedakan investasi yang optimal dari sekadar menabung di instrumen.',
      ];

    case 'Organizer':
      return [
        'Kamu sudah memiliki pondasi yang cukup baik dan sistem yang mulai bekerja.',
        'Langkah berikutnya adalah memberi tujuan yang lebih spesifik pada setiap uang yang kamu miliki agar dapat berkembang lebih optimal. Pertimbangkan diversifikasi portofolio dan mulai rencanakan tujuan jangka panjang dengan angka yang konkret.',
      ];

    case 'Wealth Builder':
      return [
        'Posisi keuanganmu sudah sangat kuat. Kamu telah membangun sistem yang solid dan kebiasaan yang konsisten.',
        'Yang terpenting sekarang adalah menjaga momentum dan mulai berpikir tentang optimalisasi jangka panjang — diversifikasi aset, perencanaan pensiun yang spesifik, dan aset produktif yang bisa bekerja bahkan saat kamu tidak aktif.',
      ];
  }
}
