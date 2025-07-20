export interface BasicData {
  filingnumber: string;
  civilid: string;
}

export interface EmployeeBasic {
  statusCode: number;
  messageAr?: any;
  messageEn?: any;
  data: BasicData;
}
