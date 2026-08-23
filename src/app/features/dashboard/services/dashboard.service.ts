import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ApiService } from '../../../core/api/api.service';
import { DashboardMetric, PipelineItem, RecentTransaction, UnderwritingTask } from '../models/dashboard.models';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private api: ApiService) {}

  getMetrics(): Observable<DashboardMetric[]> {
    const mockMetrics: DashboardMetric[] = [
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

    return of(mockMetrics).pipe(delay(200));
  }

  getUnderwritingPipeline(): Observable<PipelineItem[]> {
    const pipeline: PipelineItem[] = [
      { id: 'p1', stage: 'Submission Intake', count: 86, grossWrittenPremium: 14200000, percentage: 32 },
      { id: 'p2', stage: 'Rating & Quoted', count: 64, grossWrittenPremium: 11800000, percentage: 26 },
      { id: 'p3', stage: 'Underwriter Review & Referral', count: 28, grossWrittenPremium: 6400000, percentage: 14 },
      { id: 'p4', stage: 'Approved & Offered', count: 42, grossWrittenPremium: 9200000, percentage: 20 },
      { id: 'p5', stage: 'Bound & Invoiced', count: 35, grossWrittenPremium: 8100000, percentage: 18 }
    ];

    return of(pipeline).pipe(delay(200));
  }

  getRecentTasks(): Observable<UnderwritingTask[]> {
    const tasks: UnderwritingTask[] = [
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

    return of(tasks).pipe(delay(200));
  }

  getRecentTransactions(): Observable<RecentTransaction[]> {
    const txs: RecentTransaction[] = [
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

    return of(txs).pipe(delay(200));
  }
}
