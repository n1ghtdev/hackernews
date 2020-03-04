import React from 'react';
import styled from 'styled-components';
import Comment from './comment';
import { Comment as CommentType } from '../modules/comments/types';

type Props = {
  comments: CommentType[];
  postId: string;
};

const Wrapper = styled.ul`
  list-style-type: none;
  padding-left: 5px;
  & > li > ul {
    padding-left: 30px;
  }
`;

export default function Comments(props: Props) {
  const { comments, postId } = props;

  return (
    <Wrapper>
      {comments.map((comment: CommentType) => (
        <Comment key={comment._id} comment={comment} postId={postId} />
      ))}
    </Wrapper>
  );
}
