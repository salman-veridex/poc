export type SubmissionStatus =
  | 'INTAKE'
  | 'TRIAGED'
  | 'IN_REVIEW'
  | 'RATED'
  | 'QUOTED'
  | 'REFERRED'
  | 'BOUND'
  | 'DECLINED'
  | 'CLOSED';

export interface Submission {
  id: string;
  submissionNumber: string;
  insuredName: string;
  brokerName: string;
  brokerageAgency: string;
  lineOfBusiness: string;
  requestedEffectiveDate: string;
  status: SubmissionStatus;
  estimatedRevenue: number;
  totalInsuredValue: number;
  assignedUnderwriter: string;
  triageScore: number;
  createdAt: string;
}
