import { AnyAction } from 'redux';

export default function reducer(state: any = {}, action: AnyAction) {
  const matches = /(.*)\/(request|failure)/.exec(action.type);

  if (!matches) {
    return state;
  }

  const [, requestName, requestState] = matches;

  return {
    ...state,
    [requestName]: requestState === 'failure' ? action.error.message : '',
  };
}
