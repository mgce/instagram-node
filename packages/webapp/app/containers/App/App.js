/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch } from 'react-router-dom';
// eslint-disable-next-line import/no-unresolved
import { PrivateRoute, PublicRoute } from 'utils/Routes';

import PostFeedPage from 'containers/PostFeedPage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import AddPostPage from 'containers/AddPostPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import './style.scss';

const App = () => (
  <>
    <Helmet
      titleTemplate="%s - React.js Boilerplate"
      defaultTitle="Instagram clone"
    >
      <meta name="description" content="Instagram clone application" />
    </Helmet>
    <Header />
    <div className="app-wrapper">
      <Switch>
        <PublicRoute exact path="/login" component={LoginPage} />
        <PrivateRoute exact path="/" component={PostFeedPage} />
        <PrivateRoute path="/add" component={AddPostPage} />
        <PrivateRoute path="" component={NotFoundPage} />
      </Switch>
      {/* <Footer /> */}
    </div>
  </>
);

export default App;
