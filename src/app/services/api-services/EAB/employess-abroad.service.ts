import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseService } from '../base.service';

@Injectable({ providedIn: 'root' })
export class EmployeesAbroadService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }

  // These return Excel files

  /**
   * كشف للمؤمن عليهم العاملين بالخارج - عدد الأشهر المستحقة
   * Report for insured employees working abroad - number of months due
   */
  getEABMonthsDue(dueDate: Date | string): Observable<Blob> {
    const dateStr =
      typeof dueDate === 'string'
        ? dueDate
        : dueDate.toISOString().split('T')[0];

    return this.getBlob(`api/EAB/GetEABMonthsDue/${dateStr}`).pipe(
      map((response) => response.body as Blob)
    );
  }

  /**
   * كشف للمؤمن عليهم العاملين بالخارج الغير فعالين - رصيد دائن
   * Report for inactive insured employees abroad - creditor balance
   */
  getEABInActiveCreditors(dueDate: Date | string): Observable<Blob> {
    const dateStr =
      typeof dueDate === 'string'
        ? dueDate
        : dueDate.toISOString().split('T')[0];

    return this.getBlob(`api/EAB/GetEABInActiveCreditors/${dateStr}`).pipe(
      map((response) => response.body as Blob)
    );
  }

  /**
   * كشف للمؤمن عليهم العاملين بالخارج الغير فعالين - رصيد مدين
   * Report for inactive insured employees abroad - debtor balance
   */
  getEABInActiveDeptors(dueDate: Date | string): Observable<Blob> {
    const dateStr =
      typeof dueDate === 'string'
        ? dueDate
        : dueDate.toISOString().split('T')[0];

    return this.getBlob(`api/EAB/GetEABInActiveDeptors/${dateStr}`).pipe(
      map((response) => response.body as Blob)
    );
  }

  /**
   * كشف للمؤمن عليهم العاملين بالخارج الفعالين - رصيد دائن
   * Report for active insured employees abroad - creditor balance
   */
  getEABActiveCreditors(dueDate: Date | string): Observable<Blob> {
    const dateStr =
      typeof dueDate === 'string'
        ? dueDate
        : dueDate.toISOString().split('T')[0];

    return this.getBlob(`api/EAB/GetEABActiveCreditors/${dateStr}`).pipe(
      map((response) => response.body as Blob)
    );
  }

  /**
   * كشف للمؤمن عليهم العاملين بالخارج الفعالين - رصيد مدين
   * Report for active insured employees abroad - debtor balance
   */
  getEABActiveDeptors(dueDate: Date | string): Observable<Blob> {
    const dateStr =
      typeof dueDate === 'string'
        ? dueDate
        : dueDate.toISOString().split('T')[0];

    return this.getBlob(`api/EAB/GetEABActiveDeptors/${dateStr}`).pipe(
      map((response) => response.body as Blob)
    );
  }

  /**
   * كشف الملفات الرقابية للعاملين بالخارج
   * CF020 Report - Regulatory files for employees abroad
   */
  getCF020(startFY: Date | string, endFY: Date | string): Observable<Blob> {
    const startDateStr =
      typeof startFY === 'string'
        ? startFY
        : startFY.toISOString().split('T')[0];
    const endDateStr =
      typeof endFY === 'string' ? endFY : endFY.toISOString().split('T')[0];

    return this.getBlob(`api/EAB/GetCF020/${startDateStr}/${endDateStr}`).pipe(
      map((response) => response.body as Blob)
    );
  }
}
