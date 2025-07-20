import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BaseService } from '../base.service';

@Injectable({ providedIn: 'root' })
export class GCCService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }

  getGCCRPT20(date?: Date): Observable<Blob> {
    const params: Record<string, string> = date
      ? { Date: date.toISOString().split('T')[0] }
      : {};

    return this.getBlob('GCC/GetGCCRPT20', params, {
      Accept: 'application/x-zip-compressed',
    }).pipe(map((response) => response.body as Blob));
  }

  getGCCRPT30(date?: Date): Observable<Blob> {
    const params: Record<string, string> = date
      ? { Date: date.toISOString().split('T')[0] }
      : {};

    return this.getBlob('GCC/GetGCCRPT30', params, {
      Accept: 'application/x-zip-compressed',
    }).pipe(map((response) => response.body as Blob));
  }
}
