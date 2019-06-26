import React from 'react';
import PropTypes from 'prop-types';
import { httpClient } from 'utils/httpClient';

export default class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: null,
    };
    this.likePost = this.likePost.bind(this);
    this.unlikePost = this.unlikePost.bind(this);
  }

  componentDidMount() {
    httpClient({
      method: 'GET',
      url: `image/download/${this.props.imageId}`,
    }).then((response) => {
      this.setState({ imageUrl: response.data.url });
    });
  }

  likePost() {
    this.props.likePost(this.props.id);
  }

  unlikePost() {
    this.props.unlikePost(this.props.id);
  }

  render() {
    const {
      username,
      likes,
      description,
      commentsCount,
      liked
    } = this.props;
    const {
      imageUrl,
    } = this.state;
    return (
      <div className="home-page">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{username}</h5>
          </div>
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            {liked ? <button type="submit" onClick={this.unlikePost}>Unlike</button> : <button type="submit" onClick={this.likePost}>Like</button>}
            <p className="card-title">{likes} likes</p>
            <p className="card-text">{description}</p>
            <p className="card-subtitle mb-2 text-muted">
              See all comments: {commentsCount}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  id: PropTypes.number,
  username: PropTypes.string,
  likes: PropTypes.number,
  commentsCount: PropTypes.number,
  description: PropTypes.string,
  imageId: PropTypes.string,
  liked: PropTypes.bool,
  likePost: PropTypes.func,
  unlikePost: PropTypes.func,
};
