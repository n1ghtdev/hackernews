import { RootState } from '../reducers';

export const createLoadingSelector = (actions: string[]) => (
  state: RootState,
) => {
  return actions.some((action: string) => state.isFetching[action]);
};
