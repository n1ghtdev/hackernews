import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import AddCommentForm from './add-comment-form';
import EditCommentForm from './edit-comment-form';

import {
  addCommentRequest,
  editCommentRequest,
  deleteCommentRequest,
} from '../../../modules/comments/actions';
import { Comment } from '../../../modules/comments/types';
import { RootState } from '../../../modules/reducers';

type Props = {
  comment: Comment;
  postId: string;
};

const Wrapper = styled.div``;

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

export default function Tooltip(props: Props) {
  const { comment, postId } = props;

  const dispatch = useDispatch();
  const authUser = useSelector((state: RootState) => state.auth.user);

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

  function onDelete() {
    setReply(false);
    setEdit(false);
    dispatch(deleteCommentRequest(comment._id));
  }

  function toggleReplyForm() {
    if (edit) {
      setEdit(false);
    }
    setReply(!reply);
  }

  function toggleEditForm() {
    if (reply) {
      setReply(false);
    }
    setEdit(!edit);
  }

  const isCommentEditable =
    !comment.isDeleted ||
    authUser._id === comment.user ||
    authUser.role === 'admin';

  return (
    <Wrapper>
      <Button onClick={toggleReplyForm}>reply</Button>
      {isCommentEditable ? (
        <>
          <Button onClick={toggleEditForm}>/edit</Button>
          <Button onClick={onDelete}>/delete</Button>
        </>
      ) : null}
      {reply ? <AddCommentForm onAddComment={onReply} /> : null}
      {edit ? (
        <EditCommentForm onEditComment={onEdit} currentComment={comment.text} />
      ) : null}
    </Wrapper>
  );
}
