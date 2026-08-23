import { AppEnvironment } from '../app/core/config/environment.model';

export const environment: AppEnvironment = {
  production: true,
  environmentName: 'production',
  apiBaseUrl: 'https://api.veridex.insurance/api/v1',
  authBaseUrl: 'https://auth.veridex.insurance/api/v1/auth',
  documentServiceUrl: 'https://docs.veridex.insurance/api/v1/documents',
  ratingServiceUrl: 'https://rating.veridex.insurance/api/v1/rating',
  claimsServiceUrl: 'https://claims.veridex.insurance/api/v1/claims',
  policyServiceUrl: 'https://policies.veridex.insurance/api/v1/policies',
  financeServiceUrl: 'https://finance.veridex.insurance/api/v1/finance',
  marketplaceServiceUrl: 'https://marketplace.veridex.insurance/api/v1/marketplace',
  enableDebugTools: false,
  featureFlags: {
    enableDynamicFormEngine: true,
    enableAdvancedOcr: true,
    enableLiveRatingStream: false,
    enableAuditLogging: true
  }
};
