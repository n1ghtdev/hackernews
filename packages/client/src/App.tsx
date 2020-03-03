import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { useDispatch } from 'react-redux';

import { verifyRequest } from './modules/auth/actions';

import { GlobalStyles } from './styles/global-styles';
import { theme } from './styles/theme';
import Layout from './components/layout';
import Header from './components/header';
import PrivateRoute from './components/private-route';

import PostsPage from './pages/posts-page';
import PostPage from './pages/post-page';
import AddPostPage from './pages/add-post-page';
import AuthPage from './pages/auth-page';
import UserPage from './pages/user-page';

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(verifyRequest());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Switch>
        <Layout>
          <Header />
          <Route exact path="/" component={PostsPage} />
          <PrivateRoute exact path="/add-post" component={AddPostPage} />
          <Route exact path="/post/:id" component={PostPage} />
          <Route exact path="/auth" component={AuthPage} />
          <Route exact path="/user/:id" component={UserPage} />
        </Layout>
      </Switch>
    </ThemeProvider>
  );
}

export default App;
