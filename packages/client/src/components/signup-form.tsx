import React from 'react';
import useForm from '../hooks/use-form';

type Props = {
  onSubmit: (data: { [key: string]: string }) => void;
};

export default function SignUpForm(props: Props) {
  const { values, handleChange, handleSubmit } = useForm(
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
      />
      <input
        type="email"
        name="email"
        value={values.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        value={values.password}
        onChange={handleChange}
      />
      <button type="submit">Sign In</button>
    </form>
  );
}
