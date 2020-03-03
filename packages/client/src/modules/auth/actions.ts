import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../reducers';
import * as types from './constants';
import { signIn, signUp, logout, verifyAuth } from '../../api';
import { AuthUser } from './types';

export function signInRequest(
  user: Partial<AuthUser>,
): ThunkAction<void, RootState, unknown, Action<string>> {
  return async dispatch => {
    dispatch({ type: types.SIGN_IN_REQUEST });

    signIn(user).then(
      (data: AuthUser) => {
        dispatch(signInSuccess(data));
      },
      (error: Error) => {
        dispatch(signInFailure(error));
      },
    );
  };
}

export const signInSuccess = (payload: AuthUser) => ({
  type: types.SIGN_IN_SUCCESS,
  payload,
});

export const signInFailure = (error: Error) => ({
  type: types.SIGN_IN_FAILURE,
  error,
});

export function signUpRequest(
  user: Partial<AuthUser>,
): ThunkAction<void, RootState, unknown, Action<string>> {
  return async dispatch => {
    dispatch({ type: types.SIGN_UP_REQUEST });

    signUp(user).then(
      (data: AuthUser) => {
        dispatch(signUpSuccess(data));
      },
      (error: Error) => {
        dispatch(signUpFailure(error));
      },
    );
  };
}

export const signUpSuccess = (payload: AuthUser) => ({
  type: types.SIGN_UP_SUCCESS,
  payload,
});

export const signUpFailure = (error: Error) => ({
  type: types.SIGN_UP_FAILURE,
  error,
});

export function verifyRequest(): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> {
  return async dispatch => {
    dispatch({ type: types.VERIFY_REQUEST });

    verifyAuth().then(
      (data: AuthUser) => {
        dispatch(verifySuccess(data));
      },
      (error: Error) => {
        dispatch(verifyFailure(error));
      },
    );
  };
}

export const verifySuccess = (data: AuthUser) => ({
  type: types.VERIFY_SUCCESS,
  payload: data,
});

export const verifyFailure = (error: Error) => ({
  type: types.VERIFY_FAILURE,
  error,
});

export function logoutRequest(): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> {
  return async dispatch => {
    logout().then(
      () => {
        dispatch(logoutSuccess());
      },
      (error: Error) => {
        dispatch(logoutFailure(error));
      },
    );
  };
}

export const logoutSuccess = () => ({
  type: types.LOGOUT_SUCCESS,
});

export const logoutFailure = (error: Error) => ({
  type: types.LOGOUT_FAILURE,
  error,
});
