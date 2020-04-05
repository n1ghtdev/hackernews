import React from 'react';
import { useSelector } from 'react-redux';
import TimeAgo from 'react-timeago';
import styled from 'styled-components';

import Comments from '../comments';
import Tooltip from './tooltip';

import { RootState } from '../../../modules/reducers';
import { Comment as CommentType } from '../../../modules/comments/types';
import { selectCommentReplies } from '../../../modules/comments/selectors';

type Props = {
  comment: CommentType;
  postId: string;
};

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

export default function Comment(props: Props) {
  const { comment, postId } = props;

  const replies = useSelector((state: RootState) =>
    selectCommentReplies(state.comments, comment.children),
  );

  return (
    <Wrapper>
      <Header>
        {comment.user?.name} <TimeAgo date={comment.createdAt} live={false} />
      </Header>
      <Body>{comment.text}</Body>
      <Tooltip comment={comment} postId={postId} />
      {replies ? <Comments comments={replies} postId={postId} /> : null}
    </Wrapper>
  );
}
