import { Post } from './types';
import * as types from './constants';
import { getPosts, getPost, addPost, getComments } from '../../api';
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
      dispatch(postsSuccess(data));
    } catch (err) {
      dispatch(postsFailure(err.message));
    }
  };
}

export const postsSuccess = (payload: Post[]) =>
  ({
    type: types.POSTS_SUCCESS,
    payload,
  } as const);

export const postsFailure = (error: string) =>
  ({
    type: types.POSTS_FAILURE,
    error,
  } as const);

export function postRequest(
  id: string,
): ThunkAction<void, RootState, unknown, Action<string>> {
  return async dispatch => {
    dispatch({ type: types.POST_REQUEST });
    try {
      const data = await getPost(id);
      dispatch(postSuccess(data));
    } catch (err) {
      dispatch(postFailure(err.message));
    }
  };
}
export const postSuccess = (payload: Post) => ({
  type: types.POST_SUCCESS,
  payload,
});

export const postFailure = (error: string) => ({
  type: types.POST_FAILURE,
  error,
});

export function addPostRequest(
  payload: Post,
): ThunkAction<void, RootState, unknown, Action<string>> {
  return async dispatch => {
    dispatch({ type: types.ADD_POST_REQUEST });
    try {
      const data = await addPost(payload);
      dispatch(addPostSuccess(data));
    } catch (err) {
      dispatch(addPostFailure(err.message));
    }
  };
}

export const addPostSuccess = (payload: any) => ({
  type: types.ADD_POST_SUCCESS,
  payload,
});

export const addPostFailure = (error: string) => ({
  type: types.ADD_POST_FAILURE,
  error,
});

export function getCommentsByPostId(
  id: string,
): ThunkAction<void, RootState, unknown, Action<string>> {
  return async dispatch => {
    dispatch({ type: types.COMMENTS_REQUEST });
    try {
      const data = await getComments(id);
      dispatch(addPostSuccess(data));
    } catch (err) {
      dispatch(addPostFailure(err.message));
    }
  };
}

export const commentsSuccess = (payload: any) => ({
  type: types.COMMENTS_SUCCESS,
  payload,
});

export const commentsFailure = (error: string) => ({
  type: types.COMMENTS_FAILURE,
  error,
});
