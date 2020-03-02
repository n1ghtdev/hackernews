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

    getPosts().then(
      (data: any) => {
        dispatch(postsSuccess(data));
      },
      (error: any) => {
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
      (data: any) => {
        dispatch(postSuccess(data));
      },
      (error: any) => {
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
    const accessToken = getState().user.accessToken;

    dispatch({ type: types.ADD_POST_REQUEST });

    addPost(post, accessToken).then(
      (data: any) => {
        dispatch(addPostSuccess(data));
      },
      (error: any) => {
        dispatch(addPostFailure(error));
      },
    );
  };
}

export const addPostSuccess = (payload: any) => ({
  type: types.ADD_POST_SUCCESS,
  payload,
});

export const addPostFailure = (error: Error) => ({
  type: types.ADD_POST_FAILURE,
  error,
});

export function addCommentRequest(
  comment: Partial<Comment>,
): ThunkAction<void, RootState, unknown, Action<string>> {
  return async (dispatch, getState) => {
    const accessToken = getState().user.accessToken;

    dispatch({ type: types.ADD_COMMENT_REQUEST });

    addComment(comment, accessToken).then(
      (data: any) => {
        dispatch(addCommentSuccess(data));
      },
      (error: any) => {
        dispatch(addCommentFailure(error));
      },
    );
  };
}

export const addCommentSuccess = (payload: Comment) => ({
  type: types.ADD_COMMENT_SUCCESS,
  payload,
});

export const addCommentFailure = (error: Error) => ({
  type: types.ADD_COMMENT_FAILURE,
  error,
});
