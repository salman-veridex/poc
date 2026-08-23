export interface AppEnvironment {
  production: boolean;
  environmentName: 'development' | 'qa' | 'uat' | 'production';
  apiBaseUrl: string;
  authBaseUrl: string;
  documentServiceUrl: string;
  ratingServiceUrl: string;
  claimsServiceUrl: string;
  policyServiceUrl: string;
  financeServiceUrl: string;
  marketplaceServiceUrl: string;
  enableDebugTools: boolean;
  featureFlags: {
    enableDynamicFormEngine: boolean;
    enableAdvancedOcr: boolean;
    enableLiveRatingStream: boolean;
    enableAuditLogging: boolean;
  };
}
