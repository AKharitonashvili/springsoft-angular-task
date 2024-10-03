import { createAction, props } from '@ngrx/store';
import { User } from '../../ui/interfaces/user.interface';

export const loadUser = createAction('[User] Load User');

export const loadUserSuccess = createAction(
  '[User] Load User Success',
  props<{ user: User }>()
);

export const loadUserFailure = createAction(
  '[User] Load User Failure',
  props<{ error: string }>()
);

export const updateUser = createAction(
  '[User] Update User',
  props<{ user: User }>()
);

export const deleteUser = createAction(
  '[User] Delete User',
  props<{ id: string }>()
);
