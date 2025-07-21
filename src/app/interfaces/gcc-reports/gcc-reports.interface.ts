export interface ReportType {
  id: string;
  name: string;
  nameAr: string;
  category: 'employer' | 'employee' | 'financial' | 'special';
}

export interface GCCCountry {
  code: number;
  nameAr: string;
  nameEn: string;
}

export interface AmountType {
  value: number;
  label: string;
  labelAr: string;
}

export interface GCCBalanceResponse {
  status_Num: number;
  desc?: string;
  regNum: number;
  resultAr: string;
  resultEn: string;
}

export interface GCCEmployerInfo {
  status_Num: number;
  desc?: string;
  employerRegNum: string;
  busLicDate: Date | null;
  licEndDate: Date | null;
  licNumber: number;
  employerName: string;
  address1: string;
  address2: string;
  address3: string;
  address4: string;
  address5: string;
  address6: string;
  erActiveEmployees: string;
  employerCivilId: string;
  governmentOwned: string;
  erRegEffDate: string;
  erLocation: string;
  erSectorType?: string;
  busTypeCode?: string;
}

export interface ReportFormValue {
  reportType: string;
  date?: Date;
  startDate?: Date;
  stopDate?: Date;
  regNum?: number;
  balance?: number;
  countryCode?: number;
  amountKD?: number;
}

export interface EmployerInfoFormValue {
  civilId: string;
  regNum: string;
}
