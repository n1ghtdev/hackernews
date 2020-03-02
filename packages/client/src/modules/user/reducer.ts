import produce from 'immer';
import { Reducer } from 'redux';
import * as types from './constants';
import { ActionType } from './actions';
import { State, User } from './types';

const initialState: State = {
  user: {} as User,
  accessToken: '',
  isAuth: false,
};

const reducer: Reducer<State> = (state = initialState, action: ActionType) =>
  produce(state, draft => {
    switch (action.type) {
      case types.SIGN_IN_SUCCESS:
      case types.SIGN_UP_SUCCESS:
      case types.VERIFY_SUCCESS:
        draft.user = action.payload.user;
        draft.accessToken = action.payload.accessToken;
        draft.isAuth = true;
        break;
      case types.LOGOUT_SUCCESS:
        draft.user = {} as User;
        draft.accessToken = '';
        draft.isAuth = false;
        break;
      default:
        return state;
    }
  });

export default reducer;
