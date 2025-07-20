export interface EABContBalance {
  regNo: number;
  paymentDueDt: string;
  recType: string;
  seqNum: number;
  dateOfUpdate: string;
  activityDate: string;
  effectiveDate: string;
  contribBalance: number;
  contribInterest: number;
  cmContBalance: number;
  cmContInterest: number;
  inContBalance: number;
  inContInterest: number;
  idmBalance: number;
  idmInterest: number;
  contMthsAddl: number;
  cmMthsAddl: number;
  inMthsAddl: number;
  idmMthsAddl: number;
  contDaysAddl: number;
  cmDaysAddl: number;
  inDaysAddl: number;
  idmDaysAddl: number;
  //   contAddl: number
  //   cmAddl: number
  //   inAddl: number
  //   idmAddl: number
}

export interface EABContBalances {
  data: EABContBalance[];
}

export interface EABContBalanceObject {
  regNo: number;
  paymentDueDt: string;
  recType: string;
  seqNum: number;
  dateOfUpdate: string;
  activityDate: string;
  effectiveDate: string;
  contribBalance: number;
  contribInterest: number;
  cmContBalance: number;
  cmContInterest: number;
  inContBalance: number;
  inContInterest: number;
  idmBalance: number;
  idmInterest: number;

  //for rectype5 calculations
  contMthsAddl: number;
  cmMthsAddl: number;
  inMthsAddl: number;
  idmMthsAddl: number;
  contDaysAddl: number;
  cmDaysAddl: number;
  inDaysAddl: number;
  idmDaysAddl: number;
  // contAddl: number
  // cmAddl: number
  // inAddl: number
  // idmAddl: number
}

export interface EABContAddl {
  regNo: number;
  paymentDueDt: string;
  //for rectype5 calculations
  // contMthsAddl: number
  //   cmMthsAddl: number
  //   inMthsAddl: number
  //   idmMthsAddl: number
  //   contDaysAddl: number
  //   cmDaysAddl: number
  //   inDaysAddl: number
  //   idmDaysAddl: number
  contAddl: any;
  cmAddl: any;
  inAddl: any;
  idmAddl: any;
}

export interface EABContAddls {
  data: EABContAddl[];
}

export interface EABContAddlObject {
  regNo: number;
  paymentDueDt: string;
  //for rectype5 calculations
  // contMthsAddl: number
  // cmMthsAddl: number
  // inMthsAddl: number
  // idmMthsAddl: number
  // contDaysAddl: number
  // cmDaysAddl: number
  // inDaysAddl: number
  // idmDaysAddl: number
  contAddl: any;
  cmAddl: any;
  inAddl: any;
  idmAddl: any;
}
