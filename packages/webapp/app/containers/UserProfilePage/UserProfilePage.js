import React from 'react';
import PropTypes from 'prop-types';
import Thumbnail from 'components/Thumbnail';
export default class UserProfilePage extends React.PureComponent {
  componentDidMount() {
    const { userId } = this.props.match.params;
    this.props.getUserPosts(userId);
  }
  render() {
    const {userPosts} = this.props;
    const { userId } = this.props.match.params;
    const posts = userPosts.get(userId.toString());
    return (
      <div className="container">
        <div className="thumbnail-grid">
          {posts
            ? posts.map(post => (
                <Thumbnail
                  key={post.id}
                  id={post.id}
                  author={post.author}
                  authorId={post.authorId}
                  description={post.description}
                  imageId={post.imageId}
                  likesCount={post.likesCount}
                  commentsCount={post.commentsCount}
                  onClick={this.openPostModal}
                />
              ))
            : null}
        </div>
      </div>
    );
  }
}
