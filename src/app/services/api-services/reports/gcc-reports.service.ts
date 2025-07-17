import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BaseService } from '../base.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  GCCBalanceResponse,
  GCCEmployerInfo,
} from '../../../interfaces/Reports.interface';
import { environment } from '../../../environment';

@Injectable({ providedIn: 'root' })
export class GCCReportsService extends BaseService {
  private readonly gccRptBaseUrl = environment.endpoints.gcc.gccRpt;

  constructor(http: HttpClient) {
    super(http);
  }

  getGCCRPT20(date?: Date): Observable<Blob> {
    const params: Record<string, string> = date
      ? { Date: date.toISOString().split('T')[0] }
      : {};

    return this.getBlob('GCC/GetGCCRPT20', this.gccRptBaseUrl, params, {
      Accept: 'application/x-zip-compressed',
    }).pipe(map((response) => response.body as Blob));
  }

  getGCCRPT30(date?: Date): Observable<Blob> {
    const params: Record<string, string> = date
      ? { Date: date.toISOString().split('T')[0] }
      : {};

    return this.getBlob('GCC/GetGCCRPT30', this.gccRptBaseUrl, params, {
      Accept: 'application/x-zip-compressed',
    }).pipe(map((response) => response.body as Blob));
  }

  getGCCEmployerDueBalance(regNum: number): Observable<GCCBalanceResponse> {
    return this.get<GCCBalanceResponse>(
      `GCCAPI/GetGCCEmployerDueBalance/${regNum}`,
      this.gccRptBaseUrl
    );
  }

  getGccEmployerInfo(gccCivilId: string): Observable<GCCEmployerInfo> {
    return this.get<GCCEmployerInfo>(
      `GCCAPI/GetGccEmployerInfo/${gccCivilId}`,
      this.gccRptBaseUrl
    );
  }
}
