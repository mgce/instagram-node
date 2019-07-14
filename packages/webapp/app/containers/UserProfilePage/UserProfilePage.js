import React from 'react';
import PropTypes from 'prop-types';
import Thumbnail from 'components/Thumbnail';
export default class UserProfilePage extends React.PureComponent {
  componentDidMount() {
    const userId = this.getUserId();
    this.props.getUserPosts(parseInt(userId));
    this.props.getUserInfo(parseInt(userId));
  }
  getUserId(){
    const { userId } = this.props.match.params;
    return parseInt(userId)
  }
  render() {
    const {userPosts, users} = this.props;
    const userId = this.getUserId();
    const posts = userPosts.get(userId);
    const user = users.get(userId);
    return (
      <div className="container">
        <div className="user-profile container">
        <h2>{user.username}</h2>
        </div>
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
