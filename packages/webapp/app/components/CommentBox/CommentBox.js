import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const CommentBox = (props) => {
  return (
    <div className="comment-box">
      <input
        name="commentDescription"
        className="comment-box-input"
        type="text"
        placeholder="Add a comment..."
        value={props.value}
        onChange={props.onChange}
        // onKeyDown={this.handleKeyDown}
        // ref={(ref) => {this.commentInput = ref}}
      />
    </div>
  );
};

export default CommentBox;