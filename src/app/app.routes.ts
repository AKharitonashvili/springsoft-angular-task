import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/form-creation', pathMatch: 'full' },
  {
    path: 'form-creation',
    loadComponent: () =>
      import('./features/user-profile-edit/user-profile-edit.component').then(
        c => c.UserProfileEditComponent
      ),
  },
];
