export interface GoalItem {
  key: string;
  icon: string;
  label: string;
}

export const GOALS: GoalItem[] = [
  { key: 'ef',   icon: '🛡️', label: 'Dana Darurat' },
  { key: 'sv',   icon: '💰', label: 'Tabung Lebih' },
  { key: 'mr',   icon: '💍', label: 'Pernikahan' },
  { key: 'hs',   icon: '🏠', label: 'Beli Rumah' },
  { key: 'iv',   icon: '📈', label: 'Investasi' },
  { key: 'rt',   icon: '🌅', label: 'Pensiun' },
  { key: 'df',   icon: '🔓', label: 'Bebas Utang' },
  { key: 'ns',   icon: '🤔', label: 'Masih Bingung' },
];
