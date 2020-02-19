import produce from 'immer';
import { Reducer } from 'redux';
import * as types from './constants';
import { State } from './types';

const initialState: State = {
  data: [],
  error: undefined,
};

const reducer: Reducer<State> = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.POSTS_REQUEST:
        draft.error = undefined;
        break;
      case types.POSTS_SUCCESS:
        draft.data = action.data;
        draft.error = undefined;
        break;
      case types.POSTS_FAILURE:
        draft.error = action.error;
        break;
      default:
        return state;
    }
  });

export default reducer;
