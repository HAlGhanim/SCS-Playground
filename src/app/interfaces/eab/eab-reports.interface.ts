export interface EabReportType {
  id: string;
  name: string;
}

export const EAB_REPORT_TYPES: EabReportType[] = [
  { id: 'monthsDue', name: 'كشف عدد الأشهر المستحقة' },
  { id: 'inactiveCreditors', name: 'غير فعالين - رصيد دائن' },
  { id: 'inactiveDebtors', name: 'غير فعالين - رصيد مدين' },
  { id: 'activeCreditors', name: 'فعالين - رصيد دائن' },
  { id: 'activeDebtors', name: 'فعالين - رصيد مدين' },
  { id: 'cf020', name: 'كشف الملفات الرقابية (CF020)' },
];
