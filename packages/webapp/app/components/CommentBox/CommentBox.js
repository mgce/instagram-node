import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

export default class CommentBox extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleKeyDown = this.handleKeyDown.bind(this);
  }
  handleKeyDown(event) {
    if (event.which === 13 && this.props.value.trim().length > 0) {
      this.props.onSubmit();
      this.commentInput.blur();
    }
  }
  render() {
    return (
      <div className="comment-box">
        <input
          name="commentDescription"
          className="comment-box-input"
          type="text"
          placeholder="Add a comment..."
          value={this.props.value}
          onChange={this.props.onChange}
          onKeyDown={this.handleKeyDown}
          ref={ref => {
            this.commentInput = ref;
          }}
        />
      </div>
    );
  }
}
