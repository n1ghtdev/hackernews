import React from 'react';
import styled from 'styled-components';
import Comments from './comments';

const Wrapper = styled.li`
  padding: 10px 0;
`;

export default function Comment({ comment }: { comment: any }) {
  return (
    <Wrapper>
      <span>{comment.comment}</span>
      {comment.comments ? <Comments comments={comment.comments} /> : null}
    </Wrapper>
  );
}
