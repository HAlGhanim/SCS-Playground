export interface AmountType {
  value: number;
  label: string;
  labelAr: string;
}

export const AMOUNT_TYPES: AmountType[] = [
  { value: 3, label: 'Bank Deposit', labelAr: 'إيداع بنكي' },
  {
    value: 4,
    label: 'Deduction from Pensioner',
    labelAr: 'استقطاع من صاحب معاش',
  },
  {
    value: 9,
    label: 'Deduction from Workforce',
    labelAr: 'استقطاع من القوى العاملة',
  },
];
