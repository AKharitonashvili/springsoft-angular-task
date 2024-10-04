import { createReducer, on } from '@ngrx/store';
import { User } from '../../ui/interfaces/user.interface';
import * as UserActions from './user.actions';

export interface UserState {
  user?: User;
  error: string | null;
  loading: boolean;
}

export const initialState: UserState = {
  user: undefined,
  error: null,
  loading: false,
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.loadUser, UserActions.updateUser, state => ({
    ...state,
    loading: true,
  })),
  on(
    UserActions.loadUserSuccess,
    UserActions.updateUserSuccess,
    (state, { user }) => ({
      ...state,
      loading: false,
      user,
      error: null,
    })
  ),
  on(
    UserActions.loadUserFailure,
    UserActions.updateUserFailure,
    (state, { error }) => ({
      ...state,
      loading: false,
      error: error,
    })
  )
);
