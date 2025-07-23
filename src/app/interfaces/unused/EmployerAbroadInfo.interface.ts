export interface EmpAbrInfo {
  mBasEeSsn: string;
  country: string;
  entrySource: string;
  stopDate: Date;
  eErName: string;
  entryTimestamp: Date;
  aErName: string;
  civilId: string;
  startDate: Date;
  mBasEeSsnNavigation?: any;
  id: number;
}

export interface EmployerAbroadInfo {
  // statusCode: number;
  // messageAr?: any;

  /**
   * aErName: "شركة"
civilId: 287101800059
country: "france"
eErName: "Company"
entrySource: "IN"
entryTimestamp: "2021-12-06T20:05:46.317407"
id: 4
mBasEeSsn: 18710181659
mBasEeSsnNavigation: null
startDate: "2021-01-01T00:00:00"
stopDate: "2021-06-30T00:00:00"
   * 
   * 
   */
  // messageEn?: any;
  data: EmpAbrInfo[];
}
