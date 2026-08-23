import { AppEnvironment } from '../app/core/config/environment.model';

export const environment: AppEnvironment = {
  production: false,
  environmentName: 'uat',
  apiBaseUrl: 'https://uat-api.veridex.insurance/api/v1',
  authBaseUrl: 'https://uat-auth.veridex.insurance/api/v1/auth',
  documentServiceUrl: 'https://uat-docs.veridex.insurance/api/v1/documents',
  ratingServiceUrl: 'https://uat-rating.veridex.insurance/api/v1/rating',
  claimsServiceUrl: 'https://uat-claims.veridex.insurance/api/v1/claims',
  policyServiceUrl: 'https://uat-policies.veridex.insurance/api/v1/policies',
  financeServiceUrl: 'https://uat-finance.veridex.insurance/api/v1/finance',
  marketplaceServiceUrl: 'https://uat-marketplace.veridex.insurance/api/v1/marketplace',
  enableDebugTools: false,
  featureFlags: {
    enableDynamicFormEngine: true,
    enableAdvancedOcr: true,
    enableLiveRatingStream: true,
    enableAuditLogging: true
  }
};
