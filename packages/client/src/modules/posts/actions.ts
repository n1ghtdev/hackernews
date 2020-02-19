// import { action } from 'typesafe-actions';
import { Post } from './types';
import * as types from './constants';
import { getPosts } from '../../api';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../reducers';

export function postsRequest(): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> {
  return async dispatch => {
    dispatch({ type: types.POSTS_REQUEST });
    try {
      const data = await getPosts();
      dispatch(postsSuccess(data as Post[]));
    } catch (err) {
      dispatch(postsFailure(err.message));
    }
  };
}

export const postsSuccess = (data: Post[]) =>
  ({
    type: types.POSTS_SUCCESS,
    data,
  } as const);

export const postsFailure = (error: string) =>
  ({
    type: types.POSTS_FAILURE,
    error,
  } as const);
