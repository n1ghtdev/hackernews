import produce from 'immer';
import * as types from './constants';
import { AnyAction } from 'redux';
import { Comment, Comments } from './types';

export default function reducer(state: Comments = {}, action: AnyAction) {
  return produce(state, draft => {
    switch (action.type) {
      case types.GET_COMMENTS_SUCCESS: {
        action.payload.forEach((comment: Comment) => {
          draft[comment._id] = comment;
        });
        break;
      }
      case types.ADD_COMMENT_SUCCESS: {
        if (action.payload.parent) {
          draft[action.payload.parent].children.push(action.payload._id);
        }
        draft[action.payload._id] = action.payload;
        break;
      }
    }
  });
}
