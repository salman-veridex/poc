import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { APIMethod, ApiService, QuoteEndpoint } from '../../../../core/api';
import { Submission } from '../models/submission.models';

const MOCK_SUBMISSIONS: Submission[] = [
  {
    id: 'sub_9001',
    submissionNumber: 'SUB-2026-8812',
    insuredName: 'Apex Industrial Dynamics LLC',
    brokerName: 'James McAvoy',
    brokerageAgency: 'Aon Commercial Risk Solutions',
    lineOfBusiness: 'Commercial Property & Business Income',
    requestedEffectiveDate: '2026-09-01',
    status: 'IN_REVIEW',
    estimatedRevenue: 45000000,
    totalInsuredValue: 28500000,
    assignedUnderwriter: 'Alexander Vance',
    triageScore: 88,
    createdAt: '2026-08-22'
  },
  {
    id: 'sub_9002',
    submissionNumber: 'SUB-2026-8813',
    insuredName: 'Nordic Marine Logistics AS',
    brokerName: 'Helena Lindqvist',
    brokerageAgency: 'Marsh Specialty London',
    lineOfBusiness: 'Inland Marine & Cargo Floater',
    requestedEffectiveDate: '2026-09-15',
    status: 'REFERRED',
    estimatedRevenue: 120000000,
    totalInsuredValue: 65000000,
    assignedUnderwriter: 'Alexander Vance',
    triageScore: 94,
    createdAt: '2026-08-21'
  },
  {
    id: 'sub_9003',
    submissionNumber: 'SUB-2026-8814',
    insuredName: 'BioHealth Analytics AI Inc',
    brokerName: 'David Chen',
    brokerageAgency: 'Willis Towers Watson',
    lineOfBusiness: 'Cyber Risk & Tech E&O',
    requestedEffectiveDate: '2026-10-01',
    status: 'QUOTED',
    estimatedRevenue: 22000000,
    totalInsuredValue: 10000000,
    assignedUnderwriter: 'Marcus Sterling',
    triageScore: 76,
    createdAt: '2026-08-20'
  },
  {
    id: 'sub_9004',
    submissionNumber: 'SUB-2026-8815',
    insuredName: 'Evergreen Hospitality Group',
    brokerName: 'Rachel Green',
    brokerageAgency: 'Gallagher Risk Management',
    lineOfBusiness: 'Commercial Real Estate Special Form',
    requestedEffectiveDate: '2026-09-01',
    status: 'BOUND',
    estimatedRevenue: 68000000,
    totalInsuredValue: 42000000,
    assignedUnderwriter: 'Sarah Jenkins',
    triageScore: 91,
    createdAt: '2026-08-19'
  }
];

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {
  private readonly api = inject(ApiService);

  getSubmissions(params?: Record<string, string | number | boolean | null | undefined>): Observable<Submission[]> {
    return this.api.httpRequest<Submission[]>(
      QuoteEndpoint.SUBMISSIONS,
      APIMethod.GET,
      { params }
    ).pipe(
      catchError(() => of(MOCK_SUBMISSIONS))
    );
  }

  getSubmissionById(id: string): Observable<Submission | undefined> {
    return this.api.httpRequest<Submission>(
      `${QuoteEndpoint.SUBMISSION_DETAIL}/${id}`,
      APIMethod.GET
    ).pipe(
      catchError(() => of(MOCK_SUBMISSIONS.find(s => s.id === id)))
    );
  }

  createSubmission(submission: Partial<Submission>): Observable<Submission> {
    const fallbackSubmission: Submission = {
      id: `sub_${Date.now()}`,
      submissionNumber: `SUB-2026-${Math.floor(Math.random() * 9000 + 1000)}`,
      insuredName: submission.insuredName || 'New Insured Entity',
      brokerName: submission.brokerName || 'Alexander Vance',
      brokerageAgency: submission.brokerageAgency || 'Direct Intake',
      lineOfBusiness: submission.lineOfBusiness || 'Commercial Property',
      requestedEffectiveDate: submission.requestedEffectiveDate || new Date().toISOString().split('T')[0],
      status: 'IN_REVIEW',
      estimatedRevenue: submission.estimatedRevenue || 1000000,
      totalInsuredValue: submission.totalInsuredValue || 5000000,
      assignedUnderwriter: 'Alexander Vance',
      triageScore: 85,
      createdAt: new Date().toISOString().split('T')[0]
    };

    return this.api.httpRequest<Submission>(
      QuoteEndpoint.SUBMISSION_CREATE,
      APIMethod.POST,
      {
        body: submission
      }
    ).pipe(
      catchError(() => {
        MOCK_SUBMISSIONS.unshift(fallbackSubmission);
        return of(fallbackSubmission);
      })
    );
  }
}
