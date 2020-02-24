import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { saveUser } from './modules/user/actions';
import { RootState } from './modules/reducers';
import { GlobalStyles } from './styles/global-styles';
import { theme } from './styles/theme';
import Layout from './components/layout';

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
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Switch>
        <Layout>
          <Route exact path="/" component={PostsPage} />
          <Route exact path="/post/:id" component={PostPage} />
        </Layout>
      </Switch>
    </ThemeProvider>
  );
}

export default App;
