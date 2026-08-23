import { UserPermission } from '../auth/auth.models';

export interface NavItem {
  id: string;
  label: string;
  route?: string;
  icon: string;
  badge?: string | number;
  badgeColor?: 'primary' | 'warning' | 'danger' | 'success';
  permissions?: UserPermission[];
  children?: NavItem[];
  isExpanded?: boolean;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const NAVIGATION_CONFIG: NavSection[] = [
  {
    title: 'OVERVIEW',
    items: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        route: '/dashboard',
        icon: 'layout-dashboard'
      }
    ]
  },
  {
    title: 'CORE INSURANCE OPERATIONS',
    items: [
      {
        id: 'product-studio',
        label: 'Product Studio',
        icon: 'boxes',
        permissions: ['PRODUCT_VIEW'],
        children: [
          { id: 'ps-products', label: 'Products', route: '/product-studio/products', icon: 'package' },
          { id: 'ps-coverage', label: 'Coverages', route: '/product-studio/coverage', icon: 'shield' },
          { id: 'ps-risk', label: 'Risk Configuration', route: '/product-studio/risk-configuration', icon: 'sliders' },
          { id: 'ps-questions', label: 'Dynamic Questions', route: '/product-studio/questions', icon: 'help-circle' },
          { id: 'ps-rules', label: 'Rules & Rating', route: '/product-studio/rules', icon: 'binary' },
          { id: 'ps-forms', label: 'Forms Mapping', route: '/product-studio/forms-mapping', icon: 'file-text' },
          { id: 'ps-versioning', label: 'Versioning', route: '/product-studio/versioning', icon: 'git-branch' },
          { id: 'ps-publishing', label: 'Publishing', route: '/product-studio/publishing', icon: 'upload-cloud' }
        ]
      },
      {
        id: 'quote-underwriting',
        label: 'Quote & Underwriting',
        icon: 'clipboard-check',
        permissions: ['QUOTE_VIEW'],
        children: [
          { id: 'qu-submissions', label: 'Submissions', route: '/quote-underwriting/submissions', icon: 'inbox', badge: '14' },
          { id: 'qu-quotes', label: 'Quotes & Rating', route: '/quote-underwriting/quotes', icon: 'calculator' },
          { id: 'qu-underwriting', label: 'UW Workbench', route: '/quote-underwriting/underwriting', icon: 'activity' },
          { id: 'qu-referrals', label: 'Referrals & Escalations', route: '/quote-underwriting/referrals', icon: 'alert-triangle', badge: '3', badgeColor: 'warning' },
          { id: 'qu-approvals', label: 'Approvals', route: '/quote-underwriting/approvals', icon: 'check-square' },
          { id: 'qu-binding', label: 'Policy Binding', route: '/quote-underwriting/binding', icon: 'lock' }
        ]
      },
      {
        id: 'core-insurance',
        label: 'Core Insurance / PAS',
        icon: 'shield-check',
        permissions: ['POLICY_VIEW'],
        children: [
          { id: 'ci-policies', label: 'Policy 360', route: '/core-insurance/policies', icon: 'file-check' },
          { id: 'ci-issuance', label: 'Issuance', route: '/core-insurance/issuance', icon: 'send' },
          { id: 'ci-endorsements', label: 'Endorsements', route: '/core-insurance/endorsements', icon: 'edit' },
          { id: 'ci-cancellations', label: 'Cancellations', route: '/core-insurance/cancellation', icon: 'x-circle' },
          { id: 'ci-reinstatements', label: 'Reinstatements', route: '/core-insurance/reinstatement', icon: 'rotate-cw' },
          { id: 'ci-renewals', label: 'Renewals Pipeline', route: '/core-insurance/renewal', icon: 'refresh-cw' },
          { id: 'ci-servicing', label: 'Policy Servicing', route: '/core-insurance/policy-servicing', icon: 'tool' }
        ]
      },
      {
        id: 'claims',
        label: 'Claims Management',
        icon: 'briefcase',
        permissions: ['CLAIMS_VIEW'],
        children: [
          { id: 'cl-fnol', label: 'FNOL Intake', route: '/claims/fnol', icon: 'phone-incoming', badge: 'New', badgeColor: 'primary' },
          { id: 'cl-verification', label: 'Coverage Verification', route: '/claims/coverage-verification', icon: 'check-circle' },
          { id: 'cl-exposures', label: 'Exposures', route: '/claims/exposures', icon: 'crosshair' },
          { id: 'cl-reserves', label: 'Reserves', route: '/claims/reserves', icon: 'dollar-sign' },
          { id: 'cl-payments', label: 'Claim Payments', route: '/claims/payments', icon: 'credit-card' },
          { id: 'cl-recoveries', label: 'Subrogation & Salvage', route: '/claims/recoveries', icon: 'arrow-down-left' },
          { id: 'cl-vendors', label: 'Vendors & Experts', route: '/claims/vendors', icon: 'truck' },
          { id: 'cl-closure', label: 'Claim Closure', route: '/claims/closure', icon: 'archive' }
        ]
      }
    ]
  },
  {
    title: 'ENTERPRISE & FINANCE',
    items: [
      {
        id: 'finance',
        label: 'Finance & Billing',
        icon: 'wallet',
        permissions: ['FINANCE_VIEW'],
        children: [
          { id: 'fn-billing', label: 'Billing & Invoices', route: '/finance/billing', icon: 'receipt' },
          { id: 'fn-payments', label: 'Payments & Collections', route: '/finance/payments', icon: 'credit-card' },
          { id: 'fn-accounting', label: 'General Ledger', route: '/finance/accounting', icon: 'book-open' },
          { id: 'fn-commissions', label: 'Agent Commissions', route: '/finance/commissions', icon: 'percent' },
          { id: 'fn-reconciliation', label: 'Bank Reconciliation', route: '/finance/reconciliation', icon: 'layers' },
          { id: 'fn-reinsurance', label: 'Reinsurance Treaties', route: '/finance/reinsurance', icon: 'pie-chart' }
        ]
      },
      {
        id: 'documents',
        label: 'Documents & OCR',
        icon: 'file-stack',
        permissions: ['DOCUMENTS_VIEW'],
        children: [
          { id: 'doc-intake', label: 'Intake Inbox', route: '/documents/document-intake', icon: 'inbox' },
          { id: 'doc-ocr', label: 'OCR & AI Extraction', route: '/documents/ocr', icon: 'scan' },
          { id: 'doc-classification', label: 'Classification', route: '/documents/classification', icon: 'tag' },
          { id: 'doc-templates', label: 'Document Templates', route: '/documents/templates', icon: 'layout' },
          { id: 'doc-generation', label: 'Generation Queue', route: '/documents/generation', icon: 'printer' },
          { id: 'doc-esignature', label: 'E-Signatures', route: '/documents/e-signature', icon: 'pen-tool' },
          { id: 'doc-storage', label: 'Document Storage', route: '/documents/storage', icon: 'hard-drive' }
        ]
      },
      {
        id: 'communications',
        label: 'Communications',
        icon: 'message-square',
        children: [
          { id: 'comm-correspondence', label: 'Correspondence Hub', route: '/communications/correspondence', icon: 'mail' },
          { id: 'comm-notifications', label: 'Outbound Notifications', route: '/communications/notifications', icon: 'bell' },
          { id: 'comm-templates', label: 'Message Templates', route: '/communications/templates', icon: 'template' }
        ]
      },
      {
        id: 'marketplace',
        label: 'Marketplace & Portals',
        icon: 'globe',
        permissions: ['MARKETPLACE_VIEW'],
        children: [
          { id: 'mp-discovery', label: 'Product Discovery', route: '/marketplace/product-discovery', icon: 'compass' },
          { id: 'mp-compare', label: 'Compare Products', route: '/marketplace/comparison', icon: 'columns' },
          { id: 'mp-broker', label: 'Broker Portal', route: '/marketplace/broker-portal', icon: 'user-check' },
          { id: 'mp-mga', label: 'MGA Portal', route: '/marketplace/mga-portal', icon: 'briefcase' },
          { id: 'mp-carrier', label: 'Carrier Portal', route: '/marketplace/carrier-portal', icon: 'shield' },
          { id: 'mp-customer', label: 'Customer Portal', route: '/marketplace/customer-portal', icon: 'users' },
          { id: 'mp-journeys', label: 'Partner Journeys', route: '/marketplace/partner-journeys', icon: 'map-pin' }
        ]
      },
      {
        id: 'legal',
        label: 'Legal & Compliance',
        icon: 'scale',
        permissions: ['LEGAL_VIEW'],
        children: [
          { id: 'lg-products', label: 'Legal Products', route: '/legal/products', icon: 'award' },
          { id: 'lg-cases', label: 'Disputes & Cases', route: '/legal/cases', icon: 'folder' },
          { id: 'lg-docs', label: 'Regulatory Filings', route: '/legal/legal-documents', icon: 'file-text' }
        ]
      },
      {
        id: 'administration',
        label: 'Administration',
        icon: 'settings',
        permissions: ['ADMIN_USERS'],
        children: [
          { id: 'adm-users', label: 'User Directory', route: '/administration/users', icon: 'users' },
          { id: 'adm-roles', label: 'Roles & RBAC', route: '/administration/roles', icon: 'lock' },
          { id: 'adm-permissions', label: 'Permission Matrix', route: '/administration/permissions', icon: 'key' },
          { id: 'adm-organizations', label: 'Organizations & Tenants', route: '/administration/organizations', icon: 'building' },
          { id: 'adm-config', label: 'System Configuration', route: '/administration/configuration', icon: 'sliders' },
          { id: 'adm-audit', label: 'Audit Trail', route: '/administration/audit', icon: 'list' }
        ]
      },
      {
        id: 'notifications',
        label: 'Notification Center',
        route: '/notifications',
        icon: 'bell',
        badge: '8',
        badgeColor: 'danger'
      }
    ]
  }
];
