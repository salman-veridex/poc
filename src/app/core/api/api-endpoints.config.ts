import { environment } from '../../../environments/environment';

export const API_ENDPOINTS = {
  auth: {
    login: `${environment.authBaseUrl}/login`,
    logout: `${environment.authBaseUrl}/logout`,
    refresh: `${environment.authBaseUrl}/refresh`,
    profile: `${environment.authBaseUrl}/me`
  },
  products: {
    base: `${environment.apiBaseUrl}/products`,
    coverages: `${environment.apiBaseUrl}/products/coverages`,
    rules: `${environment.apiBaseUrl}/products/rules`,
    questions: `${environment.apiBaseUrl}/products/questions`,
    formsMapping: `${environment.apiBaseUrl}/products/forms-mapping`,
    versioning: `${environment.apiBaseUrl}/products/versions`,
    publish: `${environment.apiBaseUrl}/products/publish`
  },
  quotes: {
    submissions: `${environment.apiBaseUrl}/submissions`,
    quotes: `${environment.apiBaseUrl}/quotes`,
    underwriting: `${environment.apiBaseUrl}/underwriting`,
    referrals: `${environment.apiBaseUrl}/referrals`,
    approvals: `${environment.apiBaseUrl}/approvals`,
    binding: `${environment.apiBaseUrl}/binding`
  },
  policies: {
    base: `${environment.policyServiceUrl}/policies`,
    issuance: `${environment.policyServiceUrl}/issuance`,
    endorsements: `${environment.policyServiceUrl}/endorsements`,
    cancellations: `${environment.policyServiceUrl}/cancellations`,
    reinstatements: `${environment.policyServiceUrl}/reinstatements`,
    renewals: `${environment.policyServiceUrl}/renewals`,
    servicing: `${environment.policyServiceUrl}/servicing`
  },
  claims: {
    base: `${environment.claimsServiceUrl}/claims`,
    fnol: `${environment.claimsServiceUrl}/fnol`,
    exposures: `${environment.claimsServiceUrl}/exposures`,
    reserves: `${environment.claimsServiceUrl}/reserves`,
    payments: `${environment.claimsServiceUrl}/payments`,
    recoveries: `${environment.claimsServiceUrl}/recoveries`,
    vendors: `${environment.claimsServiceUrl}/vendors`,
    closure: `${environment.claimsServiceUrl}/closure`
  },
  finance: {
    billing: `${environment.financeServiceUrl}/billing`,
    invoices: `${environment.financeServiceUrl}/invoices`,
    payments: `${environment.financeServiceUrl}/payments`,
    commissions: `${environment.financeServiceUrl}/commissions`,
    reconciliation: `${environment.financeServiceUrl}/reconciliation`,
    reinsurance: `${environment.financeServiceUrl}/reinsurance`,
    generalLedger: `${environment.financeServiceUrl}/general-ledger`
  },
  documents: {
    intake: `${environment.documentServiceUrl}/intake`,
    ocr: `${environment.documentServiceUrl}/ocr`,
    templates: `${environment.documentServiceUrl}/templates`,
    generation: `${environment.documentServiceUrl}/generate`,
    eSignature: `${environment.documentServiceUrl}/esignature`,
    storage: `${environment.documentServiceUrl}/storage`
  },
  communications: {
    correspondence: `${environment.apiBaseUrl}/communications/correspondence`,
    notifications: `${environment.apiBaseUrl}/communications/notifications`,
    templates: `${environment.apiBaseUrl}/communications/templates`
  },
  marketplace: {
    products: `${environment.marketplaceServiceUrl}/products`,
    compare: `${environment.marketplaceServiceUrl}/compare`,
    brokerPortal: `${environment.marketplaceServiceUrl}/broker`,
    carrierPortal: `${environment.marketplaceServiceUrl}/carrier`,
    customerPortal: `${environment.marketplaceServiceUrl}/customer`
  },
  legal: {
    products: `${environment.apiBaseUrl}/legal/products`,
    cases: `${environment.apiBaseUrl}/legal/cases`,
    documents: `${environment.apiBaseUrl}/legal/documents`
  },
  admin: {
    users: `${environment.apiBaseUrl}/admin/users`,
    roles: `${environment.apiBaseUrl}/admin/roles`,
    permissions: `${environment.apiBaseUrl}/admin/permissions`,
    organizations: `${environment.apiBaseUrl}/admin/organizations`,
    configuration: `${environment.apiBaseUrl}/admin/configuration`,
    audit: `${environment.apiBaseUrl}/admin/audit`
  }
} as const;
