export interface HabitItem {
  key: string;
  label: string;
}

export const HABITS: HabitItem[] = [
  { key: 're', label: 'Aku rutin mencatat pengeluaran' },
  { key: 'sr', label: 'Aku menabung atau berinvestasi secara konsisten setiap bulan' },
  { key: 'ir', label: 'Aku berinvestasi secara rutin' },
  { key: 'sp', label: 'Aku memisahkan pos keuangan (rekening atau kantong berbeda tiap tujuan)' },
  { key: 'fg', label: 'Aku punya tujuan finansial yang spesifik dan terukur' },
];
