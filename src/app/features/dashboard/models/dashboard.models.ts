export interface DashboardMetric {
  id: string;
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  period: string;
  icon: string;
}

export interface PipelineItem {
  id: string;
  stage: string;
  count: number;
  grossWrittenPremium: number;
  percentage: number;
}

export interface UnderwritingTask {
  id: string;
  type: 'SUBMISSION' | 'REFERRAL' | 'APPROVAL' | 'CLAIM_RESERVE' | 'POLICY_ENDORSEMENT';
  title: string;
  insuredName: string;
  assignedUnderwriter: string;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  dueDate: string;
  amount: number;
}

export interface RecentTransaction {
  id: string;
  transactionNumber: string;
  type: 'NEW_POLICY' | 'ENDORSEMENT' | 'CLAIM_PAYMENT' | 'RENEWAL_BOUND';
  insuredName: string;
  productName: string;
  amount: number;
  status: string;
  timestamp: string;
}
