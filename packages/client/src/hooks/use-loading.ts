import { useSelector } from 'react-redux';
import { createLoadingSelector } from '../modules/isFetching/selectors';
import { RootState } from '../modules/reducers';

type Action = string[] | string;

export default function useLoading(action: Action): boolean {
  const loadingSelector = createLoadingSelector(
    Array.isArray(action) ? action : [action],
  );
  const isFetching = useSelector((state: RootState) => loadingSelector(state));

  return isFetching;
}
