import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DateUtils } from '../../../utils/DateUtils.class';
import { BaseService } from '../base.service';
import * as apiEndpoints from '../../../resources/api-endpoints.json';

@Injectable({ providedIn: 'root' })
export class GCCService extends BaseService {
  private endpoints = apiEndpoints.gcc.reports;
  /**
   * كشف لأصحاب الأعمال الخليجيين ممن يعمل لديهم كويتيين بالعملة الخليجية
   * Report for GCC employers who have Kuwaiti employees in GCC currency
   * @param date Optional date parameter
   * @returns ZIP file containing the report
   */
  getGCCRPT20(date?: Date | string): Observable<HttpResponse<Blob>> {
    const config = this.endpoints.GCCRPT20;
    const params = DateUtils.createDateParams(date);
    return this.getBlob(config.endpoint, params, {
      Accept: config.acceptHeader,
    });
  }

  /**
   * كشف لأصحاب الأعمال الخليجيين بالدينار الكويتي
   * Report for GCC employers in Kuwaiti Dinar
   * @param date Optional date parameter
   * @returns ZIP file containing the report
   */
  getGCCRPT30(date?: Date | string): Observable<HttpResponse<Blob>> {
    const config = this.endpoints.GCCRPT30;
    const params = DateUtils.createDateParams(date);
    return this.getBlob(config.endpoint, params, {
      Accept: config.acceptHeader,
    });
  }

  /**
   * كشف لأصحاب الأعمال الخليجيين ممن لديهم كويتيين بفصل الدائن والمدين
   * Report for GCC employers with Kuwaitis - separating creditors and debtors
   * @param date Optional date parameter
   * @returns ZIP file containing the report
   */
  getGCCRPT40(date?: Date | string): Observable<HttpResponse<Blob>> {
    const config = this.endpoints.GCCRPT40;
    const params = DateUtils.createDateParams(date);
    return this.getBlob(config.endpoint, params, {
      Accept: config.acceptHeader,
    });
  }

  /**
   * كتاب إحصائي لجميع أصحاب الأعمال الخليجيين
   * Statistical report for all GCC employers
   * @param date Optional date parameter
   * @returns Excel file containing the report
   */
  getGCCRPT100(date?: Date | string): Observable<HttpResponse<Blob>> {
    const config = this.endpoints.GCCRPT100;
    const params = DateUtils.createDateParams(date);
    return this.getBlob(config.endpoint, params, {
      Accept: config.acceptHeader,
    });
  }

  /**
   * كشف عدد المسجلين تحت صاحب عمل خليجي بإختلاف فعالية السجل
   * Report on the number of registrants under GCC employers by activity status
   * @param date Required date parameter
   * @returns ZIP file containing the report
   */
  getGCCRPT120(date: Date | string): Observable<HttpResponse<Blob>> {
    const config = this.endpoints.GCCRPT120;
    const params = DateUtils.createDateParams(date);
    return this.getBlob(config.endpoint, params, {
      Accept: config.acceptHeader,
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
    countryId: string,
    date?: Date | string
  ): Observable<HttpResponse<Blob>> {
    const config = this.endpoints.GCCRPT130;
    const params = DateUtils.createDateParams(date);

    // Replace placeholders in endpoint
    const endpoint = config.endpoint
      .replace('{balance}', balance.toString())
      .replace('{countryId}', countryId);

    // Determine accept header based on country
    let acceptHeader: string;
    if (
      typeof config.acceptHeader === 'object' &&
      'zipCountries' in config.acceptHeader
    ) {
      acceptHeader = config.acceptHeader.zipCountries.includes(countryId)
        ? config.acceptHeader.zip
        : config.acceptHeader.excel;
    } else {
      acceptHeader = config.acceptHeader;
    }

    return this.getBlob(endpoint, params, {
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
    stopDate: Date | string,
    startDate?: Date | string
  ): Observable<HttpResponse<Blob>> {
    const config = this.endpoints.GCCRPT150;
    const params: Record<string, string> = {
      StopDate: DateUtils.toDateString(stopDate),
    };
    if (startDate) {
      params['StartDate'] = DateUtils.toDateString(startDate);
    }

    const endpoint = config.endpoint.replace(
      '{stopDate}',
      DateUtils.toDateString(stopDate)
    );

    return this.getBlob(endpoint, params, {
      Accept: config.acceptHeader,
    });
  }

  /**
   * كشف لأصحاب الأعمال الخليجيين المنتهية خدمات المؤمن عليهم لديهم حتى تاريخ
   * Report for GCC employers whose insured employees' services have ended up to date
   * @param date Optional date parameter
   * @returns ZIP file containing the report
   */
  getGCCRPT170(date?: Date | string): Observable<HttpResponse<Blob>> {
    const config = this.endpoints.GCCRPT170;
    const params = DateUtils.createDateParams(date);
    return this.getBlob(config.endpoint, params, {
      Accept: config.acceptHeader,
    });
  }

  /**
   * كشف المسجلين في دول مجلس التعاون
   * Report of registrants in GCC countries
   * @param countryCode Country code (81=KSA, 82=Bahrain, 83=UAE, 84=Oman, 85=Qatar)
   * @returns Excel file containing the report
   */
  getGCCRPTPF1(countryCode: string): Observable<HttpResponse<Blob>> {
    const config = this.endpoints.GCCRPTPF1;
    const endpoint = config.endpoint.replace('{countryCode}', countryCode);

    return this.getBlob(
      endpoint,
      {},
      {
        Accept: config.acceptHeader,
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
    startDate: Date | string,
    stopDate?: Date | string
  ): Observable<HttpResponse<Blob>> {
    const config = this.endpoints.GCCRPTPF7;
    const params: Record<string, string> = stopDate
      ? { stopDate: DateUtils.toDateString(stopDate) }
      : {};

    const endpoint = config.endpoint
      .replace('{regNum}', regNum.toString())
      .replace('{startDate}', DateUtils.toDateString(startDate));

    return this.getBlob(endpoint, params, {
      Accept: config.acceptHeader,
    });
  }

  /**
   * كشف أصحاب الأعمال الخليجيين
   * Report of GCC employers
   * @returns Excel file containing the report
   */
  getGCCRPTPF9(): Observable<HttpResponse<Blob>> {
    const config = this.endpoints.GCCRPTPF9;
    return this.getBlob(
      config.endpoint,
      {},
      {
        Accept: config.acceptHeader,
      }
    );
  }

  /**
   * كشف مبالغ الإشتراكات لأصحاب الأعمال بعد الأول من ابريل 2022
   * Report of subscription amounts for employers after April 1st
   * @returns Excel file containing the report
   */
  getGCCRPT3132(): Observable<HttpResponse<Blob>> {
    const config = this.endpoints.GCCRPT3132;
    return this.getBlob(
      config.endpoint,
      {},
      {
        Accept: config.acceptHeader,
      }
    );
  }

  /**
   * كشف مبالغ الإشتراكات لأصحاب الأعمال السابقه للأول من ابريل 2022
   * Report of subscription amounts for employers before April 1st, 2022
   * @returns Excel file containing the report
   */
  getGCCRPT3334(): Observable<HttpResponse<Blob>> {
    const config = this.endpoints.GCCRPT3334;
    return this.getBlob(
      config.endpoint,
      {},
      {
        Accept: config.acceptHeader,
      }
    );
  }
  /**
   * كشف المبالغ المسدده لأصحاب الأعمال لميزانية بعد الأول من ابريل 2022
   * Report of amounts paid by employers for budget after April 1st, 2022
   * @returns Excel file containing the report
   */
  getGCCRPT515354(): Observable<HttpResponse<Blob>> {
    const config = this.endpoints.GCCRPT515354;
    return this.getBlob(
      config.endpoint,
      {},
      {
        Accept: config.acceptHeader,
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
    const config = this.endpoints.CMYGC009;
    const endpoint = config.endpoint.replace('{amountKD}', amountKD.toString());

    return this.getBlob(
      endpoint,
      {},
      {
        Accept: config.acceptHeader,
      }
    );
  }

  /**
   * طلب كشف للمؤمن عليهم الكويتيين العاملين بدولة قطر – الفعالين
   * Report request for active Kuwaiti insured employees working in Qatar
   * @returns Excel file containing the report
   */
  getKwtQtrActiveDisclosure(): Observable<HttpResponse<Blob>> {
    const config = this.endpoints.KwtQtrActiveDisclosure;
    return this.getBlob(
      config.endpoint,
      {},
      {
        Accept: config.acceptHeader,
      }
    );
  }

  /**
   * طلب كشف للمؤمن عليهم الكويتيين العاملين بدولة قطر – الغير الفعالين
   * Report request for inactive Kuwaiti insured employees working in Qatar
   * @returns Excel file containing the report
   */
  getKwtQtrInactiveDisclosure(): Observable<HttpResponse<Blob>> {
    const config = this.endpoints.KwtQtrInactiveDisclosure;
    return this.getBlob(
      config.endpoint,
      {},
      {
        Accept: config.acceptHeader,
      }
    );
  }

  /**
   * أصحاب أعمال في المملكة العربية السعودية
   * Employers in the Kingdom of Saudi Arabia
   * @returns Excel file containing the report
   */
  getKwtKsaActiveDisclosure(): Observable<HttpResponse<Blob>> {
    const config = this.endpoints.KwtKsaActiveDisclosure;
    return this.getBlob(
      config.endpoint,
      {},
      {
        Accept: config.acceptHeader,
      }
    );
  }
}
