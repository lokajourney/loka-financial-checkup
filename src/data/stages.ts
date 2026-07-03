import type { JourneyStage } from '@/types/common';

export interface StageData {
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
  description: string;
  mindset: string;
  focus: string;
}

export const STAGE_DATA: Record<JourneyStage, StageData> = {
  Starter: {
    icon: '💡',
    color: '#D8895B',
    bgColor: 'rgba(216,137,91,0.10)',
    borderColor: 'rgba(216,137,91,0.22)',
    description:
      'Kamu sedang membangun fondasi keuanganmu. Tahap ini adalah yang paling krusial — fondasi yang kuat akan menopang semua langkah ke depan.',
    mindset:
      'Satu kebiasaan keuangan baru setiap bulan sudah cukup untuk memulai perubahan yang nyata.',
    focus:
      'Membangun kebiasaan dasar: catat pengeluaran, mulai menabung, dan bangun dana darurat.',
  },
  Builder: {
    icon: '📊',
    color: '#7B9E87',
    bgColor: 'rgba(123,158,135,0.10)',
    borderColor: 'rgba(123,158,135,0.22)',
    description:
      'Fondasi sudah mulai terbentuk. Kamu sudah sadar kondisi keuanganmu dan mulai mengambil langkah konkret menuju kondisi yang lebih baik.',
    mindset:
      'Konsistensi adalah kunci. Kebiasaan yang kamu bangun sekarang akan menjadi karakter keuanganmu.',
    focus:
      'Perkuat dana darurat, mulai investasi rutin, dan susun tujuan keuangan yang spesifik.',
  },
  Organizer: {
    icon: '⚖️',
    color: '#5B8A68',
    bgColor: 'rgba(91,138,104,0.10)',
    borderColor: 'rgba(91,138,104,0.22)',
    description:
      'Keuanganmu sudah cukup terorganisir. Kamu punya sistem yang bekerja dan kebiasaan yang konsisten. Saatnya mengoptimalkan lebih dalam.',
    mindset:
      'Saatnya memberi tujuan yang lebih jelas pada setiap rupiah yang kamu miliki.',
    focus:
      'Optimalkan alokasi aset, diversifikasi investasi, dan rencanakan tujuan jangka panjang.',
  },
  'Wealth Builder': {
    icon: '🏆',
    color: '#2E4D33',
    bgColor: 'rgba(46,77,51,0.10)',
    borderColor: 'rgba(46,77,51,0.20)',
    description:
      'Kamu berada di posisi keuangan yang kuat. Fondasi solid, kebiasaan baik, dan arah yang jelas.',
    mindset:
      'Wealth building bukan soal berapa banyak yang kamu miliki, tapi sistem yang kamu bangun.',
    focus:
      'Diversifikasi lebih dalam, pertimbangkan aset produktif, dan rencanakan kebebasan finansial.',
  },
};

export const STAGE_ORDER: JourneyStage[] = [
  'Starter',
  'Builder',
  'Organizer',
  'Wealth Builder',
];
