import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { APIMethod, ApiService, BillingEndpoint } from '../../../../core/api';
import { Invoice } from '../models/billing.models';

const MOCK_INVOICES: Invoice[] = [
  {
    id: 'inv_3001',
    invoiceNumber: 'INV-2026-00912',
    policyNumber: 'POL-US-2026-89421',
    insuredName: 'Nexus Renewable Energy Inc',
    billingType: 'DIRECT_BILL',
    installmentNumber: 'Q1 (1 of 4)',
    dueDate: '2026-09-01',
    amountDue: 46250.00,
    amountPaid: 46250.00,
    status: 'PAID'
  },
  {
    id: 'inv_3002',
    invoiceNumber: 'INV-2026-00913',
    policyNumber: 'POL-US-2026-89422',
    insuredName: 'Atlantic Maritime Logistics Ltd',
    billingType: 'AGENCY_BILL',
    installmentNumber: 'M03 (3 of 12)',
    dueDate: '2026-09-01',
    amountDue: 7833.33,
    amountPaid: 0,
    status: 'DUE'
  },
  {
    id: 'inv_3003',
    invoiceNumber: 'INV-2026-00914',
    policyNumber: 'POL-US-2026-89423',
    insuredName: 'Cascade Hospital Network Inc',
    billingType: 'DIRECT_BILL',
    installmentNumber: 'H1 (1 of 2)',
    dueDate: '2026-08-15',
    amountDue: 206000.00,
    amountPaid: 0,
    status: 'OVERDUE'
  }
];

@Injectable({
  providedIn: 'root'
})
export class BillingService {
  private readonly api = inject(ApiService);

  getInvoices(params?: Record<string, string | number | boolean | null | undefined>): Observable<Invoice[]> {
    return this.api.httpRequest<Invoice[]>(
      BillingEndpoint.INVOICES,
      APIMethod.GET,
      { params }
    ).pipe(
      catchError(() => of(MOCK_INVOICES))
    );
  }
}
