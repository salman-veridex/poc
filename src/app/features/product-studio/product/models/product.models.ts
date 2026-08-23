export type LineOfBusiness =
  | 'COMMERCIAL_PROPERTY'
  | 'GENERAL_LIABILITY'
  | 'CYBER_RISK'
  | 'DIRECTORS_AND_OFFICERS'
  | 'COMMERCIAL_AUTO'
  | 'WORKERS_COMPENSATION'
  | 'INLAND_MARINE'
  | 'SURETY';

export type ProductStatus = 'DRAFT' | 'TESTING' | 'ACTIVE' | 'ARCHIVED' | 'VERSION_PENDING';

export interface CoverageLimit {
  id: string;
  name: string;
  defaultLimit: number;
  minLimit: number;
  maxLimit: number;
  defaultDeductible: number;
  isMandatory: boolean;
}

export interface RatingFactor {
  id: string;
  factorCode: string;
  factorName: string;
  factorType: 'MULTIPLIER' | 'ADDITIVE' | 'TIERED' | 'FORMULA';
  baseRate: number;
}

export interface InsuranceProduct {
  id: string;
  code: string;
  name: string;
  lineOfBusiness: LineOfBusiness;
  version: string;
  effectiveDate: string;
  expirationDate?: string;
  status: ProductStatus;
  jurisdiction: string[];
  coveragesCount: number;
  activePoliciesCount: number;
  annualGWP: number;
  description?: string;
  coverages?: CoverageLimit[];
  ratingFactors?: RatingFactor[];
  updatedAt: string;
  updatedBy: string;
}
