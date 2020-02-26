import React from 'react';
import styled from 'styled-components';
import Comment from './comment';

const Wrapper = styled.ul`
  list-style-type: none;
  padding-left: 5px;
  & > li > ul {
    padding-left: 30px;
  }
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
