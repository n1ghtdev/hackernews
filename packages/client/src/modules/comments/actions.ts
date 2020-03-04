import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { addComment, getComments } from '../../api';
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
