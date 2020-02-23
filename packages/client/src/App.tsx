import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { saveUser } from './modules/user/actions';
import { RootState } from './modules/reducers';
import PostsPage from './pages/posts-page';
import PostPage from './pages/post-page';

function App() {
  // const dispatch = useDispatch();
  // const currentUser = useSelector((state: RootState) => state.user);

  // React.useEffect(() => {
  //   const cachedUser = localStorage.getItem('user');
  //   const user = cachedUser && JSON.parse(cachedUser);
  //   dispatch(saveUser(user));
  // }, [dispatch]);
  return (
    <Switch>
      <Route exact path="/" component={PostsPage} />
      <Route exact path="/post/:id" component={PostPage} />
    </Switch>
  );
}

export default App;
