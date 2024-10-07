import { TestBed } from '@angular/core/testing';
import { NotificationService } from './notification.service';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('NotificationService', () => {
  let service: NotificationService;
  let snackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    const snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      providers: [
        NotificationService,
        { provide: MatSnackBar, useValue: snackBarSpy },
      ],
    });

    service = TestBed.inject(NotificationService);
    snackBar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open a success snackbar with correct message and options', () => {
    const message = 'Success!';
    const duration = 300099;

    service.showSuccess(message, duration);

    expect(snackBar.open).toHaveBeenCalledWith(message, 'Close', {
      duration,
      panelClass: ['success-snackbar', 'snackbar-position'],
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  });

  it('should open an error snackbar with correct message and options', () => {
    const message = 'Error!';
    const duration = 3000;

    service.showError(message, duration);

    expect(snackBar.open).toHaveBeenCalledWith(message, 'Close', {
      duration,
      panelClass: ['error-snackbar', 'snackbar-position'],
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  });
});
