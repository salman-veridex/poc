export type PolicyStatus =
  | 'BOUND'
  | 'ISSUED'
  | 'ACTIVE'
  | 'ENDORSEMENT_PENDING'
  | 'CANCELLED'
  | 'EXPIRED'
  | 'RENEWED';

export interface PolicySchedule {
  id: string;
  policyNumber: string;
  termNumber: number;
  insuredName: string;
  productName: string;
  lineOfBusiness: string;
  effectiveDate: string;
  expirationDate: string;
  status: PolicyStatus;
  annualPremium: number;
  totalInsuredValue: number;
  paymentPlan: 'ANNUAL' | 'SEMI_ANNUAL' | 'QUARTERLY' | 'MONTHLY_EFT';
  issuingSyndicate: string;
  underwriter: string;
}
