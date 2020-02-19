import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './modules/reducers';

export const store = createStore(reducers, applyMiddleware(thunk));
