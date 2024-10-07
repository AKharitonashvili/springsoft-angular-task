import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { UserEffects } from './user.effects';
import * as UserActions from './user.actions';
import { UserService } from '../../services/user/user.service';
import { NotificationService } from '../../services/notification/notification.service';
import { provideMockStore } from '@ngrx/store/testing';
import { Actions } from '@ngrx/effects';
import { User } from '../../ui/interfaces/user.interface';

describe('UserEffects', () => {
  let actions$: Observable<any>;
  let effects: UserEffects;
  let userService: jasmine.SpyObj<UserService>;
  let notificationService: jasmine.SpyObj<NotificationService>;

  const mockUser: User = {
    id: '1',
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@example.com',
    phoneNumber: '1234567890',
    profilePicture: new File([''], 'profile.png', { type: 'image/png' }),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserEffects,
        provideMockActions(() => actions$),
        provideMockStore(),
        {
          provide: UserService,
          useValue: jasmine.createSpyObj('UserService', [
            'getUser',
            'updateUser',
          ]),
        },
        {
          provide: NotificationService,
          useValue: jasmine.createSpyObj('NotificationService', [
            'showSuccess',
            'showError',
          ]),
        },
      ],
    });

    effects = TestBed.inject(UserEffects);
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    notificationService = TestBed.inject(
      NotificationService
    ) as jasmine.SpyObj<NotificationService>;
  });

  // Test if correct notifications are being called on success and error
  describe('updateUser$', () => {
    it('should dispatch updateUserSuccess and call showSuccess on successful update', () => {
      const action = UserActions.updateUser({ user: mockUser });
      const outcome = UserActions.updateUserSuccess({ user: mockUser });

      actions$ = of(action);
      userService.updateUser.and.returnValue(of(mockUser));

      effects.updateUser$.subscribe(result => {
        expect(result).toEqual(outcome);
        expect(notificationService.showSuccess).toHaveBeenCalledWith(
          'User information updated successfully'
        );
      });
    });

    it('should dispatch updateUserFailure and call showError on failed update', () => {
      const action = UserActions.updateUser({ user: mockUser });
      const errorMessage = 'Error: Please try again later';
      const outcome = UserActions.updateUserFailure({ error: errorMessage });

      actions$ = of(action);
      userService.updateUser.and.returnValue(
        throwError(() => new Error('Update failed'))
      );

      effects.updateUser$.subscribe(result => {
        expect(result).toEqual(outcome);
        expect(notificationService.showError).toHaveBeenCalledWith(
          'Error: Please try again'
        );
      });
    });
  });

  describe('loadUser$', () => {
    it('should dispatch loadUserSuccess on successful user load', () => {
      const action = UserActions.loadUser();
      const outcome = UserActions.loadUserSuccess({ user: mockUser });

      actions$ = of(action);
      userService.getUser.and.returnValue(of(mockUser));

      effects.loadUser$.subscribe(result => {
        expect(result).toEqual(outcome);
      });
    });

    it('should dispatch loadUserFailure on failed user load', () => {
      const action = UserActions.loadUser();
      const errorMessage = 'Error: Please try again later';
      const outcome = UserActions.loadUserFailure({ error: errorMessage });

      actions$ = of(action);
      userService.getUser.and.returnValue(
        throwError(() => new Error('Load failed'))
      );

      effects.loadUser$.subscribe(result => {
        expect(result).toEqual(outcome);
      });
    });
  });
});
