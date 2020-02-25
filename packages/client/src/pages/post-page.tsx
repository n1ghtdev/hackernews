import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { postRequest } from '../modules/posts/actions';
import { RootState } from '../modules/reducers';
import useLoading from '../hooks/useLoading';
import SinglePostItem from '../components/single-post-item';

export default function PostPage() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const post = useSelector((state: RootState) => state.news.post);
  const isLoading = useLoading('posts');

  React.useEffect(() => {
    if (id) {
      dispatch(postRequest(id));
    }
  }, [dispatch, id]);

  if (isLoading) {
    return null;
  }

  return post ? <SinglePostItem post={post} /> : null;
}
