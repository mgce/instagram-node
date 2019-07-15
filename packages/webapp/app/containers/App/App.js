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
import { Link } from 'react-router-dom';
import PostFeedPage from 'containers/PostFeedPage/Loadable';
import TagFeedPage from 'containers/TagFeedPage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import AddPostPage from 'containers/AddPostPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import UserProfilePage from 'containers/UserProfilePage/Loadable';
import Header from 'components/Header';
import './style.scss';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

const App = () => (
  <Layout className="layout">
    <Helmet
      titleTemplate="%s - React.js Boilerplate"
      defaultTitle="Instagram clone"
    >
      <meta name="description" content="Instagram clone application" />
    </Helmet>
    <Header />
    <div className="container">
      {/* <Breadcrumb>
        <Breadcrumb.Item>Posts</Breadcrumb.Item>
      </Breadcrumb> */}
      <Layout.Content
        style={{
          padding: 24,
        }}
      >
        <div className="app-wrapper">
          <Switch>
            <PublicRoute exact path="/login" component={LoginPage} />
            <PrivateRoute exact path="/" component={PostFeedPage} />
            <PrivateRoute exact path="/tags/:tagName" component={TagFeedPage} />
            <PrivateRoute
              exact
              path="/users/:userId"
              component={UserProfilePage}
            />
            <PrivateRoute path="/add" component={AddPostPage} />
            <PrivateRoute path="" component={NotFoundPage} />
          </Switch>
        </div>
      </Layout.Content>
    </div>
    <Layout.Footer />
  </Layout>
);

export default App;
