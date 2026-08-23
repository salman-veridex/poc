import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { APIMethod, APIResponseType, ApiRequestOptions } from './api-method.enum';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiBaseUrl;

  /**
   * Main unified API request method.
   *
   * Usage:
   * this.api.httpRequest<Product[]>(ProductEndpoint.LIST, APIMethod.GET, { params: { page: 1 } })
   * this.api.httpRequest<Product>(ProductEndpoint.CREATE, APIMethod.POST, { body: product })
   * this.api.httpRequest<Blob>(PolicyEndpoint.DOWNLOAD_DOCUMENT, APIMethod.GET, { responseType: APIResponseType.BLOB })
   */
  httpRequest<T>(
    endpoint: string,
    method: APIMethod = APIMethod.GET,
    options?: ApiRequestOptions
  ): Observable<T> {
    const url = this.resolveUrl(endpoint);
    const params = this.buildParams(options?.params);
    const headers = this.buildHeaders(options?.headers);
    const responseType = options?.responseType ?? APIResponseType.JSON;

    switch (responseType) {
      case APIResponseType.BLOB:
        return this.http.request(method, url, {
          body: options?.body,
          headers,
          params,
          withCredentials: options?.withCredentials,
          responseType: 'blob'
        }) as unknown as Observable<T>;

      case APIResponseType.TEXT:
        return this.http.request(method, url, {
          body: options?.body,
          headers,
          params,
          withCredentials: options?.withCredentials,
          responseType: 'text'
        }) as unknown as Observable<T>;

      case APIResponseType.ARRAY_BUFFER:
        return this.http.request(method, url, {
          body: options?.body,
          headers,
          params,
          withCredentials: options?.withCredentials,
          responseType: 'arraybuffer'
        }) as unknown as Observable<T>;

      case APIResponseType.JSON:
      default:
        return this.http.request<T>(method, url, {
          body: options?.body,
          headers,
          params,
          withCredentials: options?.withCredentials,
          responseType: 'json'
        });
    }
  }

  private resolveUrl(endpoint: string): string {
    if (!endpoint) return this.baseUrl;
    if (endpoint.startsWith('http://') || endpoint.startsWith('https://')) return endpoint;

    const base = this.baseUrl.endsWith('/') ? this.baseUrl.slice(0, -1) : this.baseUrl;
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
    return `${base}/${cleanEndpoint}`;
  }

  private buildParams(params?: Record<string, string | number | boolean | null | undefined>): HttpParams {
    let httpParams = new HttpParams();
    if (!params) return httpParams;

    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null && value !== '') {
        httpParams = httpParams.set(key, String(value));
      }
    }
    return httpParams;
  }

  private buildHeaders(headers?: Record<string, string>): HttpHeaders {
    let httpHeaders = new HttpHeaders();
    if (!headers) return httpHeaders;

    for (const [key, value] of Object.entries(headers)) {
      if (value !== undefined && value !== null) {
        httpHeaders = httpHeaders.set(key, value);
      }
    }
    return httpHeaders;
  }
}
