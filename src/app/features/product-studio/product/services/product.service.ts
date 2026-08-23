import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ApiService } from '../../../../core/api/api.service';
import { InsuranceProduct } from '../models/product.models';

const MOCK_PRODUCTS: InsuranceProduct[] = [
  {
    id: 'prd_cyber_enterprise_2026',
    code: 'PRD-CYB-001',
    name: 'Enterprise Cyber Risk & Ransomware Shield',
    lineOfBusiness: 'CYBER_RISK',
    version: '4.2.0',
    effectiveDate: '2026-01-01',
    status: 'ACTIVE',
    jurisdiction: ['US-ALL', 'UK', 'SG'],
    coveragesCount: 12,
    activePoliciesCount: 1840,
    annualGWP: 32400000,
    description: 'First & third-party cyber liabilities, business interruption, forensic extraction, and ransom negotiation.',
    updatedAt: '2026-08-18',
    updatedBy: 'Alexander Vance'
  },
  {
    id: 'prd_comm_prop_allrisk',
    code: 'PRD-PROP-104',
    name: 'Commercial Real Estate Special All-Risk Form',
    lineOfBusiness: 'COMMERCIAL_PROPERTY',
    version: '6.1.0',
    effectiveDate: '2025-11-01',
    status: 'ACTIVE',
    jurisdiction: ['US-EAST', 'US-WEST'],
    coveragesCount: 18,
    activePoliciesCount: 3210,
    annualGWP: 58900000,
    description: 'Comprehensive building, personal property, and business income with flood and earthquake endorsements.',
    updatedAt: '2026-08-12',
    updatedBy: 'Sarah Jenkins (Actuary)'
  },
  {
    id: 'prd_gl_umbrella_excess',
    code: 'PRD-GL-202',
    name: 'Commercial General Liability & Lead Umbrella',
    lineOfBusiness: 'GENERAL_LIABILITY',
    version: '3.0.0',
    effectiveDate: '2026-03-15',
    status: 'ACTIVE',
    jurisdiction: ['US-ALL'],
    coveragesCount: 8,
    activePoliciesCount: 4650,
    annualGWP: 42100000,
    description: 'Premises, products-completed operations, personal and advertising injury with excess capacity tiers.',
    updatedAt: '2026-07-29',
    updatedBy: 'Marcus Sterling'
  },
  {
    id: 'prd_dno_fintech_growth',
    code: 'PRD-DNO-405',
    name: 'Fintech & Digital Asset Management D&O',
    lineOfBusiness: 'DIRECTORS_AND_OFFICERS',
    version: '1.2.0-RC',
    effectiveDate: '2026-09-01',
    status: 'TESTING',
    jurisdiction: ['US-DE', 'US-NY', 'US-CA', 'UK'],
    coveragesCount: 6,
    activePoliciesCount: 0,
    annualGWP: 0,
    description: 'Side A, B & C coverage tailored for venture-backed and growth-stage tech companies.',
    updatedAt: '2026-08-22',
    updatedBy: 'Alexander Vance'
  },
  {
    id: 'prd_inland_marine_transit',
    code: 'PRD-INL-512',
    name: 'Global Supply Chain & Inland Cargo Floater',
    lineOfBusiness: 'INLAND_MARINE',
    version: '2.4.1',
    effectiveDate: '2025-06-01',
    status: 'ACTIVE',
    jurisdiction: ['US-ALL', 'CA', 'MX'],
    coveragesCount: 10,
    activePoliciesCount: 890,
    annualGWP: 15200000,
    description: 'Warehouse to warehouse freight coverage, refrigerated cargo breakdown, and transit delays.',
    updatedAt: '2026-06-14',
    updatedBy: 'David Kim'
  }
];

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private api: ApiService) {}

  getProducts(): Observable<InsuranceProduct[]> {
    return of(MOCK_PRODUCTS).pipe(delay(250));
  }

  getProductById(id: string): Observable<InsuranceProduct | undefined> {
    const product = MOCK_PRODUCTS.find(p => p.id === id);
    return of(product).pipe(delay(200));
  }

  createProduct(product: Partial<InsuranceProduct>): Observable<InsuranceProduct> {
    const newProduct: InsuranceProduct = {
      id: `prd_${Date.now()}`,
      code: product.code || `PRD-NEW-${Math.floor(Math.random() * 900 + 100)}`,
      name: product.name || 'Untitled Insurance Product',
      lineOfBusiness: product.lineOfBusiness || 'COMMERCIAL_PROPERTY',
      version: '1.0.0',
      effectiveDate: product.effectiveDate || new Date().toISOString().split('T')[0],
      status: 'DRAFT',
      jurisdiction: product.jurisdiction || ['US-ALL'],
      coveragesCount: product.coverages?.length || 4,
      activePoliciesCount: 0,
      annualGWP: 0,
      description: product.description || '',
      updatedAt: new Date().toISOString().split('T')[0],
      updatedBy: 'Alexander Vance'
    };

    MOCK_PRODUCTS.unshift(newProduct);
    return of(newProduct).pipe(delay(300));
  }
}
