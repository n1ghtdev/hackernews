import { combineReducers } from 'redux';
import userReducer from './user/reducer';
import postsReducer from './posts/reducer';
import isFetchingReducer from './isFetching/reducer';

const reducers = combineReducers({
  user: userReducer,
  posts: postsReducer,
  isFetching: isFetchingReducer,
});

export type RootState = ReturnType<typeof reducers>;
export default reducers;
