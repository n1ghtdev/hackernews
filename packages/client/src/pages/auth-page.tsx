import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { signInRequest } from '../modules/auth/actions';
import { signUpRequest } from '../modules/auth/actions';
import { RootState } from '../modules/reducers';

import SignInForm from '../components/signin-form';
import SignUpForm from '../components/signup-form';
import { AuthUser } from '../modules/auth/types';

export default function AuthPage() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.auth);
  const history = useHistory();

  if (currentUser.isAuth) {
    history.push('/');
  }

  return (
    <>
      <SignInForm
        onSubmit={(data: Partial<AuthUser>) => dispatch(signInRequest(data))}
      />
      <SignUpForm
        onSubmit={(data: Partial<AuthUser>) => dispatch(signUpRequest(data))}
      />
    </>
  );
}
