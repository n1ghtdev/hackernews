import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../reducers';
import * as types from './constants';
import { signIn, signUp, logout, verifyAuth } from '../../api';

export function signInRequest(
  user: any,
): ThunkAction<void, RootState, unknown, Action<string>> {
  return async dispatch => {
    dispatch({ type: types.SIGN_IN_REQUEST });

    signIn(user).then(
      (data: any) => {
        dispatch(signInSuccess(data));
      },
      (error: any) => {
        dispatch(signInFailure(error));
      },
    );
  };
}

export const signInSuccess = (payload: any) =>
  ({
    type: types.SIGN_IN_SUCCESS,
    payload,
  } as const);

export const signInFailure = (error: Error) =>
  ({
    type: types.SIGN_IN_FAILURE,
    error,
  } as const);

export function signUpRequest(
  user: any,
): ThunkAction<void, RootState, unknown, Action<string>> {
  return async dispatch => {
    dispatch({ type: types.SIGN_UP_REQUEST });

    signUp(user).then(
      (data: any) => {
        dispatch(signUpSuccess(data));
      },
      (error: any) => {
        dispatch(signUpFailure(error));
      },
    );
  };
}

export const signUpSuccess = (payload: any) =>
  ({
    type: types.SIGN_UP_SUCCESS,
    payload,
  } as const);

export const signUpFailure = (error: Error) =>
  ({
    type: types.SIGN_UP_FAILURE,
    error,
  } as const);

export function verifyRequest(): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> {
  return async dispatch => {
    dispatch({ type: types.VERIFY_REQUEST });

    verifyAuth().then(
      (data: any) => {
        dispatch(verifySuccess(data));
      },
      (error: any) => {
        dispatch(verifyFailure(error));
      },
    );
  };
}

export function verifySuccess(data: any) {
  return {
    type: types.VERIFY_SUCCESS,
    payload: data,
  } as const;
}

export function verifyFailure(error: Error) {
  return {
    type: types.VERIFY_FAILURE,
    error,
  } as const;
}

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
      (error: any) => {
        dispatch(logoutFailure(error));
      },
    );
  };
}

export function logoutSuccess() {
  return {
    type: types.LOGOUT_SUCCESS,
  } as const;
}

export function logoutFailure(error: Error) {
  return {
    type: types.LOGOUT_FAILURE,
    error,
  } as const;
}
