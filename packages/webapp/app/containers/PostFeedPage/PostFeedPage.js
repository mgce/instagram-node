/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import './style.scss';
import Post from 'components/Post';

export default class PostFeedPage extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.loadPosts();
  }

  render() {
    const {
      loading,
      error,
      posts,
      likePost
    } = this.props;

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
          {posts ? posts.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              username={post.username}
              imageId={post.imageid}
              likes={post.likes}
              commentsCount={3}
              description={post.description}
              likePost={likePost}
            />
          )) : null}
        </div>
      </article>
    );
  }
}

PostFeedPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  posts: PropTypes.array,
  likePost: PropTypes.func,
  loadPosts: PropTypes.func,
};
