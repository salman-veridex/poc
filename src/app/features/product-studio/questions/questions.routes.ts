import { Routes } from '@angular/router';

export const QUESTIONS_ROUTES: Routes = [
  {
    path: '',
    title: 'Questions Matrix | Veridex Product Studio',
    data: { breadcrumb: 'Questions' },
    loadComponent: () =>
      import('./pages/questions.page').then(m => m.QuestionsPage)
  }
];
