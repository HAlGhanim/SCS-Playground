export interface ReportRequest {
  date?: string;
  startDate?: string;
  endDate?: string;
  regNum?: number;
  amountKD?: number;
}

export interface ReportResponse {
  fileName: string;
  fileContent: Blob;
}

export interface GCCEmployerInfo {
  employerRegNum: string;
  employerName: string;
  civilId: string;
  busTypeCode?: string;
  erActiveEmployees?: string;
}

export interface GCCBalanceResponse {
  regNum: number;
  resultAr: string;
  resultEn: string;
}
