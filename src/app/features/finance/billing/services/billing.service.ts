import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ApiService } from '../../../../core/api/api.service';
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
  constructor(private api: ApiService) {}

  getInvoices(): Observable<Invoice[]> {
    return of(MOCK_INVOICES).pipe(delay(250));
  }
}
