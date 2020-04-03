import React from 'react';
import styled from 'styled-components';

type Props = {
  currentComment: string;
  onEditComment: (text: string) => void;
};

const Form = styled.form``;
const TextArea = styled.textarea`
  max-width: 300px;
  width: 100%;
`;
const Button = styled.button`
  display: block;
  padding: 5px;
`;

export default function EditCommentForm(props: Props) {
  const [text, setText] = React.useState(props.currentComment);
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    props.onEditComment(text);
  }
  function onChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const target = e.target as HTMLTextAreaElement;
    setText(target.value);
  }
  return (
    <Form onSubmit={onSubmit}>
      <TextArea rows={6} value={text} onChange={onChange} required />
      <Button>edit comment</Button>
    </Form>
  );
}
