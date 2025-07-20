export interface SalaryAmounts {
  totalsalary: number;
  socialallow: number;
  basic: number;
  compl: number;
  incr: number;
  idm: number;
}

export interface ContributionAmounts {
  totalsalary: number;
  socialallow: number;
  basic: number;
  compl: number;
  incr: number;
  idm: number;
}

export interface ActiveSalaryData {
  salaryAmounts: SalaryAmounts;
  contributionAmounts: ContributionAmounts;
}

export interface ActiveSalary {
  statusCode: number;
  messageAr?: any;
  messageEn?: any;
  data: ActiveSalaryData;
}
