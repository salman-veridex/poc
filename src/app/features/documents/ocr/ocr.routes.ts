import { Routes } from '@angular/router';

export const OCR_ROUTES: Routes = [
  {
    path: '',
    title: 'OCR & Extraction | Veridex Documents',
    data: { breadcrumb: 'OCR' },
    loadComponent: () =>
      import('./pages/ocr.page').then(m => m.OcrPage)
  }
];
