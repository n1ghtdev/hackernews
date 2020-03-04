import { AnyAction } from 'redux';
import produce from 'immer';
import * as types from './constants';
import { PostList, Post } from './types';

const initialState: PostList = {};

const posts = (state: any, action: AnyAction) => {
  switch (action.type) {
    case types.POSTS_SUCCESS:
      let newState = { ...state };
      action.payload.forEach((post: Post) => {
        newState[post._id] = post;
      });

      return newState;
    case types.POST_SUCCESS: {
      return { ...state, [action.payload._id]: action.payload };
    }
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

const reducer = (state: PostList = initialState, action: AnyAction) =>
  produce(state, draft => {
    switch (action.type) {
      case types.POSTS_SUCCESS:
      case types.POST_SUCCESS:
      case types.ADD_POST_SUCCESS:
      case types.UPDATE_POST_SUCCESS:
      case types.DELETE_POST_SUCCESS:
        return posts(state, action);
    }
  });

export default reducer;
