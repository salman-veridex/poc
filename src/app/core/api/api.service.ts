import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, PagedResponse, QueryParams } from './api-response.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  get<T>(url: string, params?: Record<string, unknown>): Observable<T> {
    const httpParams = this.buildHttpParams(params);
    return this.http.get<T>(url, { params: httpParams });
  }

  getPaged<T>(url: string, query?: QueryParams): Observable<PagedResponse<T>> {
    const httpParams = this.buildHttpParams(query);
    return this.http.get<PagedResponse<T>>(url, { params: httpParams });
  }

  post<T>(url: string, body: unknown, params?: Record<string, unknown>): Observable<T> {
    const httpParams = this.buildHttpParams(params);
    return this.http.post<T>(url, body, { params: httpParams });
  }

  put<T>(url: string, body: unknown, params?: Record<string, unknown>): Observable<T> {
    const httpParams = this.buildHttpParams(params);
    return this.http.put<T>(url, body, { params: httpParams });
  }

  patch<T>(url: string, body: unknown, params?: Record<string, unknown>): Observable<T> {
    const httpParams = this.buildHttpParams(params);
    return this.http.patch<T>(url, body, { params: httpParams });
  }

  delete<T>(url: string, params?: Record<string, unknown>): Observable<T> {
    const httpParams = this.buildHttpParams(params);
    return this.http.delete<T>(url, { params: httpParams });
  }

  private buildHttpParams(params?: Record<string, unknown>): HttpParams {
    let httpParams = new HttpParams();
    if (!params) return httpParams;

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        if (typeof value === 'object') {
          httpParams = httpParams.set(key, JSON.stringify(value));
        } else {
          httpParams = httpParams.set(key, String(value));
        }
      }
    });

    return httpParams;
  }
}
