import React from 'react';
import styled from 'styled-components';
import Comment from './comment';

type Props = {
  comments: any;
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
  const filteredComments = comments.filter(
    (comment: any) => comment.parent === null,
  );

  return (
    <Wrapper>
      {(filteredComments.length ? filteredComments : comments).map(
        (comment: any) => (
          <Comment comment={comment} postId={postId} />
        ),
      )}
    </Wrapper>
  );
}
