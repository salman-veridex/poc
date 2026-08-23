import { AppEnvironment } from '../app/core/config/environment.model';

export const environment: AppEnvironment = {
  production: false,
  environmentName: 'development',
  apiBaseUrl: 'http://localhost:8080/api/v1',
  authBaseUrl: 'http://localhost:8080/api/v1/auth',
  documentServiceUrl: 'http://localhost:8081/api/v1/documents',
  ratingServiceUrl: 'http://localhost:8082/api/v1/rating',
  claimsServiceUrl: 'http://localhost:8083/api/v1/claims',
  policyServiceUrl: 'http://localhost:8084/api/v1/policies',
  financeServiceUrl: 'http://localhost:8085/api/v1/finance',
  marketplaceServiceUrl: 'http://localhost:8086/api/v1/marketplace',
  enableDebugTools: true,
  featureFlags: {
    enableDynamicFormEngine: true,
    enableAdvancedOcr: true,
    enableLiveRatingStream: true,
    enableAuditLogging: true
  }
};
