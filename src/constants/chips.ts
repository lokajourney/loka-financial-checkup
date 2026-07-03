export interface Chip {
  label: string;
  value: number;
}

export const AMOUNT_CHIPS: Chip[] = [
  { label: '0',    value: 0 },
  { label: '1 JT', value: 1_000_000 },
  { label: '3 JT', value: 3_000_000 },
  { label: '5 JT', value: 5_000_000 },
  { label: '7 JT', value: 7_000_000 },
  { label: '10 JT', value: 10_000_000 },
  { label: '20 JT', value: 20_000_000 },
  { label: '50 JT', value: 50_000_000 },
];

export const ASSET_CHIPS: Chip[] = [
  { label: '0',     value: 0 },
  { label: '10 JT', value: 10_000_000 },
  { label: '50 JT', value: 50_000_000 },
  { label: '100 JT', value: 100_000_000 },
  { label: '200 JT', value: 200_000_000 },
  { label: '500 JT', value: 500_000_000 },
  { label: '1 M',   value: 1_000_000_000 },
];

export const DEBT_OUTSTANDING_CHIPS: Chip[] = [
  { label: '0',     value: 0 },
  { label: '5 JT',  value: 5_000_000 },
  { label: '10 JT', value: 10_000_000 },
  { label: '50 JT', value: 50_000_000 },
  { label: '100 JT', value: 100_000_000 },
  { label: '200 JT', value: 200_000_000 },
];
