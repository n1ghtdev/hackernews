import { combineReducers } from 'redux';
import authReducer from './auth/reducer';
import usersReducer from './users/reducer';
import postsReducer from './posts/reducer';
import commentsReducer from './comments/reducer';
import isFetchingReducer from './isFetching/reducer';
import errorHandlerReducer from './errorHandler/reducer';

const reducers = combineReducers({
  auth: authReducer,
  users: usersReducer,
  posts: postsReducer,
  comments: commentsReducer,
  isFetching: isFetchingReducer,
  errors: errorHandlerReducer,
});

export type RootState = ReturnType<typeof reducers>;
export default reducers;
