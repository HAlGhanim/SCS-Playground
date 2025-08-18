import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DateUtils } from '../../../utils/DateUtils.class';
import { BaseService } from '../base.service';
import * as apiEndpoints from '../../../resources/api-endpoints.json';

@Injectable({ providedIn: 'root' })
export class EmployeesAbroadService extends BaseService {
  private endpoints = apiEndpoints.eab.reports;

  /**
   * كشف للمؤمن عليهم العاملين بالخارج - عدد الأشهر المستحقة
   * Report for insured employees working abroad - number of months due
   * @param dueDate Due date as Date or string
   * @returns Excel file blob
   */
  getEABMonthsDue(dueDate: Date | string): Observable<HttpResponse<Blob>> {
    const api = this.endpoints.monthsDue;
    const dateStr = DateUtils.toDateString(dueDate);
    const endpoint = `${api.endpoint}/${dateStr}`;
    return this.getBlob(endpoint, {
      Accept: api.acceptHeader,
    });
  }

  /**
   * كشف للمؤمن عليهم العاملين بالخارج الغير فعالين - رصيد دائن
   * Report for inactive insured employees abroad - creditor balance
   * @param dueDate Due date as Date or string
   * @returns Excel file blob
   */
  getEABInActiveCreditors(
    dueDate: Date | string
  ): Observable<HttpResponse<Blob>> {
    const api = this.endpoints.inActiveCreditors;
    const dateStr = DateUtils.toDateString(dueDate);
    const endpoint = `${api.endpoint}/${dateStr}`;
    return this.getBlob(endpoint, {
      Accept: api.acceptHeader,
    });
  }

  /**
   * كشف للمؤمن عليهم العاملين بالخارج الغير فعالين - رصيد مدين
   * Report for inactive insured employees abroad - debtor balance
   * @param dueDate Due date as Date or string
   * @returns Excel file blob
   */
  getEABInActiveDeptors(
    dueDate: Date | string
  ): Observable<HttpResponse<Blob>> {
    const api = this.endpoints.inActiveDeptors;
    const dateStr = DateUtils.toDateString(dueDate);
    const endpoint = `${api.endpoint}/${dateStr}`;
    return this.getBlob(endpoint, {
      Accept: api.acceptHeader,
    });
  }

  /**
   * كشف للمؤمن عليهم العاملين بالخارج الفعالين - رصيد دائن
   * Report for active insured employees abroad - creditor balance
   * @param dueDate Due date as Date or string
   * @returns Excel file blob
   */
  getEABActiveCreditors(
    dueDate: Date | string
  ): Observable<HttpResponse<Blob>> {
    const api = this.endpoints.activeCreditors;
    const dateStr = DateUtils.toDateString(dueDate);
    const endpoint = `${api.endpoint}/${dateStr}`;
    return this.getBlob(endpoint, {
      Accept: api.acceptHeader,
    });
  }

  /**
   * كشف للمؤمن عليهم العاملين بالخارج الفعالين - رصيد مدين
   * Report for active insured employees abroad - debtor balance
   * @param dueDate Due date as Date or string
   * @returns Excel file blob
   */
  getEABActiveDeptors(dueDate: Date | string): Observable<HttpResponse<Blob>> {
    const api = this.endpoints.activeDeptors;
    const dateStr = DateUtils.toDateString(dueDate);
    const endpoint = `${api.endpoint}/${dateStr}`;
    return this.getBlob(endpoint, {
      Accept: api.acceptHeader,
    });
  }

  /**
   * كشف الملفات الرقابية للعاملين بالخارج
   * CF020 Report - Regulatory files for employees abroad
   * @param startFY Start fiscal year date as Date or string
   * @param endFY End fiscal year date as Date or string
   * @returns Excel file blob
   */
  getCF020(
    startFY: Date | string,
    endFY: Date | string
  ): Observable<HttpResponse<Blob>> {
    const api = this.endpoints.cf020;
    const startDateStr = DateUtils.toDateString(startFY);
    const endDateStr = DateUtils.toDateString(endFY);
    const endpoint = `${api.endpoint}/${startDateStr}/${endDateStr}`;
    return this.getBlob(endpoint, {
      Accept: api.acceptHeader,
    });
  }
}
