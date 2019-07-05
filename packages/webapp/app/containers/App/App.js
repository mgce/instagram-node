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
import Header from 'components/Header';
import './style.scss';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

const App = () => (
  <Layout className="hp-100">
    <Helmet
      titleTemplate="%s - React.js Boilerplate"
      defaultTitle="Instagram clone"
    >
      <meta name="description" content="Instagram clone application" />
    </Helmet>
    <Header />
    <Layout style={{ padding: '0px 64px 0 64px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Posts</Breadcrumb.Item>
      </Breadcrumb>
      <Layout.Content
        style={{
          background: '#fff',
          padding: 24,
          margin: 0,
          minHeight: 280,
        }}
      >
        <div className="app-wrapper">
          <Switch>
            <PublicRoute exact path="/login" component={LoginPage} />
            <PrivateRoute exact path="/" component={PostFeedPage} />
            <PrivateRoute exact path="/tag/:tagName" component={TagFeedPage} />
            <PrivateRoute path="/add" component={AddPostPage} />
            <PrivateRoute path="" component={NotFoundPage} />
          </Switch>
        </div>
      </Layout.Content>
    </Layout>
  </Layout>
);

export default App;
