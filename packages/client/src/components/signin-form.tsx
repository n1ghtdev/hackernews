import React from 'react';
import useForm from '../hooks/use-form';
import useErrors from '../hooks/use-errors';

type Props = {
  onSubmit: (data: { [key: string]: string }) => void;
};

type FormValues = {
  email: string;
  password: string;
};

export default function SignInForm(props: Props) {
  const error = useErrors('auth-signin');

  const { values, handleChange, handleSubmit } = useForm<FormValues>(
    () => props.onSubmit(values),
    {
      email: '',
      password: '',
    },
  );

  return (
    <form onSubmit={handleSubmit}>
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
