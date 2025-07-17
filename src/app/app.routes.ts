import { Routes } from '@angular/router';
import { authenticationGuard } from './guards/authentication.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    canActivate: [authenticationGuard],
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  {
    path: 'reports',
    canActivate: [authenticationGuard],
    children: [
      {
        path: 'gcc',
        loadComponent: () =>
          import('./pages/reports/gcc-reports/gcc-reports.component').then(
            (m) => m.GCCReportsComponent
          ),
      },
      // {
      //   path: 'eab',
      //   loadComponent: () =>
      //     import('./pages/reports/eab-reports/eab-reports.component').then(
      //       (m) => m.EABReportsComponent
      //     ),
      // },
    ],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
