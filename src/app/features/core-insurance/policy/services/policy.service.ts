import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { APIMethod, APIResponseType, ApiService, PolicyEndpoint } from '../../../../core/api';
import { PolicySchedule } from '../models/policy.models';

const MOCK_POLICIES: PolicySchedule[] = [
  {
    id: 'pol_1001',
    policyNumber: 'POL-US-2026-89421',
    termNumber: 1,
    insuredName: 'Nexus Renewable Energy Inc',
    productName: 'Commercial Solar & Wind All-Risk',
    lineOfBusiness: 'Commercial Property',
    effectiveDate: '2026-08-15',
    expirationDate: '2027-08-15',
    status: 'ACTIVE',
    annualPremium: 185000,
    totalInsuredValue: 45000000,
    paymentPlan: 'QUARTERLY',
    issuingSyndicate: 'Veridex Global Underwriters',
    underwriter: 'Alexander Vance'
  },
  {
    id: 'pol_1002',
    policyNumber: 'POL-US-2026-89422',
    termNumber: 2,
    insuredName: 'Atlantic Maritime Logistics Ltd',
    productName: 'Global Supply Chain & Inland Cargo Floater',
    lineOfBusiness: 'Inland Marine',
    effectiveDate: '2026-06-01',
    expirationDate: '2027-06-01',
    status: 'ACTIVE',
    annualPremium: 94000,
    totalInsuredValue: 18000000,
    paymentPlan: 'MONTHLY_EFT',
    issuingSyndicate: 'Veridex Lloyd\'s Syndicate 1948',
    underwriter: 'Marcus Sterling'
  },
  {
    id: 'pol_1003',
    policyNumber: 'POL-US-2026-89423',
    termNumber: 1,
    insuredName: 'Cascade Hospital Network Inc',
    productName: 'Medical Malpractice & Healthcare D&O',
    lineOfBusiness: 'Directors & Officers',
    effectiveDate: '2026-04-10',
    expirationDate: '2027-04-10',
    status: 'ACTIVE',
    annualPremium: 412000,
    totalInsuredValue: 85000000,
    paymentPlan: 'SEMI_ANNUAL',
    issuingSyndicate: 'Veridex Global Underwriters',
    underwriter: 'Sarah Jenkins'
  },
  {
    id: 'pol_1004',
    policyNumber: 'POL-US-2026-89424',
    termNumber: 3,
    insuredName: 'Summit Peak Logistics LLC',
    productName: 'Commercial Auto & Motor Carrier Fleet',
    lineOfBusiness: 'Commercial Auto',
    effectiveDate: '2026-01-01',
    expirationDate: '2027-01-01',
    status: 'ENDORSEMENT_PENDING',
    annualPremium: 260000,
    totalInsuredValue: 32000000,
    paymentPlan: 'MONTHLY_EFT',
    issuingSyndicate: 'Veridex Global Underwriters',
    underwriter: 'Alexander Vance'
  }
];

@Injectable({
  providedIn: 'root'
})
export class PolicyService {
  private readonly api = inject(ApiService);

  getPolicies(params?: Record<string, string | number | boolean | null | undefined>): Observable<PolicySchedule[]> {
    return this.api.httpRequest<PolicySchedule[]>(
      PolicyEndpoint.LIST,
      APIMethod.GET,
      { params }
    ).pipe(
      catchError(() => of(MOCK_POLICIES))
    );
  }

  getPolicyById(id: string): Observable<PolicySchedule | undefined> {
    return this.api.httpRequest<PolicySchedule>(
      `${PolicyEndpoint.DETAIL}/${id}`,
      APIMethod.GET
    ).pipe(
      catchError(() => of(MOCK_POLICIES.find(p => p.id === id || p.policyNumber === id)))
    );
  }

  downloadDocument(policyId: string, documentId: string): Observable<Blob> {
    return this.api.httpRequest<Blob>(
      `${PolicyEndpoint.DOWNLOAD_DOCUMENT}/${policyId}/${documentId}`,
      APIMethod.GET,
      {
        responseType: APIResponseType.BLOB
      }
    );
  }
}
