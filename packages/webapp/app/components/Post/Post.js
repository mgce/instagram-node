import React from "react";
import PropTypes from "prop-types";
import {httpClient} from "utils/httpClient"
export default class Post extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: null
    }
  }
componentDidMount(){
  httpClient({
    method:'GET',
    url: `image/download/${this.props.imageId}`,
  }).then(response =>{
    this.setState({imageUrl:response.data.url})
  })
}
  render() {
    return (
      <div className="home-page">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{this.props.username}</h5>
          </div>
          <img
            src={this.state.imageUrl}
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
