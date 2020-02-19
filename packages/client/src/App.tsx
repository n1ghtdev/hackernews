import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveUser, removeUser } from './modules/user/actions';
import { RootState } from './modules/reducers';
import PostsPage from './pages/posts-page';

function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user);

  React.useEffect(() => {
    const cachedUser = localStorage.getItem('user');
    const user = cachedUser && JSON.parse(cachedUser);
    dispatch(saveUser(user));
  }, [dispatch]);
  return (
    <>
      {currentUser.isAuth ? <h1>{currentUser.user.name}</h1> : null}
      <PostsPage />
    </>
  );
}

export default App;
