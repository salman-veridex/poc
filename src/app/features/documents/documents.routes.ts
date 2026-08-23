import { Routes } from '@angular/router';

export const DOCUMENTS_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'document-intake',
    pathMatch: 'full'
  },
  {
    path: 'document-intake',
    data: { breadcrumb: 'Documents' },
    loadChildren: () =>
      import('./document-intake/document-intake.routes').then(m => m.DOCUMENT_INTAKE_ROUTES)
  },
  {
    path: 'ocr',
    data: { breadcrumb: 'Documents' },
    loadChildren: () =>
      import('./ocr/ocr.routes').then(m => m.OCR_ROUTES)
  },
  {
    path: 'classification',
    data: { breadcrumb: 'Documents' },
    loadChildren: () =>
      import('./classification/classification.routes').then(m => m.CLASSIFICATION_ROUTES)
  },
  {
    path: 'templates',
    data: { breadcrumb: 'Documents' },
    loadChildren: () =>
      import('./templates/templates.routes').then(m => m.TEMPLATES_ROUTES)
  },
  {
    path: 'generation',
    data: { breadcrumb: 'Documents' },
    loadChildren: () =>
      import('./generation/generation.routes').then(m => m.GENERATION_ROUTES)
  },
  {
    path: 'e-signature',
    data: { breadcrumb: 'Documents' },
    loadChildren: () =>
      import('./e-signature/e-signature.routes').then(m => m.E_SIGNATURE_ROUTES)
  },
  {
    path: 'storage',
    data: { breadcrumb: 'Documents' },
    loadChildren: () =>
      import('./storage/storage.routes').then(m => m.STORAGE_ROUTES)
  }
];
