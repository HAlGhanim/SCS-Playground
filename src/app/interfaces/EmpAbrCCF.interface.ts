export interface CCFReason {
  ccF_RSN_RCVD_AMT?: number;
  ccF_RSN_CODE: number;
}

export interface CCFData {
  rceiveddate: string;
  ccfnum: string;
  rceivedamount: number;
  ccfreasons: CCFReason[];
}

export interface CCF {
  statusCode: number;
  messageAr?: any;
  messageEn?: any;
  data: CCFData[];
}
