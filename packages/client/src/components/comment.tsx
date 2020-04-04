import React from 'react';
import styled from 'styled-components';
import TimeAgo from 'react-timeago';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules/reducers';
import {
  addCommentRequest,
  editCommentRequest,
  deleteCommentRequest,
} from '../modules/comments/actions';
import Comments from './comments';
import AddCommentForm from './add-comment-form';
import EditCommentForm from './edit-comment-form';
import { Comment as CommentType } from '../modules/comments/types';
import { selectCommentReplies } from '../modules/comments/selectors';

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

const Button = styled.button`
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
  const { comment, postId } = props;

  const replies = useSelector((state: RootState) =>
    selectCommentReplies(state.comments, comment.children),
  );

  const [reply, setReply] = React.useState(false);
  const [edit, setEdit] = React.useState(false);

  function onReply(text: string) {
    dispatch(addCommentRequest({ post: postId, text, parent: comment._id }));
    setReply(false);
  }

  function onEdit(text: string) {
    dispatch(editCommentRequest({ _id: comment._id, text }));
    setEdit(false);
  }

  return (
    <Wrapper>
      <Header>
        {comment.user?.name} <TimeAgo date={comment.createdAt} live={false} />
      </Header>
      <Body>{comment.text}</Body>
      <Button
        onClick={() => {
          if (edit) {
            setEdit(false);
          }
          setReply(!reply);
        }}
      >
        reply
      </Button>
      {!comment.isDeleted ? (
        <>
          <Button
            onClick={() => {
              if (reply) {
                setReply(false);
              }
              setEdit(!edit);
            }}
          >
            /edit
          </Button>
          <Button
            onClick={() => {
              setReply(false);
              setEdit(false);
              dispatch(deleteCommentRequest(comment._id));
            }}
          >
            /delete
          </Button>
        </>
      ) : null}
      {reply ? <AddCommentForm onAddComment={onReply} /> : null}
      {edit ? (
        <EditCommentForm onEditComment={onEdit} currentComment={comment.text} />
      ) : null}
      {replies ? <Comments comments={replies} postId={postId} /> : null}
    </Wrapper>
  );
}
