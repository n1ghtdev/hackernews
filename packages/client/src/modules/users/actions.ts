import * as types from './constants';
import { getUser } from '../../api';
import { RootState } from '../reducers';
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { User } from './types';

export function userRequest(
  id: string,
): ThunkAction<void, RootState, unknown, Action<string>> {
  return async dispatch => {
    dispatch({ type: types.USER_REQUEST });

    getUser(id).then(
      (data: User) => {
        dispatch(userSuccess(data));
      },
      (error: Error) => {
        dispatch(userFailure(error));
      },
    );
  };
}

export const userSuccess = (payload: User) => ({
  type: types.USER_SUCCESS,
  payload,
});

export const userFailure = (error: Error) => ({
  type: types.USER_FAILURE,
  error,
});
