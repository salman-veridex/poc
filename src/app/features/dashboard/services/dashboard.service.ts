import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { APIMethod, ApiService } from '../../../core/api';
import { DashboardMetric, PipelineItem, RecentTransaction, UnderwritingTask } from '../models/dashboard.models';

const MOCK_METRICS: DashboardMetric[] = [
  {
    id: 'm1',
    title: 'Gross Written Premium (YTD)',
    value: '$148.65M',
    change: '+14.2%',
    isPositive: true,
    period: 'vs prior year',
    icon: 'dollar'
  },
  {
    id: 'm2',
    title: 'Active Policies in Force',
    value: '42,890',
    change: '+8.6%',
    isPositive: true,
    period: '30-day net growth',
    icon: 'shield'
  },
  {
    id: 'm3',
    title: 'Loss Ratio (Combined)',
    value: '58.4%',
    change: '-2.1%',
    isPositive: true,
    period: 'industry target < 65%',
    icon: 'pie'
  },
  {
    id: 'm4',
    title: 'Pending Underwriting Tasks',
    value: '64',
    change: '+12',
    isPositive: false,
    period: '8 SLA breaches risk',
    icon: 'alert'
  }
];

const MOCK_PIPELINE: PipelineItem[] = [
  { id: 'p1', stage: 'Submission Intake', count: 86, grossWrittenPremium: 14200000, percentage: 32 },
  { id: 'p2', stage: 'Rating & Quoted', count: 64, grossWrittenPremium: 11800000, percentage: 26 },
  { id: 'p3', stage: 'Underwriter Review & Referral', count: 28, grossWrittenPremium: 6400000, percentage: 14 },
  { id: 'p4', stage: 'Approved & Offered', count: 42, grossWrittenPremium: 9200000, percentage: 20 },
  { id: 'p5', stage: 'Bound & Invoiced', count: 35, grossWrittenPremium: 8100000, percentage: 18 }
];

const MOCK_TASKS: UnderwritingTask[] = [
  {
    id: 'tsk_9901',
    type: 'REFERRAL',
    title: 'High Capacity Marine Cargo > $5M Limit',
    insuredName: 'Atlantic Maritime Logistics Ltd',
    assignedUnderwriter: 'Alexander Vance',
    priority: 'CRITICAL',
    dueDate: 'Today, 4:00 PM',
    amount: 5250000
  },
  {
    id: 'tsk_9902',
    type: 'APPROVAL',
    title: 'Commercial Property Flood Extension Tier 1',
    insuredName: 'Apex Industrial Properties Inc',
    assignedUnderwriter: 'Alexander Vance',
    priority: 'HIGH',
    dueDate: 'Tomorrow, 11:00 AM',
    amount: 875000
  },
  {
    id: 'tsk_9903',
    type: 'CLAIM_RESERVE',
    title: 'Excess Liability Reserve Adjustment > $100k',
    insuredName: 'Midwest Fleet Freight LLC',
    assignedUnderwriter: 'Claims Committee',
    priority: 'HIGH',
    dueDate: 'Aug 26, 2026',
    amount: 350000
  },
  {
    id: 'tsk_9904',
    type: 'SUBMISSION',
    title: 'Cyber Risk Comprehensive 2026 Renewal',
    insuredName: 'BioHealth Analytics Corp',
    assignedUnderwriter: 'Alexander Vance',
    priority: 'MEDIUM',
    dueDate: 'Aug 28, 2026',
    amount: 142000
  }
];

const MOCK_TRANSACTIONS: RecentTransaction[] = [
  {
    id: 'tx_101',
    transactionNumber: 'POL-US-2026-89421',
    type: 'NEW_POLICY',
    insuredName: 'Nexus Renewable Energy Inc',
    productName: 'Commercial Solar & Wind All-Risk',
    amount: 185000,
    status: 'BOUND',
    timestamp: '12 mins ago'
  },
  {
    id: 'tx_102',
    transactionNumber: 'CLM-US-2026-00431',
    type: 'CLAIM_PAYMENT',
    insuredName: 'Vanguard Cargo Carriers',
    productName: 'Commercial Inland Marine',
    amount: 45200,
    status: 'PAID',
    timestamp: '45 mins ago'
  },
  {
    id: 'tx_103',
    transactionNumber: 'END-US-2026-11894',
    type: 'ENDORSEMENT',
    insuredName: 'Cascade Hospital Network',
    productName: 'Medical Malpractice & D&O',
    amount: 32000,
    status: 'ISSUED',
    timestamp: '2 hours ago'
  }
];

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private readonly api = inject(ApiService);

  getMetrics(): Observable<DashboardMetric[]> {
    return this.api.httpRequest<DashboardMetric[]>(
      'dashboard/metrics',
      APIMethod.GET
    ).pipe(
      catchError(() => of(MOCK_METRICS))
    );
  }

  getUnderwritingPipeline(): Observable<PipelineItem[]> {
    return this.api.httpRequest<PipelineItem[]>(
      'dashboard/pipeline',
      APIMethod.GET
    ).pipe(
      catchError(() => of(MOCK_PIPELINE))
    );
  }

  getRecentTasks(): Observable<UnderwritingTask[]> {
    return this.api.httpRequest<UnderwritingTask[]>(
      'dashboard/tasks',
      APIMethod.GET
    ).pipe(
      catchError(() => of(MOCK_TASKS))
    );
  }

  getRecentTransactions(): Observable<RecentTransaction[]> {
    return this.api.httpRequest<RecentTransaction[]>(
      'dashboard/transactions',
      APIMethod.GET
    ).pipe(
      catchError(() => of(MOCK_TRANSACTIONS))
    );
  }
}
