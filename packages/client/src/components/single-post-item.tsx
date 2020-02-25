import React from 'react';
import styled from 'styled-components';
import { Post } from '../modules/posts/types';
import PostItem from './post-item';
import Comments from './comments';

type Props = {
  post: Post;
};

export default function SinglePostItem(props: Props) {
  return (
    <>
      <PostItem post={props.post} />
      <Comments comments={props.post.comments} />
    </>
  );
}
