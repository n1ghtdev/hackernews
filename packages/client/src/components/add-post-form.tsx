import React from 'react';
import useForm from '../hooks/use-form';
import { Post } from '../modules/posts/types';

type Props = {
  onSubmit: (data: Partial<Post>) => void;
};

type FormValues = {
  title: string;
  source: string;
};

export default function AddPostForm(props: Props) {
  const { values, handleChange, handleSubmit } = useForm<FormValues>(
    () => props.onSubmit(values),
    {
      title: '',
      source: '',
    },
  );
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={values.title}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="source"
        value={values.source}
        onChange={handleChange}
        required
      />
      <button type="submit">Add post</button>
    </form>
  );
}
