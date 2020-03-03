import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userRequest } from '../modules/users/actions';
import { RootState } from '../modules/reducers';
import useLoading from '../hooks/use-loading';
import { UserInfo, UserInfoItem } from '../components/user-info';
export default function UserPage() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const user = useSelector((state: RootState) => id && state.users[id]);
  const isLoading = useLoading('posts');

  React.useEffect(() => {
    if (id) {
      dispatch(userRequest(id));
    }
  }, [dispatch, id]);

  if (isLoading) {
    return null;
  }

  return user ? (
    <UserInfo>
      <UserInfoItem title="user:" content={user.name} />
      <UserInfoItem
        title="created:"
        content={new Date(user.createdAt).toDateString()}
      />
      <UserInfoItem title="posts:" content={user.postCount} />
      <UserInfoItem title="comments:" content={user.commentCount} />
    </UserInfo>
  ) : null;
}
