import { createReducer, on } from '@ngrx/store';
import { User } from '../../ui/interfaces/user.interface';
import * as UserActions from './user.actions';

export interface UserState {
  users: User[];
  error: string | null;
  loading: boolean;
}

export const initialState: UserState = {
  users: [],
  error: null,
  loading: false,
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.loadUsers, state => ({ ...state, loading: true })),
  on(UserActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    loading: false,
    users: users,
  })),
  on(UserActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),
  on(UserActions.addUser, (state, { user }) => ({
    ...state,
    users: [...state.users, user],
  })),
  on(UserActions.updateUser, (state, { user }) => ({
    ...state,
    users: state.users.map(u => (u.id === user.id ? user : u)),
  })),
  on(UserActions.deleteUser, (state, { id }) => ({
    ...state,
    users: state.users.filter(u => u.id !== id),
  }))
);
