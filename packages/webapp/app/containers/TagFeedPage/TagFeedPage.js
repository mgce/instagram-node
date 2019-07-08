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
    const com = this.props.comments;
    if (postModalOpen)
      return (
        <PostModal
          isOpen={postModalOpen}
          onRequestClose={this.closePostModal}
          post={this.state.selectedPost}
          comments={this.props.comments.get(this.state.selectedPost.id)}
        />
      );
  }

  render() {
    const { loading, error, tags } = this.props;
    const { tagName } = this.props.match.params;

    return (
      <div className="container">
        <div className="thumbnail-grid">
          {tags.get(tagName)
            ? tags
                .get(tagName)
                .map(tagPost => (
                  <Thumbnail
                    key={tagPost.id}
                    id={tagPost.id}
                    author={tagPost.author}
                    description={tagPost.description}
                    imageId={tagPost.imageId}
                    likesCount={tagPost.likesCount}
                    commentsCount={tagPost.commentsCount}
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
