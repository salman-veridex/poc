export type UserRole =
  | 'SUPER_ADMIN'
  | 'UNDERWRITER'
  | 'SENIOR_UNDERWRITER'
  | 'ACTUARY'
  | 'PRODUCT_MANAGER'
  | 'CLAIMS_ADJUSTER'
  | 'CLAIMS_MANAGER'
  | 'FINANCE_OFFICER'
  | 'BILLING_SPECIALIST'
  | 'COMPLIANCE_OFFICER'
  | 'BROKER'
  | 'POLICYHOLDER';

export type UserPermission =
  | 'PRODUCT_VIEW'
  | 'PRODUCT_CREATE'
  | 'PRODUCT_EDIT'
  | 'PRODUCT_PUBLISH'
  | 'QUOTE_VIEW'
  | 'QUOTE_CREATE'
  | 'QUOTE_UNDERWRITE'
  | 'QUOTE_BIND'
  | 'POLICY_VIEW'
  | 'POLICY_CREATE'
  | 'POLICY_ENDORSE'
  | 'POLICY_CANCEL'
  | 'POLICY_RENEW'
  | 'CLAIMS_VIEW'
  | 'CLAIMS_CREATE'
  | 'CLAIMS_ADJUDICATE'
  | 'CLAIMS_PAY'
  | 'FINANCE_VIEW'
  | 'FINANCE_BILLING'
  | 'FINANCE_PAYMENTS'
  | 'FINANCE_RECONCILE'
  | 'DOCUMENTS_VIEW'
  | 'DOCUMENTS_UPLOAD'
  | 'DOCUMENTS_GENERATE'
  | 'MARKETPLACE_VIEW'
  | 'MARKETPLACE_MANAGE'
  | 'LEGAL_VIEW'
  | 'LEGAL_MANAGE'
  | 'ADMIN_USERS'
  | 'ADMIN_ROLES'
  | 'ADMIN_AUDIT'
  | 'ADMIN_CONFIG';

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName: string;
  tenantId: string;
  tenantName: string;
  roles: UserRole[];
  permissions: UserPermission[];
  avatarUrl?: string;
  department?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
  tenantId?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: UserProfile | null;
  tokens: AuthTokens | null;
  loading: boolean;
}
