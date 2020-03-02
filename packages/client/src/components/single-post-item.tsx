import React from 'react';
import { useDispatch } from 'react-redux';
import { addCommentRequest } from '../modules/posts/actions';
import { Post, Comment } from '../modules/posts/types';
import PostItem from './post-item';
import Comments from './comments';
import AddCommentForm from './add-comment-form';

type Props = {
  post: Post;
};

export default function SinglePostItem(props: Props) {
  const dispatch = useDispatch();

  return (
    <>
      <PostItem post={props.post} />
      <AddCommentForm
        onAddComment={(text: string) => {
          dispatch(addCommentRequest({ post: props.post._id, text }));
        }}
      />
      <Comments
        comments={props.post.comments as Comment[]}
        postId={props.post._id}
      />
    </>
  );
}
