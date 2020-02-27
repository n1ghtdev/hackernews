import { Post, Comment } from './types';
import * as types from './constants';
import { getPosts, getPost, addPost, addComment } from '../../api';
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

export function addCommentRequest(
  comment: Partial<Comment>,
): ThunkAction<void, RootState, unknown, Action<string>> {
  return async dispatch => {
    dispatch({ type: types.ADD_COMMENT_REQUEST });
    try {
      const data = await addComment(comment);
      dispatch(addCommentSuccess(data));
    } catch (err) {
      dispatch(addCommentFailure(err.message));
    }
  };
}

export const addCommentSuccess = (payload: Comment) => ({
  type: types.ADD_COMMENT_SUCCESS,
  payload,
});

export const addCommentFailure = (error: string) => ({
  type: types.ADD_COMMENT_FAILURE,
  error,
});
