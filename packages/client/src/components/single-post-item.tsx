import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addCommentRequest,
  commentsRequest,
} from '../modules/comments/actions';
import { Post } from '../modules/posts/types';
import PostItem from './post-item';
import Comments from './comments';
import AddCommentForm from './add-comment-form';
import { RootState } from '../modules/reducers';
import { selectCommentsByPost } from '../modules/comments/selectors';
import { Comment } from '../modules/comments/types';

type Props = {
  post: Post;
};

export default function SinglePostItem(props: Props) {
  const { post } = props;

  const dispatch = useDispatch();
  const comments = useSelector((state: RootState) =>
    selectCommentsByPost(state.comments, post._id),
  );

  const parentComments = comments.filter(
    (comment: Comment) => comment.parent === null,
  );

  React.useEffect(() => {
    dispatch(commentsRequest(post._id));
  }, [post._id, dispatch]);

  return (
    <>
      <PostItem post={post} />
      <AddCommentForm
        onAddComment={(text: string) => {
          dispatch(addCommentRequest({ post: post._id, text }));
        }}
      />
      <Comments comments={parentComments} postId={post._id} />
    </>
  );
}
