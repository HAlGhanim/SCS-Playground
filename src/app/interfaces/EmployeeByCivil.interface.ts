export interface CivilData {
  ssn: string;
  name: string;
  employerName?: any;
  address: string;
  civilID: string;
  regNum: string;
  mastCode: string;
  genderCode: number;
  blockCode: string;
  deathDate?: any;
  birthDate: Date;
  natCode: string;
}

export interface EmployeeByCivil {
  statusCode: number;
  messageAr: string;
  messageEn: string;
  data: CivilData;
}
