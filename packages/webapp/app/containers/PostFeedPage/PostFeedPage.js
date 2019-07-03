import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import './style.scss';
import Post from 'components/Post';

export default class PostFeedPage extends React.PureComponent {
  componentDidMount() {
    this.props.loadPosts();
  }

  render() {
    const {
      loading,
      error,
      posts,
      likePost,
      unlikePost,
      loadComments,
      addComment,
    } = this.props;

    const comments = this.props.comments.toJS();

    return (
      <article>
        <Helmet>
          <title>Home Page</title>
          <meta
            name="description"
            content="A React.js Boilerplate application homepage"
          />
        </Helmet>
        <div className="container">
          {posts
            ? posts.map(post => (
              <Post
                key={post.id}
                id={post.id}
                author={post.author}
                imageId={post.imageid}
                likesCount={post.likesCount}
                commentsCount={post.commentsCount}
                description={post.description}
                likePost={likePost}
                unlikePost={unlikePost}
                liked={post.liked}
                loadComments={loadComments}
                comments={comments[post.id]}
                addComment={addComment}
              />
            ))
            : null}
        </div>
      </article>
    );
  }
}

PostFeedPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  posts: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  comments: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  likePost: PropTypes.func,
  unlikePost: PropTypes.func,
  loadPosts: PropTypes.func,
  loadComments: PropTypes.func,
  addComment: PropTypes.func,
};
