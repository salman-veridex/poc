import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { APIMethod, ApiService, QuoteEndpoint } from '../../../../core/api';
import { Quote } from '../models/quote.models';

const MOCK_QUOTES: Quote[] = [
  {
    id: 'qt_101',
    quoteNumber: 'QT-2026-9041',
    submissionNumber: 'SUB-2026-8812',
    insuredName: 'Apex Industrial Dynamics LLC',
    productName: 'Commercial Real Estate Special Form',
    totalPremium: 142500,
    taxAndFees: 6412.50,
    totalPayable: 148912.50,
    status: 'OFFERED',
    effectiveDate: '2026-09-01',
    expirationDate: '2026-09-30',
    underwriter: 'Alexander Vance'
  },
  {
    id: 'qt_102',
    quoteNumber: 'QT-2026-9042',
    submissionNumber: 'SUB-2026-8814',
    insuredName: 'BioHealth Analytics AI Inc',
    productName: 'Enterprise Cyber Risk & Ransomware Shield',
    totalPremium: 88000,
    taxAndFees: 3960.00,
    totalPayable: 91960.00,
    status: 'RATED',
    effectiveDate: '2026-10-01',
    expirationDate: '2026-10-31',
    underwriter: 'Marcus Sterling'
  },
  {
    id: 'qt_103',
    quoteNumber: 'QT-2026-9043',
    submissionNumber: 'SUB-2026-8815',
    insuredName: 'Evergreen Hospitality Group',
    productName: 'Commercial Property & Business Income',
    totalPremium: 320000,
    taxAndFees: 14400.00,
    totalPayable: 334400.00,
    status: 'BOUND',
    effectiveDate: '2026-09-01',
    expirationDate: '2026-09-30',
    underwriter: 'Sarah Jenkins'
  }
];

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  private readonly api = inject(ApiService);

  getQuotes(params?: Record<string, string | number | boolean | null | undefined>): Observable<Quote[]> {
    return this.api.httpRequest<Quote[]>(
      QuoteEndpoint.QUOTES,
      APIMethod.GET,
      { params }
    ).pipe(
      catchError(() => of(MOCK_QUOTES))
    );
  }

  getQuoteById(id: string): Observable<Quote | undefined> {
    return this.api.httpRequest<Quote>(
      `${QuoteEndpoint.QUOTE_DETAIL}/${id}`,
      APIMethod.GET
    ).pipe(
      catchError(() => of(MOCK_QUOTES.find(q => q.id === id)))
    );
  }

  createQuote(quote: Partial<Quote>): Observable<Quote> {
    const fallbackQuote: Quote = {
      id: `qt_${Date.now()}`,
      quoteNumber: `QT-2026-${Math.floor(Math.random() * 9000 + 1000)}`,
      submissionNumber: quote.submissionNumber || 'SUB-2026-0000',
      insuredName: quote.insuredName || 'New Account',
      productName: quote.productName || 'Commercial Package',
      totalPremium: quote.totalPremium || 50000,
      taxAndFees: quote.taxAndFees || 2500,
      totalPayable: (quote.totalPremium || 50000) + (quote.taxAndFees || 2500),
      status: 'RATED',
      effectiveDate: quote.effectiveDate || new Date().toISOString().split('T')[0],
      expirationDate: quote.expirationDate || new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
      underwriter: 'Alexander Vance'
    };

    return this.api.httpRequest<Quote>(
      QuoteEndpoint.QUOTE_CREATE,
      APIMethod.POST,
      { body: quote }
    ).pipe(
      catchError(() => {
        MOCK_QUOTES.unshift(fallbackQuote);
        return of(fallbackQuote);
      })
    );
  }
}
