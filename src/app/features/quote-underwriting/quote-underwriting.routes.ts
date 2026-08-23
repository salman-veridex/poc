import { Routes } from '@angular/router';

export const QUOTE_UNDERWRITING_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'submissions',
    pathMatch: 'full'
  },
  {
    path: 'submissions',
    data: { breadcrumb: 'Quote & UW' },
    loadChildren: () =>
      import('./submissions/submissions.routes').then(m => m.SUBMISSIONS_ROUTES)
  },
  {
    path: 'quotes',
    data: { breadcrumb: 'Quote & UW' },
    loadChildren: () =>
      import('./quotes/quotes.routes').then(m => m.QUOTES_ROUTES)
  },
  {
    path: 'underwriting',
    data: { breadcrumb: 'Quote & UW' },
    loadChildren: () =>
      import('./underwriting/underwriting.routes').then(m => m.UNDERWRITING_ROUTES)
  },
  {
    path: 'referrals',
    data: { breadcrumb: 'Quote & UW' },
    loadChildren: () =>
      import('./referrals/referrals.routes').then(m => m.REFERRALS_ROUTES)
  },
  {
    path: 'approvals',
    data: { breadcrumb: 'Quote & UW' },
    loadChildren: () =>
      import('./approvals/approvals.routes').then(m => m.APPROVALS_ROUTES)
  },
  {
    path: 'binding',
    data: { breadcrumb: 'Quote & UW' },
    loadChildren: () =>
      import('./binding/binding.routes').then(m => m.BINDING_ROUTES)
  }
];
