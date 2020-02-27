import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { GlobalStyles } from './styles/global-styles';
import { theme } from './styles/theme';
import Layout from './components/layout';
import Header from './components/header';

import PostsPage from './pages/posts-page';
import PostPage from './pages/post-page';
import AuthPage from './pages/auth-page';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Switch>
        <Layout>
          <Header />
          <Route exact path="/" component={PostsPage} />
          <Route exact path="/post/:id" component={PostPage} />
          <Route exact path="/auth" component={AuthPage} />
        </Layout>
      </Switch>
    </ThemeProvider>
  );
}

export default App;
