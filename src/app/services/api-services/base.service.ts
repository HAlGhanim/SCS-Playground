import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  constructor(private readonly _http: HttpClient) {}

  private readonly baseUrl: string = environment.baseUrl;

  private resolveUrl(customBaseUrl: string | undefined, url: string): string {
    return (customBaseUrl ?? this.baseUrl) + url;
  }

  get<ResponseType>(
    url: string,
    customBaseUrl?: string,
    params?: any,
    headers?: any
  ) {
    return this._http.get<ResponseType>(this.resolveUrl(customBaseUrl, url), {
      params,
      headers,
    });
  }

  post<ResponseType, RequestBodyType>(
    url: string,
    body: RequestBodyType,
    customBaseUrl?: string,
    params?: any,
    headers?: any
  ) {
    return this._http.post<ResponseType>(
      this.resolveUrl(customBaseUrl, url),
      body,
      {
        params,
        headers,
      }
    );
  }

  put<ResponseType, RequestBodyType>(
    url: string,
    body: RequestBodyType,
    customBaseUrl?: string,
    params?: any,
    headers?: any
  ) {
    return this._http.put<ResponseType>(
      this.resolveUrl(customBaseUrl, url),
      body,
      {
        params,
        headers,
      }
    );
  }

  delete<ResponseType>(
    url: string,
    customBaseUrl?: string,
    params?: any,
    headers?: any
  ) {
    return this._http.delete<ResponseType>(
      this.resolveUrl(customBaseUrl, url),
      {
        params,
        headers,
      }
    );
  }

  getBlob(url: string, customBaseUrl?: string, params?: any, headers?: any) {
    return this._http.get(this.resolveUrl(customBaseUrl, url), {
      params,
      headers,
      responseType: 'blob',
      observe: 'response',
    });
  }
}
