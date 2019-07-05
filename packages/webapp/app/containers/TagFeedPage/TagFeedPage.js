import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import './style.scss';
import Post from 'components/Post';

export default class TagFeedPage extends React.PureComponent {
  componentDidMount() {
    const {tagName} = this.props.match.params;
    this.props.loadTag(tagName);
  }

  render() {
    const {
      loading,
      error,
      tags
    } = this.props;

    // const comments = this.props.comments.toJS();

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
          {tags
            ? tags.map(tagPost => (
              <Post
                key={tagPost.id}
                id={tagPost.id}
                author={tagPost.author}
                imageId={tagPost.imageId}
                likesCount={tagPost.likesCount}
                commentsCount={tagPost.commentsCount}
                description={tagPost.description}
                // likePost={likePost}
                // unlikePost={unlikePost}
                liked={tagPost.liked}
                // loadComments={loadComments}
                // comments={comments[tagPost.id]}
                // addComment={addComment}
              />
            ))
            : null}
        </div>
      </article>
    );
  }
}

TagFeedPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  tags: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  // comments: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  // likePost: PropTypes.func,
  // unlikePost: PropTypes.func,
  // loadPosts: PropTypes.func,
  // loadComments: PropTypes.func,
  // addComment: PropTypes.func,
};
