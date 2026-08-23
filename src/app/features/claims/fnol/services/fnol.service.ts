import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { APIMethod, ApiService, ClaimsEndpoint } from '../../../../core/api';
import { ClaimRecord } from '../models/fnol.models';

const MOCK_CLAIMS: ClaimRecord[] = [
  {
    id: 'clm_1001',
    claimNumber: 'CLM-US-2026-00431',
    policyNumber: 'POL-US-2026-89422',
    insuredName: 'Atlantic Maritime Logistics Ltd',
    claimantName: 'Atlantic Maritime Logistics / Port Authority',
    lossDate: '2026-08-12',
    reportedDate: '2026-08-13',
    perilType: 'Reefer Container Thermal Breakdown',
    incidentLocation: 'Port of Newark, NJ',
    totalReserve: 65000.00,
    totalPaid: 45200.00,
    status: 'PAID',
    leadAdjuster: 'Evelyn Reed'
  },
  {
    id: 'clm_1002',
    claimNumber: 'CLM-US-2026-00432',
    policyNumber: 'POL-US-2026-89423',
    insuredName: 'Cascade Hospital Network Inc',
    claimantName: 'Dr. Gregory House & Patient Estate',
    lossDate: '2026-07-28',
    reportedDate: '2026-08-01',
    perilType: 'Medical Malpractice Surgical Complication',
    incidentLocation: 'Cascade Main Campus, Seattle WA',
    totalReserve: 350000.00,
    totalPaid: 0,
    status: 'UNDER_INVESTIGATION',
    leadAdjuster: 'Robert Vance (Senior Adjuster)'
  },
  {
    id: 'clm_1003',
    claimNumber: 'CLM-US-2026-00433',
    policyNumber: 'POL-US-2026-89421',
    insuredName: 'Nexus Renewable Energy Inc',
    claimantName: 'Nexus Renewable Energy Inc',
    lossDate: '2026-08-18',
    reportedDate: '2026-08-19',
    perilType: 'Hail & Windstorm Damage to Solar Arrays',
    incidentLocation: 'Desert Peak Solar Farm, NV',
    totalReserve: 120000.00,
    totalPaid: 0,
    status: 'COVERAGE_VERIFIED',
    leadAdjuster: 'Evelyn Reed'
  }
];

@Injectable({
  providedIn: 'root'
})
export class FnolService {
  private readonly api = inject(ApiService);

  getClaims(params?: Record<string, string | number | boolean | null | undefined>): Observable<ClaimRecord[]> {
    return this.api.httpRequest<ClaimRecord[]>(
      ClaimsEndpoint.LIST,
      APIMethod.GET,
      { params }
    ).pipe(
      catchError(() => of(MOCK_CLAIMS))
    );
  }

  getClaimById(id: string): Observable<ClaimRecord | undefined> {
    return this.api.httpRequest<ClaimRecord>(
      `${ClaimsEndpoint.DETAIL}/${id}`,
      APIMethod.GET
    ).pipe(
      catchError(() => of(MOCK_CLAIMS.find(c => c.id === id || c.claimNumber === id)))
    );
  }

  createClaim(claim: Partial<ClaimRecord>): Observable<ClaimRecord> {
    const fallbackClaim: ClaimRecord = {
      id: `clm_${Date.now()}`,
      claimNumber: `CLM-US-2026-00${Math.floor(Math.random() * 900 + 100)}`,
      policyNumber: claim.policyNumber || 'POL-US-2026-89421',
      insuredName: claim.insuredName || 'Nexus Renewable Energy Inc',
      claimantName: claim.claimantName || 'Insured Entity',
      lossDate: claim.lossDate || new Date().toISOString().split('T')[0],
      reportedDate: new Date().toISOString().split('T')[0],
      perilType: claim.perilType || 'Commercial Property Loss',
      incidentLocation: claim.incidentLocation || 'Facility Location',
      totalReserve: claim.totalReserve || 25000,
      totalPaid: 0,
      status: 'FNOL_INTAKE',
      leadAdjuster: 'Evelyn Reed'
    };

    return this.api.httpRequest<ClaimRecord>(
      ClaimsEndpoint.FNOL_CREATE,
      APIMethod.POST,
      {
        body: claim
      }
    ).pipe(
      catchError(() => {
        MOCK_CLAIMS.unshift(fallbackClaim);
        return of(fallbackClaim);
      })
    );
  }
}
