export const createLoadingSelector = (actions: any) => (state: any) => {
  return actions.some((action: string) => state.isFetching[action]);
};
