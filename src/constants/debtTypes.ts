export interface DebtTypeItem {
  key: string;
  label: string;
}

/** Quick selection in L1 Step 2 */
export const L1_DEBT_TYPES: DebtTypeItem[] = [
  { key: 'na', label: 'Tidak Ada' },
  { key: 'kp', label: 'KPR' },
  { key: 'cc', label: 'Kartu Kredit' },
  { key: 'pl', label: 'Pinjol' },
  { key: 'ot', label: 'Lainnya' },
];

/** Detailed selection in L2 Step 3 */
export const L2_DEBT_TYPES: DebtTypeItem[] = [
  { key: 'kp', label: 'KPR' },
  { key: 'kd', label: 'Cicilan Kendaraan' },
  { key: 'cc', label: 'Kartu Kredit' },
  { key: 'pl', label: 'Pinjol' },
  { key: 'tf', label: 'Teman / Keluarga' },
  { key: 'no', label: 'Tidak Ada' },
];
