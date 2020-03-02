import { useSelector } from 'react-redux';
import { createErrorSelector } from '../modules/errorHandler/selectors';
import { RootState } from '../modules/reducers';

type Action = string[] | string;

export default function useErrors(action: Action): boolean {
  const errorHandler = createErrorSelector(
    Array.isArray(action) ? action : [action],
  );
  const errors = useSelector((state: RootState) => errorHandler(state));
  console.log(errors);

  return errors;
}
