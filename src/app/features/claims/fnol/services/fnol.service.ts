import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ApiService } from '../../../../core/api/api.service';
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
  constructor(private api: ApiService) {}

  getClaims(): Observable<ClaimRecord[]> {
    return of(MOCK_CLAIMS).pipe(delay(250));
  }

  createClaim(claim: Partial<ClaimRecord>): Observable<ClaimRecord> {
    const newClaim: ClaimRecord = {
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

    MOCK_CLAIMS.unshift(newClaim);
    return of(newClaim).pipe(delay(300));
  }
}
