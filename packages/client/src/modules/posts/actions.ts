import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { Post } from './types';
import * as types from './constants';
import { getPosts, getPost, addPost } from '../../api';
import { RootState } from '../reducers';

export function postsRequest(): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> {
  return async dispatch => {
    dispatch({ type: types.POSTS_REQUEST });

    getPosts().then(
      (data: Post[]) => {
        dispatch(postsSuccess(data));
      },
      (error: Error) => {
        dispatch(postsFailure(error));
      },
    );
  };
}

export const postsSuccess = (payload: Post[]) =>
  ({
    type: types.POSTS_SUCCESS,
    payload,
  } as const);

export const postsFailure = (error: Error) =>
  ({
    type: types.POSTS_FAILURE,
    error,
  } as const);

export function postRequest(
  id: string,
): ThunkAction<void, RootState, unknown, Action<string>> {
  return async dispatch => {
    dispatch({ type: types.POST_REQUEST });

    getPost(id).then(
      (data: Post) => {
        dispatch(postSuccess(data));
      },
      (error: Error) => {
        dispatch(postFailure(error));
      },
    );
  };
}
export const postSuccess = (payload: Post) => ({
  type: types.POST_SUCCESS,
  payload,
});

export const postFailure = (error: Error) => ({
  type: types.POST_FAILURE,
  error,
});

export function addPostRequest(
  post: Partial<Post>,
): ThunkAction<void, RootState, unknown, Action<string>> {
  return async (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: types.ADD_POST_REQUEST });

    addPost(post, accessToken).then(
      (data: Post) => {
        dispatch(addPostSuccess(data));
      },
      (error: Error) => {
        dispatch(addPostFailure(error));
      },
    );
  };
}

export const addPostSuccess = (payload: Post) => ({
  type: types.ADD_POST_SUCCESS,
  payload,
});

export const addPostFailure = (error: Error) => ({
  type: types.ADD_POST_FAILURE,
  error,
});
