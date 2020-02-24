import React from 'react';
import styled from 'styled-components';
import Comment from './comment';

const Wrapper = styled.ul`
  list-style-type: none;
  margin-bottom: 20px;
`;

export default function Comments({ comments }: { comments: any }) {
  return (
    <Wrapper>
      {comments.map((comment: any) => (
        <Comment comment={comment} />
      ))}
    </Wrapper>
  );
}
