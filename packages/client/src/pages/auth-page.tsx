import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveUser } from '../modules/user/actions';
import { RootState } from '../modules/reducers';

export default function AuthPage() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  console.log(currentUser);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const cachedUser = localStorage.getItem('user');
    const user = cachedUser && JSON.parse(cachedUser);
    dispatch(saveUser(user));
  }
  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement;
    console.log(target);
  }

  return (
    <form onSubmit={onSubmit}>
      <input value={email} onChange={onChange} />
      <input value={password} onChange={onChange} />

      <button>Sign in</button>
    </form>
  );
}
