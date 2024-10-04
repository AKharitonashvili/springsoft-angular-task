import { createReducer, on } from '@ngrx/store';
import { User } from '../../ui/interfaces/user.interface';
import * as UserActions from './user.actions';

export interface UserState {
  user?: User;
  error: string | null;
  loading: boolean;
  updateLoading?: boolean;
  updateError?: string | null;
}

export const initialState: UserState = {
  user: undefined,
  error: null,
  loading: false,
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.loadUser, state => ({ ...state, loading: true })),
  on(UserActions.loadUserSuccess, (state, { user }) => ({
    ...state,
    loading: false,
    user,
  })),
  on(UserActions.loadUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),

  on(UserActions.updateUser, (state, { user }) => ({
    ...state,
    user,
    updateLoading: true,
  })),
  on(UserActions.updateUserSuccess, (state, { user }) => ({
    ...state,
    user,
    updateLoading: false,
  })),
  on(UserActions.updateUserFailure, (state, { error }) => ({
    ...state,
    updateError: error,
    updateLoading: false,
  }))
);
