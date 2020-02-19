import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { postsRequest } from '../modules/posts/actions';
import { RootState } from '../modules/reducers';
import useLoading from '../hooks/useLoading';

import PostList from '../components/post-list';
import PostItem from '../components/post-item';
import { Post } from '../modules/posts/types';

export default function PostsPage() {
  const dispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.posts);
  const isLoading = useLoading('posts');

  React.useEffect(() => {
    dispatch(postsRequest());
  }, [dispatch]);

  if (isLoading) {
    return null;
  }

  return (
    <PostList>
      {posts.data.length &&
        posts.data.map((post: Post) => <PostItem key={post._id} post={post} />)}
    </PostList>
  );
}
