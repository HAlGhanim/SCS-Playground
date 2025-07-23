export interface LastContData {
  startdate: Date;
  stopdate?: any;
  enrolleddate: Date;
  regnum: string;
  termdate?: any;
}

export interface LastCont {
  statusCode: number;
  messageAr?: any;
  messageEn?: any;
  data: LastContData;
}
