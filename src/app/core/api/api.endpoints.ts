// ==========================================
// Centralized Veridex ERP API Endpoints
// ==========================================

export enum AuthEndpoint {
  LOGIN = 'auth/login',
  LOGOUT = 'auth/logout',
  REFRESH_TOKEN = 'auth/refresh-token',
  PROFILE = 'auth/profile',
  CHANGE_PASSWORD = 'auth/change-password',
  FORGOT_PASSWORD = 'auth/forgot-password'
}

export enum ProductEndpoint {
  LIST = 'products',
  DETAIL = 'products/detail',
  CREATE = 'products',
  UPDATE = 'products/update',
  DELETE = 'products/delete',
  COVERAGES = 'products/coverages',
  RULES = 'products/rules',
  QUESTIONS = 'products/questions',
  FORMS_MAPPING = 'products/forms-mapping',
  VERSIONS = 'products/versions',
  PUBLISH = 'products/publish'
}

export enum QuoteEndpoint {
  SUBMISSIONS = 'submissions',
  SUBMISSION_DETAIL = 'submissions/detail',
  SUBMISSION_CREATE = 'submissions',
  QUOTES = 'quotes',
  QUOTE_DETAIL = 'quotes/detail',
  QUOTE_CREATE = 'quotes',
  UNDERWRITING = 'underwriting',
  REFERRALS = 'referrals',
  APPROVALS = 'approvals',
  BINDING = 'binding'
}

export enum PolicyEndpoint {
  LIST = 'policies',
  DETAIL = 'policies/detail',
  CREATE = 'policies',
  ISSUANCE = 'policies/issuance',
  ENDORSEMENTS = 'policies/endorsements',
  CANCELLATIONS = 'policies/cancellations',
  REINSTATEMENTS = 'policies/reinstatements',
  RENEWALS = 'policies/renewals',
  SERVICING = 'policies/servicing',
  DOWNLOAD_DOCUMENT = 'policies/documents/download'
}

export enum ClaimsEndpoint {
  LIST = 'claims',
  DETAIL = 'claims/detail',
  FNOL = 'claims/fnol',
  FNOL_CREATE = 'claims/fnol',
  COVERAGE_VERIFICATION = 'claims/coverage-verification',
  EXPOSURES = 'claims/exposures',
  RESERVES = 'claims/reserves',
  PAYMENTS = 'claims/payments',
  RECOVERIES = 'claims/recoveries',
  VENDORS = 'claims/vendors',
  CLOSURE = 'claims/closure'
}

export enum BillingEndpoint {
  INVOICES = 'finance/invoices',
  BILLING = 'finance/billing',
  PAYMENTS = 'finance/payments',
  ACCOUNTING = 'finance/accounting',
  COMMISSIONS = 'finance/commissions',
  RECONCILIATION = 'finance/reconciliation',
  REINSURANCE = 'finance/reinsurance'
}

export enum DocumentEndpoint {
  INTAKE = 'documents/intake',
  OCR = 'documents/ocr',
  CLASSIFICATION = 'documents/classification',
  TEMPLATES = 'documents/templates',
  GENERATE = 'documents/generate',
  ESIGNATURE = 'documents/esignature',
  STORAGE = 'documents/storage',
  DOWNLOAD = 'documents/download'
}

export enum CommunicationsEndpoint {
  CORRESPONDENCE = 'communications/correspondence',
  NOTIFICATIONS = 'communications/notifications',
  TEMPLATES = 'communications/templates',
  SEND_MESSAGE = 'communications/send'
}

export enum MarketplaceEndpoint {
  PRODUCTS = 'marketplace/products',
  COMPARE = 'marketplace/compare',
  BROKER_PORTAL = 'marketplace/broker',
  MGA_PORTAL = 'marketplace/mga',
  CARRIER_PORTAL = 'marketplace/carrier',
  CUSTOMER_PORTAL = 'marketplace/customer',
  PARTNER_JOURNEYS = 'marketplace/partner-journeys'
}

export enum AdministrationEndpoint {
  USERS = 'admin/users',
  ROLES = 'admin/roles',
  PERMISSIONS = 'admin/permissions',
  ORGANIZATIONS = 'admin/organizations',
  CONFIGURATION = 'admin/configuration',
  AUDIT_LOGS = 'admin/audit'
}
