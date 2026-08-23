import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';
import { AppLayoutComponent } from './core/layout/app-layout/app-layout.component';
import { AuthLayoutComponent } from './core/layout/auth-layout/auth-layout.component';

export const routes: Routes = [
  // Public Auth Routes (Auth Layout)
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },

  // Authenticated Enterprise Business Domains (App Shell Layout)
  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./features/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES)
      },
      {
        path: 'product-studio',
        loadChildren: () => import('./features/product-studio/product-studio.routes').then(m => m.PRODUCT_STUDIO_ROUTES)
      },
      {
        path: 'quote-underwriting',
        loadChildren: () => import('./features/quote-underwriting/quote-underwriting.routes').then(m => m.QUOTE_UNDERWRITING_ROUTES)
      },
      {
        path: 'core-insurance',
        loadChildren: () => import('./features/core-insurance/core-insurance.routes').then(m => m.CORE_INSURANCE_ROUTES)
      },
      {
        path: 'finance',
        loadChildren: () => import('./features/finance/finance.routes').then(m => m.FINANCE_ROUTES)
      },
      {
        path: 'documents',
        loadChildren: () => import('./features/documents/documents.routes').then(m => m.DOCUMENTS_ROUTES)
      },
      {
        path: 'communications',
        loadChildren: () => import('./features/communications/communications.routes').then(m => m.COMMUNICATIONS_ROUTES)
      },
      {
        path: 'marketplace',
        loadChildren: () => import('./features/marketplace/marketplace.routes').then(m => m.MARKETPLACE_ROUTES)
      },
      {
        path: 'claims',
        loadChildren: () => import('./features/claims/claims.routes').then(m => m.CLAIMS_ROUTES)
      },
      {
        path: 'legal',
        loadChildren: () => import('./features/legal/legal.routes').then(m => m.LEGAL_ROUTES)
      },
      {
        path: 'administration',
        loadChildren: () => import('./features/administration/administration.routes').then(m => m.ADMINISTRATION_ROUTES)
      },
      {
        path: 'notifications',
        loadChildren: () => import('./features/notifications/notifications.routes').then(m => m.NOTIFICATIONS_ROUTES)
      }
    ]
  },

  // Fallback Wildcard
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
