export const createErrorSelector = (actions: any) => (state: any) => {
  const errors = actions.map((action: any) => state.error[action]);
  if (errors && errors[0]) {
    return errors[0];
  }
  return '';
};
