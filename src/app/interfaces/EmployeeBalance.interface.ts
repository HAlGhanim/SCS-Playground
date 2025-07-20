export interface Balance {
  incrinterest: number;
  basicbalance: number;
  idminterest: number;
  incrbalance: number;
  idmbalance: number;
  basicinterest: number;
  compinterest: number;
  compbalance: number;
  rectype: number;
}

export interface BalanceData {
  regnum: string;
  duedate: Date;
  dateofupdate: Date;
  balances: Balance[];
}

export interface EmployeeBalance {
  statusCode: number;
  messageAr?: any;
  messageEn?: any;
  data: BalanceData;
}
