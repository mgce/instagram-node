import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import Post from 'components/Post';
import { Card, Icon } from 'antd';
import { httpClient } from 'utils/httpClient';
import Thumbnail from 'components/Thumbnail';
import PostModal from 'components/PostModal';
import Modal from 'react-modal';

export default class TagFeedPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      postModalOpen: false,
      selectedPost: {},
    };

    this.openPostModal = this.openPostModal.bind(this);
    this.closePostModal = this.closePostModal.bind(this);
  }

  componentDidMount() {
    const { tagName } = this.props.match.params;
    this.props.loadTag(tagName);
  }

  openPostModal(post) {
    this.props.loadComments(post.id);
    this.setState({
      postModalOpen: true,
      selectedPost: post,
    });
  }

  closePostModal() {
    this.setState({
      postModalOpen: false,
      selectedPost: {},
    });
  }

  renderModal() {
    const { postModalOpen, selectedImageUrl } = this.state;
    if (postModalOpen)
      return (
        <PostModal
          isOpen={postModalOpen}
          onRequestClose={this.closePostModal}
          post={this.state.selectedPost}
          comments={this.props.comments.get(
            this.state.selectedPost.id.toString(),
          )}
          addComment={this.props.addComment}
        />
      );
  }

  render() {
    const { loading, error, tags } = this.props;
    const { tagName } = this.props.match.params;
    const posts = tags.get(tagName);
    return (
      <div className="container">
        <div className="tag-page-header">
          <h2>#{tagName}</h2>
          <h4>{posts ? posts.length : 0} posts</h4>
        </div>
        <div className="thumbnail-grid">
          {posts
            ? posts.map(post => (
                <Thumbnail
                  key={post.id}
                  id={post.id}
                  author={post.author}
                  description={post.description}
                  imageId={post.imageId}
                  likesCount={post.likesCount}
                  commentsCount={post.commentsCount}
                  onClick={this.openPostModal}
                />
              ))
            : null}
          {this.renderModal()}
        </div>
      </div>
    );
  }
}

TagFeedPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  tags: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};
