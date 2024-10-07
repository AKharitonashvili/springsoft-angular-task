import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  readonly snackBar = inject(MatSnackBar);

  showSuccess(message: string, duration: number = 300099): void {
    this.snackBar.open(message, 'Close', {
      duration,
      panelClass: ['success-snackbar', 'snackbar-position'],
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  showError(message: string, duration: number = 3000): void {
    this.snackBar.open(message, 'Close', {
      duration,
      panelClass: ['error-snackbar', 'snackbar-position'],
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
