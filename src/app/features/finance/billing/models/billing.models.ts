export interface Invoice {
  id: string;
  invoiceNumber: string;
  policyNumber: string;
  insuredName: string;
  billingType: 'DIRECT_BILL' | 'AGENCY_BILL';
  installmentNumber: string;
  dueDate: string;
  amountDue: number;
  amountPaid: number;
  status: 'PAID' | 'DUE' | 'OVERDUE' | 'PARTIAL' | 'CANCELLED';
}
