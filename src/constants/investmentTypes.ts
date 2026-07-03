export interface InvestmentTypeItem {
  key: string;
  label: string;
}

export const INVESTMENT_TYPES: InvestmentTypeItem[] = [
  { key: 'rd', label: 'Reksa Dana' },
  { key: 'sm', label: 'Saham' },
  { key: 'em', label: 'Emas' },
  { key: 'ob', label: 'Obligasi / SBN' },
  { key: 'dp', label: 'Deposito' },
  { key: 'cr', label: 'Crypto' },
  { key: 'no', label: 'Belum Ada' },
];
