import React from 'react';

export default function useForm<T>(onSubmit: () => void, initialValues: T) {
  const [values, setValues] = React.useState(initialValues);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement;
    const { name, value } = target;

    setValues((state: typeof initialValues) => ({ ...state, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit();
  }

  return { values, handleChange, handleSubmit };
}
