import * as types from './constants';
import { State } from './types';

export function saveUser(payload: State) {
  return {
    type: types.USER_SAVE,
    payload,
  } as const;
}

export function removeUser() {
  return {
    type: types.USER_REMOVE,
  } as const;
}

export type Action = ReturnType<typeof saveUser | typeof removeUser>;
