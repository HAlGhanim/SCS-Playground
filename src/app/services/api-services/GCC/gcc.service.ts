import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BaseService } from '../base.service';
import { DateUtils } from '../../../utils/DateUtils.class';
import { HttpResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class GCCService extends BaseService {
  /**
   * كشف لأصحاب الأعمال الخليجيين ممن يعمل لديهم كويتيين بالعملة الخليجية
   * Report for GCC employers who have Kuwaiti employees in GCC currency
   * @param date Optional date parameter
   * @returns ZIP file containing the report
   */
  getGCCRPT20(date?: Date): Observable<HttpResponse<Blob>> {
    const params = DateUtils.createDateParams(date);
    return this.getBlob('GCC/GetGCCRPT20', params, {
      Accept: 'application/x-zip-compressed',
    });
  }

  /**
   * كشف لأصحاب الأعمال الخليجيين بالدينار الكويتي
   * Report for GCC employers in Kuwaiti Dinar
   * @param date Optional date parameter
   * @returns ZIP file containing the report
   */
  getGCCRPT30(date?: Date): Observable<HttpResponse<Blob>> {
    const params = DateUtils.createDateParams(date);
    return this.getBlob('GCC/GetGCCRPT30', params, {
      Accept: 'application/x-zip-compressed',
    });
  }

  /**
   * كشف لأصحاب الأعمال الخليجيين ممن لديهم كويتيين بفصل الدائن والمدين
   * Report for GCC employers with Kuwaitis - separating creditors and debtors
   * @param date Optional date parameter
   * @returns ZIP file containing the report
   */
  getGCCRPT40(date?: Date): Observable<HttpResponse<Blob>> {
    const params = DateUtils.createDateParams(date);
    return this.getBlob('GCC/GetGCCRPT40', params, {
      Accept: 'application/x-zip-compressed',
    });
  }

  /**
   * كتاب إحصائي لجميع أصحاب الأعمال الخليجيين
   * Statistical report for all GCC employers
   * @param date Optional date parameter
   * @returns Excel file containing the report
   */
  getGCCRPT100(date?: Date): Observable<HttpResponse<Blob>> {
    const params = DateUtils.createDateParams(date);
    return this.getBlob('GCC/GetGCCRPT100', params, {
      Accept:
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
  }

  /**
   * كشف عدد المسجلين تحت صاحب عمل خليجي بإختلاف فعالية السجل
   * Report on the number of registrants under GCC employers by activity status
   * @param date Required date parameter
   * @returns ZIP file containing the report
   */
  getGCCRPT120(date: Date): Observable<HttpResponse<Blob>> {
    const params = DateUtils.createDateParams(date);
    return this.getBlob('GCC/GetGCCRPT120', params, {
      Accept: 'application/x-zip-compressed',
    });
  }

  /**
   * كشف لأصحاب الأعمال الخليجيين ممن لديهم كويتيين بالعملة الخليجية (مدين)
   * Report for GCC employers with Kuwaitis in GCC currency (debtors)
   * @param balance Minimum balance threshold
   * @param countryId Country code (81=KSA, 82=Bahrain, 83=UAE, 84=Oman, 85=Qatar)
   * @param date Optional date parameter
   * @returns ZIP file for KSA/Oman, Excel file for others
   */
  getGCCRPT130(
    balance: number,
    countryId: number,
    date?: Date
  ): Observable<HttpResponse<Blob>> {
    const params = DateUtils.createDateParams(date);
    const acceptHeader =
      countryId === 81 || countryId === 84
        ? 'application/x-zip-compressed'
        : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

    return this.getBlob(`GCC/GetGCCRPT130/${balance}/${countryId}`, params, {
      Accept: acceptHeader,
    });
  }

  /**
   * كشف أسماء المؤمن عليهم الفعالين
   * Report of active insured members' names
   * @param stopDate Required end date
   * @param startDate Optional start date (defaults to 2006-01-01)
   * @returns Excel file containing the report
   */
  getGCCRPT150(
    stopDate: Date,
    startDate?: Date
  ): Observable<HttpResponse<Blob>> {
    const params: Record<string, string> = {
      StopDate: DateUtils.toDateString(stopDate),
    };
    if (startDate) {
      params['StartDate'] = DateUtils.toDateString(startDate);
    }

    return this.getBlob(
      `GCC/GetGCCRPT150/${DateUtils.toDateString(stopDate)}`,
      params,
      {
        Accept:
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      }
    );
  }

  /**
   * كشف لأصحاب الأعمال الخليجيين المنتهية خدمات المؤمن عليهم لديهم حتى تاريخ
   * Report for GCC employers whose insured employees' services have ended up to date
   * @param date Optional date parameter
   * @returns ZIP file containing the report
   */
  getGCCRPT170(date?: Date): Observable<HttpResponse<Blob>> {
    const params = DateUtils.createDateParams(date);
    return this.getBlob('GCC/GetGCCRPT170', params, {
      Accept: 'application/x-zip-compressed',
    });
  }

  /**
   * كشف المسجلين في دول مجلس التعاون
   * Report of registrants in GCC countries
   * @param countryCode Country code (81=KSA, 82=Bahrain, 83=UAE, 84=Oman, 85=Qatar)
   * @returns Excel file containing the report
   */
  getGCCRPTPF1(countryCode: number): Observable<HttpResponse<Blob>> {
    return this.getBlob(
      `GCC/GetGCCRPTPF1/${countryCode}`,
      {},
      {
        Accept:
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      }
    );
  }

  /**
   * كشف المسجلين لدى صاحب عمل خليجي
   * Report of registrants under a GCC employer
   * @param regNum Registration number
   * @param startDate Start date
   * @param stopDate Optional stop date
   * @returns Excel file containing the report
   */
  getGCCRPTPF7(
    regNum: number,
    startDate: Date,
    stopDate?: Date
  ): Observable<HttpResponse<Blob>> {
    const params: Record<string, string> = stopDate
      ? { stopDate: DateUtils.toDateString(stopDate) }
      : {};

    return this.getBlob(
      `GCC/GetGCCRPTPF7/${regNum}/${DateUtils.toDateString(startDate)}`,
      params,
      {
        Accept:
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      }
    );
  }

  /**
   * كشف أصحاب الأعمال الخليجيين
   * Report of GCC employers
   * @returns Excel file containing the report
   */
  getGCCRPTPF9(): Observable<HttpResponse<Blob>> {
    return this.getBlob(
      'GCC/GetGCCRPTPF9',
      {},
      {
        Accept:
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      }
    );
  }

  /**
   * كشف مبالغ الإشتراكات لأصحاب الأعمال بعد الأول من ابريل
   * Report of subscription amounts for employers after April 1st
   * @returns Excel file containing the report
   */
  getGCCRPT3132(): Observable<HttpResponse<Blob>> {
    return this.getBlob(
      'GCC/GetGCCRPT3132',
      {},
      {
        Accept:
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      }
    );
  }

  /**
   * كشف مبالغ الإشتراكات لأصحاب الأعمال السابقه للأول من ابريل 2022
   * Report of subscription amounts for employers before April 1st, 2022
   * @returns Excel file containing the report
   */
  getGCCRPT3334(): Observable<HttpResponse<Blob>> {
    return this.getBlob(
      'GCC/GetGCCRPT3334',
      {},
      {
        Accept:
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      }
    );
  }

  /**
   * كشف المبالغ المسدده لأصحاب الأعمال لميزانية بعد الأول من ابريل 2022
   * Report of amounts paid by employers for budget after April 1st, 2022
   * @returns Excel file containing the report
   */
  getGCCRPT515354(): Observable<HttpResponse<Blob>> {
    return this.getBlob(
      'GCC/GetGCCRPT515354',
      {},
      {
        Accept:
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      }
    );
  }

  /**
   * كشف الملفات الرقابيةالخاص بنظام مد الحماية للكويتيين
   * Report of regulatory files for the Kuwaiti protection extension system
   * @param amountKD Amount type (3=Bank deposit, 4=Deduction from pensioner, 9=Deduction from workforce)
   * @returns Excel file containing the report
   */
  getCMYGC009(amountKD: number): Observable<HttpResponse<Blob>> {
    return this.getBlob(
      `GCC/GetCMYGC009/${amountKD}`,
      {},
      {
        Accept:
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      }
    );
  }

  /**
   * طلب كشف للمؤمن عليهم الكويتيين العاملين بدولة قطر – الفعالين
   * Report request for active Kuwaiti insured employees working in Qatar
   * @returns Excel file containing the report
   */
  getKwtQtrActiveDisclosure(): Observable<HttpResponse<Blob>> {
    return this.getBlob(
      'GCC/GetKwtQtrActiveDisclosure',
      {},
      {
        Accept:
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      }
    );
  }

  /**
   * طلب كشف للمؤمن عليهم الكويتيين العاملين بدولة قطر – الغير الفعالين
   * Report request for inactive Kuwaiti insured employees working in Qatar
   * @returns Excel file containing the report
   */
  getKwtQtrInactiveDisclosure(): Observable<HttpResponse<Blob>> {
    return this.getBlob(
      'GCC/GetKwtQtrInactiveDisclosure',
      {},
      {
        Accept:
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      }
    );
  }

  /**
   * أصحاب أعمال في المملكة العربية السعودية
   * Employers in the Kingdom of Saudi Arabia
   * @returns Excel file containing the report
   */
  getKwtKsaActiveDisclosure(): Observable<HttpResponse<Blob>> {
    return this.getBlob(
      'GCC/GetKwtKsaActiveDisclosure',
      {},
      {
        Accept:
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      }
    );
  }
}
