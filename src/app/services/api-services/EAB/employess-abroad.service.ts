import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseService } from '../base.service';
import { DateUtils } from '../../../utils/DateUtils.class';

@Injectable({ providedIn: 'root' })
export class EmployeesAbroadService extends BaseService {
  /**
   * كشف للمؤمن عليهم العاملين بالخارج - عدد الأشهر المستحقة
   * Report for insured employees working abroad - number of months due
   * @param dueDate Due date as Date or string
   * @returns Excel file blob
   */
  getEABMonthsDue(dueDate: Date | string): Observable<Blob> {
    const dateStr = DateUtils.toDateString(dueDate);
    return this.getBlob(`EAB/GetEABMonthsDue/${dateStr}`).pipe(
      map((response) => response.body as Blob)
    );
  }

  /**
   * كشف للمؤمن عليهم العاملين بالخارج الغير فعالين - رصيد دائن
   * Report for inactive insured employees abroad - creditor balance
   * @param dueDate Due date as Date or string
   * @returns Excel file blob
   */
  getEABInActiveCreditors(dueDate: Date | string): Observable<Blob> {
    const dateStr = DateUtils.toDateString(dueDate);
    return this.getBlob(`EAB/GetEABInActiveCreditors/${dateStr}`).pipe(
      map((response) => response.body as Blob)
    );
  }

  /**
   * كشف للمؤمن عليهم العاملين بالخارج الغير فعالين - رصيد مدين
   * Report for inactive insured employees abroad - debtor balance
   * @param dueDate Due date as Date or string
   * @returns Excel file blob
   */
  getEABInActiveDeptors(dueDate: Date | string): Observable<Blob> {
    const dateStr = DateUtils.toDateString(dueDate);
    return this.getBlob(`EAB/GetEABInActiveDeptors/${dateStr}`).pipe(
      map((response) => response.body as Blob)
    );
  }

  /**
   * كشف للمؤمن عليهم العاملين بالخارج الفعالين - رصيد دائن
   * Report for active insured employees abroad - creditor balance
   * @param dueDate Due date as Date or string
   * @returns Excel file blob
   */
  getEABActiveCreditors(dueDate: Date | string): Observable<Blob> {
    const dateStr = DateUtils.toDateString(dueDate);
    return this.getBlob(`EAB/GetEABActiveCreditors/${dateStr}`).pipe(
      map((response) => response.body as Blob)
    );
  }

  /**
   * كشف للمؤمن عليهم العاملين بالخارج الفعالين - رصيد مدين
   * Report for active insured employees abroad - debtor balance
   * @param dueDate Due date as Date or string
   * @returns Excel file blob
   */
  getEABActiveDeptors(dueDate: Date | string): Observable<Blob> {
    const dateStr = DateUtils.toDateString(dueDate);
    return this.getBlob(`EAB/GetEABActiveDeptors/${dateStr}`).pipe(
      map((response) => response.body as Blob)
    );
  }

  /**
   * كشف الملفات الرقابية للعاملين بالخارج
   * CF020 Report - Regulatory files for employees abroad
   * @param startFY Start fiscal year date as Date or string
   * @param endFY End fiscal year date as Date or string
   * @returns Excel file blob
   */
  getCF020(startFY: Date | string, endFY: Date | string): Observable<Blob> {
    const startDateStr = DateUtils.toDateString(startFY);
    const endDateStr = DateUtils.toDateString(endFY);

    return this.getBlob(`EAB/GetCF020/${startDateStr}/${endDateStr}`).pipe(
      map((response) => response.body as Blob)
    );
  }
}
