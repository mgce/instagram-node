/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import "./style.scss";
import Post from "components/Post";

export default class PostFeedPage extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {
    this.props.loadPosts();
  }

  render() {
    const {
      loading,
      error,
      posts,
    } = this.props;
    const reposListProps = {
      loading,
      error,
    };

    return (
      <article>
        <Helmet>
          <title>Home Page</title>
          <meta
            name="description"
            content="A React.js Boilerplate application homepage"
          />
        </Helmet>
        <div className="home-page">
          {this.props.posts.map(post => (
          <Post
            key={post.id}
            username={post.username}
            imageId={post.imageid}
            likesCount={2}
            commentsCount={3}
            description={post.description}
          />
          ))}
        </div>
      </article>
    );
  }
}

PostFeedPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onSubmitForm: PropTypes.func,
};
