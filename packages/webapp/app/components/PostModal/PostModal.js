import React from 'react';
import Modal from 'react-modal';
import './style.scss';

export default class PostModal extends React.PureComponent {
  getCustomStyles() {
    return {
      overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
      },
      content: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        right: 'initial',
        bottom: 'initial',
        transform: 'translate(-50%, -50%)',
        border: 'none',
        background: '#fff',
        overflow: 'false',
        WebkitOverflowScrolling: 'touch',
        borderRadius: '0px',
        outline: 'none',
        padding: '0px',
        width: '65vw',
      },
    };
  }

  renderModalContent() {
    const { post, comments } = this.props;
    return (
      <div className="post-modal-root">
        <div className="row">
          <div className="post-modal-photo-wrapper">
            <div className="post-modal-photo">
              <img src={post.imageUrl} />
            </div>
          </div>
          <div className="post-modal-info-container col-4">
            <div className="post-modal-user-wrapper">
              {/* <div className="post-modal-user-avatar">
              </div> */}
              <div>{post.author}</div>
            </div>
            <div className="post-modal-likes">
              <span>{post.likesCount} likes</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onRequestClose}
        style={this.getCustomStyles()}
        contentLabel="PostModal"
      >
        {this.renderModalContent()}
      </Modal>
    );
  }
}
