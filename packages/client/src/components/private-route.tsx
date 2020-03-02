import React from 'react';
import {
  Route,
  Redirect,
  RouteComponentProps,
  RouteProps,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../modules/reducers';
import useLoading from '../hooks/use-loading';

type Props = {
  component: React.ComponentType<RouteComponentProps>;
} & RouteProps;

export default function PrivateRoute(props: Props) {
  const [isSignedIn, isVerified] = useSelector((state: RootState) => [
    state.user.isAuth,
    state.user.verified,
  ]);
  const isLoading = useLoading('verify');

  const { component: Component, ...rest } = props;

  if (isLoading || !isVerified) {
    return null;
  }

  return (
    <Route
      {...rest}
      render={componentProps =>
        isSignedIn ? <Component {...componentProps} /> : <Redirect to="/auth" />
      }
    />
  );
}
