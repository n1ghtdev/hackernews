import produce from 'immer';
import { AnyAction } from 'redux';
import * as types from './constants';
import { State, User } from './types';

const initialState: State = {
  user: {} as User,
  accessToken: '',
  isAuth: false,
  verified: false,
};

const reducer = (state: State = initialState, action: AnyAction) =>
  produce(state, draft => {
    switch (action.type) {
      case types.SIGN_IN_SUCCESS:
      case types.SIGN_UP_SUCCESS:
        draft.user = action.payload.user;
        draft.accessToken = action.payload.accessToken;
        draft.isAuth = true;
        break;
      case types.LOGOUT_SUCCESS:
        draft.user = {} as User;
        draft.accessToken = '';
        draft.isAuth = false;
        break;
      case types.VERIFY_REQUEST:
        draft.verified = false;
        break;
      case types.VERIFY_SUCCESS:
        draft.user = action.payload.user;
        draft.accessToken = action.payload.accessToken;
        draft.isAuth = true;
        draft.verified = true;
        break;
      case types.VERIFY_FAILURE:
        draft.verified = true;
        break;
      default:
        return state;
    }
  });

export default reducer;
