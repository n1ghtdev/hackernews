import React from 'react';
import { Route, Redirect, RouteComponentProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../modules/reducers';

type Props = {
  component: React.ElementType;
  [key: string]: any;
};

export default function PrivateRoute(props: Props) {
  const isSignedIn = useSelector((state: RootState) => state.user.isAuth);
  const { component: Component, ...rest } = props;

  return (
    <Route
      {...rest}
      render={(props: RouteComponentProps) =>
        isSignedIn ? <Component {...props} /> : <Redirect to="/auth" />
      }
    />
  );
}
