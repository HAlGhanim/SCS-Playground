export interface StatusReturnBase {
  Status_Num: number;
  Desc?: string;
}

// كشف عدد الأشهر المستحقة للمؤمن عليهم العاملين بالخارج
export interface EABMonthsDueDTO extends StatusReturnBase {
  Result: EABData[];
}

export interface EABData {
  RegNo: number; // رقم التسجيل
  Name: string; // الاسم
  SSN: number; // رقم الهوية
  CivilId: number; // الرقم المدني
  StartDate: Date; // تاريخ بدء الاشتراك
  DeptBalance: Type5[]; // المديونية المستحقة type5
  OwedMonths: number[]; // عدد الأشهر المستحقة
  MonthlyBill: Type3[]; // الاشتراك الشهري type3
}

export interface Type3 {
  type3: number;
  SSN: number;
}

export interface Type5 {
  type5: number;
  SSN: number;
}

// كشف للمؤمن عليهم العاملين بالخارج الغير/فعالين - رصيد دائن/مدين
export interface EABInActiveDTO extends StatusReturnBase {
  RegNo: number; // رقم التسجيل
  Name: string; // الاسم
  SSN: number; // رقم الهوية
  CivilId: number; // الرقم المدني
  DeptBalance: number; // الرصيد المستحق type5
  ContStartDate: Date; // تاريخ بدء الاشتراك
  ContStopDate?: Date; // تاريخ انتهاء الاشتراك
}

// CF020 - كشف الملفات الرقابية للعاملين
export interface CF020DTO extends StatusReturnBase {
  Result: CF020Data[];
}

export interface CF020Data {
  SSN?: number; // رقم الهوية
  CivilId?: number; // الرقم المدني
  RegNo?: number; // رقم التسجيل
  RcvdDate: Date; // تاريخ الاستلام
  ApplDate?: Date; // تاريخ التطبيق
  ApplAmt?: number; // المبلغ المطبق
  ReasonCode: number; // رمز السبب
}
