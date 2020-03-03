import { combineReducers } from 'redux';
import authReducer from './auth/reducer';
import postsReducer from './posts/reducer';
import isFetchingReducer from './isFetching/reducer';
import errorHandlerReducer from './errorHandler/reducer';

const reducers = combineReducers({
  auth: authReducer,
  news: postsReducer,
  isFetching: isFetchingReducer,
  errors: errorHandlerReducer,
});

export type RootState = ReturnType<typeof reducers>;
export default reducers;
