import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/user-profile', pathMatch: 'full' },
  {
    path: 'edit-profile',
    loadComponent: () =>
      import('./pages/user-profile-edit/user-profile-edit.component').then(
        c => c.UserProfileEditComponent
      ),
  },
  {
    path: 'user-profile',
    loadComponent: () =>
      import('./pages/user/user.component').then(c => c.UserComponent),
  },
];
