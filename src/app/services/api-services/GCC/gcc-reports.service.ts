import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../base.service';
import { HttpClient } from '@angular/common/http';
import {
  GCCBalanceResponse,
  GCCEmployerInfo,
} from '../../../interfaces/Reports.interface';

@Injectable({ providedIn: 'root' })
export class GCCReportsService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }

  getGCCEmployerDueBalance(regNum: number): Observable<GCCBalanceResponse> {
    return this.get<GCCBalanceResponse>(
      `GCCAPI/GetGCCEmployerDueBalance/${regNum}`
    );
  }

  getGCCMonthlyBalanceAccount(regNum: number): Observable<GCCBalanceResponse> {
    return this.get<GCCBalanceResponse>(
      `GCCAPI/GCCMonthlyBalanceAmount/${regNum}`
    );
  }

  getGccEmployerInfo(gccCivilId: string): Observable<GCCEmployerInfo> {
    return this.get<GCCEmployerInfo>(`GCCAPI/GetGccEmployerInfo/${gccCivilId}`);
  }
}
