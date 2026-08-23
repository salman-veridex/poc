import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ApiService } from '../../../../core/api/api.service';
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
  constructor(private api: ApiService) {}

  getQuotes(): Observable<Quote[]> {
    return of(MOCK_QUOTES).pipe(delay(250));
  }
}
