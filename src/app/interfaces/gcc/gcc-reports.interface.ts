export interface ReportType {
  id: string;
  name: string;
  nameAr: string;
  category: 'employer' | 'employee' | 'financial' | 'special';
}

export const GCC_REPORT_TYPES: ReportType[] = [
  // Employer Reports
  // {
  //   id: 'GCCRPT20',
  //   name: 'GCC Employers Report (GCC Currency)',
  //   nameAr: 'كشف لأصحاب الأعمال الخليجيين بالعملة الخليجية (20)',
  //   category: 'employer',
  // },
  // {
  //   id: 'GCCRPT30',
  //   name: 'GCC Employers Report (KWD)',
  //   nameAr: 'كشف لأصحاب الأعمال الخليجيين بالدينار الكويتي (30)',
  //   category: 'employer',
  // },
  {
    id: 'GCCRPT40',
    name: 'GCC Employers Creditors/Debtors',
    nameAr: 'كشف لأصحاب الأعمال الخليجيين بفصل الدائن والمدين (40)',
    category: 'employer',
  },
  {
    id: 'GCCRPT100',
    name: 'Statistical Report for All GCC Employers',
    nameAr: 'كتاب احصائي لجميع أصحاب الأعمال الخليجيين (100)',
    category: 'employer',
  },
  {
    id: 'GCCRPT120',
    name: 'Registrants Count by Activity Status',
    nameAr: 'كشف عدد المسجلين تحت صاحب عمل خليجي بإختلاف فعالية السجل (120)',
    category: 'employer',
  },
  {
    id: 'GCCRPT130',
    name: 'GCC Employers Debtors Report',
    nameAr:
      'كشف لأصحاب الأعمال الخليجيين من لديهم كويتيين بالعملة الخليجية (130)',
    category: 'employer',
  },
  {
    id: 'GCCRPT170',
    name: 'Terminated Employees Report',
    nameAr:
      'كشف لأصحاب الأعمال الخليجيين المنتهية خدمات المؤمن عليهم لديهم حتى تاريخ (170)',
    category: 'employer',
  },
  {
    id: 'GCCRPTPF9',
    name: 'GCC Employers List',
    nameAr: 'كشف لأصحاب الأعمال الخليجيين (PF9)',
    category: 'employer',
  },
  // Employee Reports
  {
    id: 'GCCRPT150',
    name: 'Active Insured Members',
    nameAr: 'كشف أسماء المؤمن عليهم الفعالين (150)',
    category: 'employee',
  },
  {
    id: 'GCCRPTPF1',
    name: 'GCC Registrants by Country',
    nameAr: 'كشف المسجلين في دول مجلس التعاون (PF1)',
    category: 'employee',
  },
  {
    id: 'GCCRPTPF7',
    name: 'Registrants Under GCC Employer',
    nameAr: 'كشف المسجلين لدى صاحب عمل خليجي (PF7)',
    category: 'employee',
  },
  // Financial Reports
  {
    id: 'GCCRPT3132',
    name: 'Subscriptions After April 1st',
    nameAr: 'كشف مبالغ الإشتراكات بعد الأول من ابريل 2022 (3132)',
    category: 'financial',
  },
  {
    id: 'GCCRPT3334',
    name: 'Subscriptions Before April 1st 2022',
    nameAr: 'كشف مبالغ الإشتراكات قبل الأول من ابريل 2022 (3334)',
    category: 'financial',
  },
  {
    id: 'GCCRPT515354',
    name: 'Paid Amounts After April 1st 2022',
    nameAr: 'كشف المبالغ المسددة بعد الأول من ابريل 2022 (515354)',
    category: 'financial',
  },
  // Special Reports
  {
    id: 'CMYGC009',
    name: 'Regulatory Files - Protection Extension',
    nameAr: 'كشف الملفات الرقابية لنظام مد الحماية (009)',
    category: 'special',
  },
  {
    id: 'KwtQtrActive',
    name: 'Active Kuwaitis in Qatar',
    nameAr: 'المؤمن عليهم الكويتيين في قطر - الفعالين',
    category: 'special',
  },
  {
    id: 'KwtQtrInactive',
    name: 'Inactive Kuwaitis in Qatar',
    nameAr: 'المؤمن عليهم الكويتيين في قطر - غير الفعالين',
    category: 'special',
  },
  {
    id: 'KwtKsaActive',
    name: 'Employers in Saudi Arabia',
    nameAr: 'أصحاب أعمال في السعودية',
    category: 'special',
  },
];

export interface ReportFormValue {
  reportType: string;
  date?: Date | string;
  startDate?: Date | string;
  stopDate?: Date | string;
  regNum?: number;
  balance?: number;
  countryCode?: number;
  amountKD?: number;
}
