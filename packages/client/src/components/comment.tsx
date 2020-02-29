import React from 'react';
import styled from 'styled-components';
import TimeAgo from 'react-timeago';
import { useDispatch } from 'react-redux';
import { addCommentRequest } from '../modules/posts/actions';
import Comments from './comments';
import AddCommentForm from './add-comment-form';

type Props = {
  comment: any;
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

const ReplyButton = styled.button`
  padding: 0;
  background: none;
  border: none;
  color: ${({ theme }) => theme.textAccent};
  font-size: 12px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

export default function Comment(props: Props) {
  const dispatch = useDispatch();
  const [reply, setReply] = React.useState(false);
  const { comment, postId } = props;

  function onReply(text: string) {
    dispatch(addCommentRequest({ post: postId, text, parent: comment._id }));
    setReply(false);
  }

  return (
    <Wrapper>
      <Header>
        {comment.user?.name} <TimeAgo date={comment.createdAt} live={false} />
      </Header>
      <Body>{comment.text}</Body>
      <ReplyButton onClick={() => setReply(!reply)}>reply</ReplyButton>
      {reply ? <AddCommentForm onAddComment={onReply} /> : null}
      {comment.children ? (
        <Comments comments={comment.children} postId={postId} />
      ) : null}
    </Wrapper>
  );
}
