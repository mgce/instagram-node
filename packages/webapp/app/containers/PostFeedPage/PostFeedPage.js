import React from 'react';
import PropTypes from 'prop-types';
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
      comments,
      addComment,
      user
    } = this.props;

    return (
      <div className="post-container container">
        {posts
          ? posts.map(post => {
            const postComments = comments.get(post.id.toString());
              return <Post
                key={post.id}
                id={post.id}
                currentUserId={user.id}
                author={post.author}
                authorId={post.authorId}
                imageId={post.imageId}
                likesCount={post.likesCount}
                commentsCount={post.commentsCount}
                description={post.description}
                likePost={likePost}
                unlikePost={unlikePost}
                liked={post.liked}
                loadComments={loadComments}
                comments={comments.get(post.id.toString())}
                addComment={addComment}
              />
          })
          : null}
      </div>
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
