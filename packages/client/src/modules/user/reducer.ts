import produce from 'immer';
import * as types from './constants';
import { Action } from './actions';
import { State, User } from './types';
import { Reducer } from 'redux';

const initialState: State = {
  user: {} as User,
  token: '',
  isAuth: false,
};

const reducer: Reducer<State> = (state = initialState, action: Action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.USER_SAVE:
        draft.user = action.payload.user;
        draft.token = action.payload.token;
        draft.isAuth = true;
        break;
      case types.USER_REMOVE:
        draft.user = {} as User;
        draft.token = '';
        draft.isAuth = false;
        break;
      default:
        return state;
    }
  });

export default reducer;
