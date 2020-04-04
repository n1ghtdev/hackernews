import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { addComment, getComments, editComment, deleteComment } from '../../api';
import * as types from './constants';
import { RootState } from '../reducers';
import { Comment } from './types';

export function commentsRequest(
  postId: string,
): ThunkAction<void, RootState, unknown, Action<string>> {
  return async dispatch => {
    dispatch({ type: types.GET_COMMENTS_REQUEST });

    getComments(postId).then(
      (data: Comment[]) => {
        dispatch(commentsSuccess(data));
      },
      (error: Error) => {
        dispatch(commentsFailure(error));
      },
    );
  };
}

export const commentsSuccess = (payload: Comment[]) => ({
  type: types.GET_COMMENTS_SUCCESS,
  payload,
});

export const commentsFailure = (error: Error) => ({
  type: types.GET_COMMENTS_FAILURE,
  error,
});

export function addCommentRequest(
  comment: Partial<Comment>,
): ThunkAction<void, RootState, unknown, Action<string>> {
  return async (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: types.ADD_COMMENT_REQUEST });

    addComment(comment, accessToken).then(
      (data: Comment) => {
        dispatch(addCommentSuccess(data));
      },
      (error: Error) => {
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

export function editCommentRequest(
  comment: Partial<Comment>,
): ThunkAction<void, RootState, unknown, Action<string>> {
  return async (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: types.UPDATE_COMMENT_REQUEST });

    editComment(comment, accessToken).then(
      (data: Comment) => {
        dispatch(editCommentSuccess(data));
      },
      (error: Error) => {
        dispatch(editCommentFailure(error));
      },
    );
  };
}

export const editCommentSuccess = (payload: Comment) => ({
  type: types.UPDATE_COMMENT_SUCCESS,
  payload,
});

export const editCommentFailure = (error: Error) => ({
  type: types.UPDATE_COMMENT_FAILURE,
  error,
});

export function deleteCommentRequest(
  id: string,
): ThunkAction<void, RootState, unknown, Action<string>> {
  return async (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: types.DELETE_COMMENT_REQUEST });

    deleteComment(id, accessToken).then(
      (data: any) => {
        dispatch(deleteCommentSuccess(data));
      },
      (error: Error) => {
        dispatch(deleteCommentFailure(error));
      },
    );
  };
}

export const deleteCommentSuccess = (payload: Comment) => ({
  type: types.DELETE_COMMENT_SUCCESS,
  payload,
});

export const deleteCommentFailure = (error: Error) => ({
  type: types.DELETE_COMMENT_FAILURE,
  error,
});
