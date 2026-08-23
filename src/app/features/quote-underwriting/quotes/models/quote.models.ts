export interface Quote {
  id: string;
  quoteNumber: string;
  submissionNumber: string;
  insuredName: string;
  productName: string;
  totalPremium: number;
  taxAndFees: number;
  totalPayable: number;
  status: 'DRAFT' | 'RATED' | 'OFFERED' | 'ACCEPTED' | 'BOUND' | 'EXPIRED';
  effectiveDate: string;
  expirationDate: string;
  underwriter: string;
}
