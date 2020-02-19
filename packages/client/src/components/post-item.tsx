import React from 'react';
import { Post } from '../modules/posts/types';

type Props = {
  post: Post;
};

export default function PostItem(props: Props) {
  const { post } = props;
  return (
    <article>
      {post.title} - {post.author.name}
    </article>
  );
}
