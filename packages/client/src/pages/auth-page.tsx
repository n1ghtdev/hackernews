import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { signInRequest } from '../modules/user/actions';
import { signUpRequest } from '../modules/user/actions';
import { RootState } from '../modules/reducers';

import SignInForm from '../components/signin-form';
import SignUpForm from '../components/signup-form';
import { User } from '../modules/user/types';

export default function AuthPage() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user);
  const history = useHistory();

  if (currentUser.isAuth) {
    history.push('/');
  }

  return (
    <>
      <SignInForm
        onSubmit={(data: Partial<User>) => dispatch(signInRequest(data))}
      />
      <SignUpForm
        onSubmit={(data: Partial<User>) => dispatch(signUpRequest(data))}
      />
    </>
  );
}
