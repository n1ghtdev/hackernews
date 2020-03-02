import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { addPostRequest } from '../modules/posts/actions';
import { RootState } from '../modules/reducers';
import { Post } from '../modules/posts/types';
import useLoading from '../hooks/use-loading';
import useErrors from '../hooks/use-errors';
import AddPostForm from '../components/add-post-form';

export default function AddPostPage() {
  const dispatch = useDispatch();
  const newPost = useSelector((state: RootState) => state.news.post);
  const isLoading = useLoading('add-post');
  const errors = useErrors('add-post');
  const history = useHistory();

  React.useEffect(() => {
    if (newPost?._id && !isLoading) {
      history.push(`/post/${newPost._id}`);
    }
  }, [newPost, history, isLoading]);

  async function onAddPost(post: Partial<Post>) {
    await dispatch(addPostRequest(post));
  }

  if (isLoading) {
    return null;
  }

  return <AddPostForm onSubmit={onAddPost} />;
}
