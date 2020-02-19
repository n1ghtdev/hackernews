export default function reducer(state = {}, action: any) {
  const matches = /(.*)\/(request|success|failure)/.exec(action.type);

  if (!matches) return state;

  const [, requestName, requestState] = matches;

  return {
    ...state,
    [requestName]: requestState === 'request',
  };
}
