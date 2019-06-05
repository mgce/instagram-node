import React from "react";
import PropTypes from "prop-types";

export default class Post extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="home-page">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{this.props.username}</h5>
          </div>
          <img
            src="https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <p className="card-title">{this.props.likesCount} likes</p>
            <p className="card-text">{this.props.description}</p>
            <p className="card-subtitle mb-2 text-muted">
              See all comments: {this.props.commentsCount}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  username: PropTypes.string,
  likeCount: PropTypes.number,
  commentsCount: PropTypes.number,
  description: PropTypes.string
};
