import { AnyAction } from 'redux';
import produce from 'immer';
import { Reducer } from 'redux';
import * as types from './constants';
import { State, Post, Comment } from './types';

const initialState: State = {
  posts: {},
  post: { _id: '', title: '', points: 0, source: '' },
  comments: {},
};

const posts = (state: any, action: AnyAction) => {
  switch (action.type) {
    case types.POSTS_SUCCESS:
      let newState = { ...state };
      action.payload.forEach((post: Post) => {
        newState[post._id] = post;
      });
      console.log(newState);

      return newState;
    case types.ADD_POST_SUCCESS:
    case types.UPDATE_POST_SUCCESS:
      return { ...state, [action.payload._id]: action.payload };
    case types.DELETE_POST_SUCCESS:
      delete state[action.payload];
      break;
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
    default:
      return state;
  }
};

const comments = (state: any, action: AnyAction) => {
  switch (action.type) {
    case types.COMMENTS_SUCCESS:
      let newState = { ...state };
      action.payload.forEach((comment: Comment) => {
        newState[comment._id] = comment;
      });
      return newState;
    case types.ADD_COMMENT_SUCCESS:
      return { ...state, [action.payload._id]: action.payload };
    case types.UPDATE_COMMENT_SUCCESS:
      return { ...state, [action.payload._id]: action.payload };
    case types.DELETE_COMMENT_SUCCESS:
      delete state[action.payload];
      break;
  }
};

const reducer: Reducer<State> = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.POSTS_SUCCESS:
        draft.posts = posts(state.posts, action);
        break;
      case types.POST_SUCCESS:
        draft.post = post(state.post, action);
        break;
      case types.ADD_POST_SUCCESS:
      case types.UPDATE_POST_SUCCESS:
      case types.DELETE_POST_SUCCESS:
        draft.posts = posts(state.posts, action);
        draft.post = post(state.post, action);
        break;
      case types.COMMENTS_SUCCESS:
      case types.ADD_COMMENT_SUCCESS:
      case types.UPDATE_COMMENT_SUCCESS:
      case types.DELETE_COMMENT_SUCCESS:
        draft.comments = comments(state.comments, action);
        break;
    }
  });

export default reducer;
