import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  protected readonly _http = inject(HttpClient);

  private readonly baseUrl: string = environment.endpoints.gcc.gccRpt;

  get<ResponseType>(url: string, params?: any, headers?: any) {
    return this._http.get<ResponseType>(this.baseUrl + url, {
      params,
      headers,
    });
  }

  post<ResponseType, RequestBodyType>(
    url: string,
    body: RequestBodyType,
    params?: any,
    headers?: any
  ) {
    return this._http.post<ResponseType>(this.baseUrl + url, body, {
      params,
      headers,
    });
  }

  put<ResponseType, RequestBodyType>(
    url: string,
    body: RequestBodyType,
    params?: any,
    headers?: any
  ) {
    return this._http.put<ResponseType>(this.baseUrl + url, body, {
      params,
      headers,
    });
  }

  delete<ResponseType>(url: string, params?: any, headers?: any) {
    return this._http.delete<ResponseType>(this.baseUrl + url, {
      params,
      headers,
    });
  }

  getBlob(url: string, params?: any, headers?: any) {
    return this._http.get(this.baseUrl + url, {
      params,
      headers,
      responseType: 'blob',
      observe: 'response',
    });
  }
}
