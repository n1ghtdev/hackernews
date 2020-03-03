import produce from 'immer';
import * as types from './constants';
import { AnyAction } from 'redux';
import { User } from './types';

type UserList = {
  [key: string]: User;
};

const initialState = {
  // _id: '',
  // name: '',
  // email: '',
  // role: '',
  // postCount: 0,
  // commentCount: 0,
};

export default function reducer(
  state: UserList = initialState,
  action: AnyAction,
) {
  return produce(state, draft => {
    switch (action.type) {
      case types.USER_SUCCESS:
        draft[action.payload._id] = action.payload;
        break;
    }
  });
}
