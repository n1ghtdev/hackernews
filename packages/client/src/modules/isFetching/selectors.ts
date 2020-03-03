export const createLoadingSelector = (actions: string[]) => (state: any) => {
  return actions.some((action: string) => state.isFetching[action]);
};
