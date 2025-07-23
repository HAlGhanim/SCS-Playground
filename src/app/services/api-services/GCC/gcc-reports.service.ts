// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { BaseService } from '../base.service';
// import {
//   GCCBalanceResponse,
//   GCCEmployerInfo,
// } from '../../../interfaces/gcc/gcc-reports.interface';

// @Injectable({ providedIn: 'root' })
// export class GCCReportsService extends BaseService {
//   getGCCEmployerDueBalance(regNum: number): Observable<GCCBalanceResponse> {
//     return this.get<GCCBalanceResponse>(
//       `GCCAPI/GetGCCEmployerDueBalance/${regNum}`
//     );
//   }

//   getGCCMonthlyBalanceAccount(regNum: number): Observable<GCCBalanceResponse> {
//     return this.get<GCCBalanceResponse>(
//       `GCCAPI/GCCMonthlyBalanceAmount/${regNum}`
//     );
//   }

//   getGccEmployerInfo(gccCivilId: string): Observable<GCCEmployerInfo> {
//     return this.get<GCCEmployerInfo>(`GCCAPI/GetGccEmployerInfo/${gccCivilId}`);
//   }
// }
