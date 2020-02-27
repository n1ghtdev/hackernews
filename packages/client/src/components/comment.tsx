import React from 'react';
import styled from 'styled-components';
import TimeAgo from 'react-timeago';
import Comments from './comments';

const Wrapper = styled.li`
  padding: 10px 0;
`;

const Header = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.textAccent};
  margin-bottom: 5px;
`;

const Body = styled.div`
  font-size: 14px;
`;

export default function Comment({ comment }: { comment: any }) {
  return (
    <Wrapper>
      <Header>
        {comment.user.name} <TimeAgo date={comment.createdAt} />
      </Header>
      <Body>{comment.text}</Body>
      {comment.children ? <Comments comments={comment.children} /> : null}
    </Wrapper>
  );
}
