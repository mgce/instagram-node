/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from "react";
import { Helmet } from "react-helmet";
import { Switch, Route } from "react-router-dom";
import {PrivateRoute} from 'utils/PrivateRoute'

import PostFeedPage from "containers/PostFeedPage/Loadable";
import LoginPage from "containers/LoginPage/Loadable";
import AddPostPage from "containers/AddPostPage/Loadable";
import NotFoundPage from "containers/NotFoundPage/Loadable";
import Header from "components/Header";
import Footer from "components/Footer";
import "./style.scss";

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
        <Route exact path="/login" component={LoginPage} />
        <PrivateRoute exact path="/" component={PostFeedPage} />
        <PrivateRoute path="/add" component={AddPostPage} />
        <PrivateRoute path="" component={NotFoundPage} />
      </Switch>
      {/* <Footer /> */}
    </div>
  </>
);

export default App;
