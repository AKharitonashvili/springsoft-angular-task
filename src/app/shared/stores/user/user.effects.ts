import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { UserService } from '../../services/user/user.service';
import * as UserActions from './user.actions';
import { NotificationService } from '../../services/notification/notification.service';

@Injectable()
export class UserEffects {
  readonly actions$ = inject(Actions);
  readonly userService = inject(UserService);
  readonly notificationService = inject(NotificationService);

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUser),
      mergeMap(() =>
        this.userService.getUser().pipe(
          map(user => UserActions.loadUserSuccess({ user })),
          catchError(error =>
            of(
              UserActions.loadUserFailure({
                error: 'Error: Please try again later',
              })
            )
          )
        )
      )
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUser),
      mergeMap(({ user }) =>
        this.userService.updateUser(user).pipe(
          map(user => UserActions.updateUserSuccess({ user })),
          tap(() =>
            this.notificationService.showSuccess('User information updated successfully')
          ),
          catchError(error =>
          {
            this.notificationService.showError('Error: Please try again')
            return of(
              UserActions.updateUserFailure({
                error: 'Error: Please try again later',
              })
            )
          }
          )
        )
      )
    )
  );
}
