import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseService } from '../base.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  GCCBalanceResponse,
  GCCEmployerInfo,
} from '../../../interfaces/Reports.interface';

@Injectable({ providedIn: 'root' })
export class GCCReportsService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }

  // Download report methods
  getGCCRPT20(date?: Date): Observable<Blob> {
    const params = date ? { Date: date.toISOString().split('T')[0] } : {};
    return this._http.get(`${this.baseUrl}GCC/GetGCCRPT20`, {
      params,
      responseType: 'blob',
      headers: new HttpHeaders({
        Accept: 'application/x-zip-compressed',
      }),
    });
  }

  getGCCRPT30(date?: Date): Observable<Blob> {
    const params = date ? { Date: date.toISOString().split('T')[0] } : {};
    return this._http.get(`${this.baseUrl}GCC/GetGCCRPT30`, {
      params,
      responseType: 'blob',
      headers: new HttpHeaders({
        Accept: 'application/x-zip-compressed',
      }),
    });
  }

  // API methods
  getGCCEmployerDueBalance(regNum: number): Observable<GCCBalanceResponse> {
    return this.get<GCCBalanceResponse>(
      `GCCAPI/GetGCCEmployerDueBalance/${regNum}`
    );
  }

  getGccEmployerInfo(gccCivilId: string): Observable<GCCEmployerInfo> {
    return this.get<GCCEmployerInfo>(`GCCAPI/GetGccEmployerInfo/${gccCivilId}`);
  }
}
