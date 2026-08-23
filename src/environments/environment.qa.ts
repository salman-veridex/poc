import { AppEnvironment } from '../app/core/config/environment.model';

export const environment: AppEnvironment = {
  production: false,
  environmentName: 'qa',
  apiBaseUrl: 'https://qa-api.veridex.insurance/api/v1',
  authBaseUrl: 'https://qa-auth.veridex.insurance/api/v1/auth',
  documentServiceUrl: 'https://qa-docs.veridex.insurance/api/v1/documents',
  ratingServiceUrl: 'https://qa-rating.veridex.insurance/api/v1/rating',
  claimsServiceUrl: 'https://qa-claims.veridex.insurance/api/v1/claims',
  policyServiceUrl: 'https://qa-policies.veridex.insurance/api/v1/policies',
  financeServiceUrl: 'https://qa-finance.veridex.insurance/api/v1/finance',
  marketplaceServiceUrl: 'https://qa-marketplace.veridex.insurance/api/v1/marketplace',
  enableDebugTools: true,
  featureFlags: {
    enableDynamicFormEngine: true,
    enableAdvancedOcr: true,
    enableLiveRatingStream: true,
    enableAuditLogging: true
  }
};
