import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'edit-profile',
    loadComponent: () =>
      import('./features/user-profile-edit/user-profile-edit.component').then(
        c => c.UserProfileEditComponent
      ),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then(
        c => c.DashboardComponent
      ),
  },
];
