import React from 'react';
import useForm from '../hooks/use-form';
import useErrors from '../hooks/use-errors';

type Props = {
  onSubmit: (data: { [key: string]: string }) => void;
};

type FormValues = {
  nickname: string;
  email: string;
  password: string;
};

export default function SignUpForm(props: Props) {
  const error = useErrors('auth-signup');

  const { values, handleChange, handleSubmit } = useForm<FormValues>(
    () => props.onSubmit(values),
    {
      nickname: '',
      email: '',
      password: '',
    },
  );

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="nickname"
        value={values.nickname}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        value={values.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        value={values.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Sign In</button>
      {error ? <span style={{ color: 'red' }}>{error}</span> : null}
    </form>
  );
}
