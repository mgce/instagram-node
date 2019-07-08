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
            <div className="post-modal-comments">
              {comments
                ? comments.map(comment => (
                    <div className="post-modal-comment">
                      <strong>{comment.username}:</strong> {comment.description}
                    </div>
                  ))
                : null}
            </div>
            <div className="post-modal-action-box">
              <div className="post-modal-like-button" />
              <div className="post-modal-comment-box">
                <div className="comment-box">
                  <input
                    className="comment-box-input"
                    type="text"
                    placeholder="Add a comment..."
                    // value={this.state.commentBody}
                    // onChange={this.onCommentChange}
                    // onKeyDown={this.handleKeyDown}
                    // ref={(ref) => {this.commentInput = ref}}
                  />
                </div>
              </div>
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
        ariaHideApp={false}
      >
        {this.renderModalContent()}
      </Modal>
    );
  }
}
