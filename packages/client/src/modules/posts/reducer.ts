import { AnyAction } from 'redux';
import produce from 'immer';
import * as types from './constants';
import { State, Post, Comment } from './types';

const initialState: State = {
  posts: {},
  post: null,
};

const posts = (state: any, action: AnyAction) => {
  switch (action.type) {
    case types.POSTS_SUCCESS:
      let newState = { ...state };
      action.payload.forEach((post: Post) => {
        newState[post._id] = post;
      });

      return newState;
    case types.ADD_POST_SUCCESS:
    case types.UPDATE_POST_SUCCESS:
      return { ...state, [action.payload._id]: action.payload };
    case types.DELETE_POST_SUCCESS:
      delete state[action.payload];
      break;
    case types.ADD_COMMENT_SUCCESS:
      const { post } = action.payload;
      return {
        ...state,
        [post]: {
          ...state[post],
          comments: [...state[post].comments, action.payload._id],
        },
      };
    case types.DELETE_COMMENT_SUCCESS: {
      const { post, _id } = action.payload;
      const filteredComments = state[post].comments.filter(
        (comment: Comment) => comment._id !== _id,
      );
      return {
        ...state,
        [post]: { ...state[post], comments: filteredComments },
      };
    }
    default:
      return state;
  }
};

const post = (state: any, action: AnyAction) => {
  switch (action.type) {
    case types.POST_SUCCESS:
    case types.ADD_POST_SUCCESS:
    case types.UPDATE_POST_SUCCESS:
      return action.payload;
    case types.DELETE_POST_SUCCESS:
      if (action.payload === state._id) {
        return {};
      }
      return state;
    case types.ADD_COMMENT_SUCCESS: {
      return { ...state, comments: [...state.comments, action.payload] };
    }
    case types.UPDATE_COMMENT_SUCCESS: {
      return { ...state, comments: [...state.comments, action.payload] };
    }
    case types.DELETE_COMMENT_SUCCESS: {
      const filteredComments = state.comments.filter(
        (comment: Comment) => comment._id !== action.payload._id,
      );
      return { ...state, comments: filteredComments };
    }
    default:
      return state;
  }
};

const reducer = (state: State = initialState, action: AnyAction) =>
  produce(state, draft => {
    switch (action.type) {
      case types.POSTS_SUCCESS:
        draft.posts = posts(state.posts, action);
        break;
      case types.POST_SUCCESS:
      case types.UPDATE_COMMENT_SUCCESS:
        draft.post = post(state.post, action);
        break;
      case types.ADD_POST_SUCCESS:
      case types.UPDATE_POST_SUCCESS:
      case types.DELETE_POST_SUCCESS:
      case types.ADD_COMMENT_SUCCESS:
      case types.DELETE_COMMENT_SUCCESS:
        draft.posts = posts(state.posts, action);
        draft.post = post(state.post, action);
        break;
    }
  });

export default reducer;
