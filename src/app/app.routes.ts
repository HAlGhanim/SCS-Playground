import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'reports/gcc',
    pathMatch: 'full',
  },
  {
    path: 'reports',
    children: [
      {
        path: '',
        redirectTo: 'gcc',
        pathMatch: 'full',
      },
      {
        path: 'gcc',
        loadComponent: () =>
          import('../app/pages/gcc-reports/gcc-reports.component').then(
            (m) => m.GCCReportsComponent
          ),
      },
      {
        path: 'eab',
        loadComponent: () =>
          import(
            '../app/pages/employees-abroad/employees-abroad.component'
          ).then((m) => m.EmployeesAbroadComponent),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'reports/gcc',
  },
];
