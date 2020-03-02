import { combineReducers } from 'redux';
import userReducer from './user/reducer';
import postsReducer from './posts/reducer';
import isFetchingReducer from './isFetching/reducer';
import errorHandlerReducer from './errorHandler/reducer';

const reducers = combineReducers({
  user: userReducer,
  news: postsReducer,
  isFetching: isFetchingReducer,
  errors: errorHandlerReducer,
});

export type RootState = ReturnType<typeof reducers>;
export default reducers;
