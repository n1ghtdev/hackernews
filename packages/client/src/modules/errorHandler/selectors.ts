import { RootState } from '../reducers';

export const createErrorSelector = (actions: string[]) => (
  state: RootState,
) => {
  console.log(actions, state);

  const errors = actions.map((action: string) => state.errors[action]);
  if (errors && errors[0]) {
    return errors[0];
  }
  return '';
};
