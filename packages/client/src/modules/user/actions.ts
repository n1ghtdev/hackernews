import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../reducers';
import * as types from './constants';
import { signIn, signUp, clearUser } from '../../api';

export function signInRequest(
  user: any,
): ThunkAction<void, RootState, unknown, Action<string>> {
  return async dispatch => {
    dispatch({ type: types.SIGN_IN_REQUEST });
    try {
      const data = await signIn(user);
      dispatch(signInSuccess(data));
    } catch (err) {
      dispatch(signInFailure(err.message));
    }
  };
}

export const signInSuccess = (payload: any) =>
  ({
    type: types.SIGN_IN_SUCCESS,
    payload,
  } as const);

export const signInFailure = (error: string) =>
  ({
    type: types.SIGN_IN_FAILURE,
    error,
  } as const);

export function signUpRequest(
  user: any,
): ThunkAction<void, RootState, unknown, Action<string>> {
  return async dispatch => {
    dispatch({ type: types.SIGN_UP_REQUEST });
    try {
      const data = await signUp(user);
      dispatch(signUpSuccess(data));
    } catch (err) {
      dispatch(signUpFailure(err.message));
    }
  };
}

export const signUpSuccess = (payload: any) =>
  ({
    type: types.SIGN_UP_SUCCESS,
    payload,
  } as const);

export const signUpFailure = (error: string) =>
  ({
    type: types.SIGN_UP_FAILURE,
    error,
  } as const);

export function logoutAction(): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> {
  return dispatch => {
    clearUser();
    dispatch({ type: types.LOGOUT });
  };
}

export function logout() {
  return {
    type: types.LOGOUT,
  } as const;
}

export type ActionType = ReturnType<
  typeof signInSuccess | typeof signUpSuccess | typeof logout
>;
