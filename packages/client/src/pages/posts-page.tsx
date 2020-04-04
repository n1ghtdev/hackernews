import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { postsRequest } from '../modules/posts/actions';
import { RootState } from '../modules/reducers';
import { selectPosts } from '../modules/posts/selectors';
import useLoading from '../hooks/use-loading';

import PostList from '../components/post-list';
import PostItem from '../components/post-item';
import { Post } from '../modules/posts/types';

export default function PostsPage() {
  const dispatch = useDispatch();
  const posts = useSelector((state: RootState) => selectPosts(state.posts));
  const isLoading = useLoading('posts');

  React.useEffect(() => {
    dispatch(postsRequest());
  }, [dispatch]);

  if (isLoading) {
    return null;
  }

  return (
    <PostList>
      {posts.length &&
        posts.map((post: Post, index: number) => (
          <PostItem
            key={post._id}
            index={index + 1}
            post={post}
            commentsCount={post.comments.length}
          />
        ))}
    </PostList>
  );
}
