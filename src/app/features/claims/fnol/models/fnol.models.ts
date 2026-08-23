export type ClaimStatus =
  | 'FNOL_INTAKE'
  | 'COVERAGE_VERIFIED'
  | 'UNDER_INVESTIGATION'
  | 'EXPOSURE_OPEN'
  | 'RESERVE_SET'
  | 'SETTLEMENT_OFFERED'
  | 'PAID'
  | 'SUBROGATION'
  | 'CLOSED'
  | 'DENIED';

export interface ClaimRecord {
  id: string;
  claimNumber: string;
  policyNumber: string;
  insuredName: string;
  claimantName: string;
  lossDate: string;
  reportedDate: string;
  perilType: string;
  incidentLocation: string;
  totalReserve: number;
  totalPaid: number;
  status: ClaimStatus;
  leadAdjuster: string;
}
