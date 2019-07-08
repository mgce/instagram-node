import React from 'react';
import PropTypes from 'prop-types';
import { Card, Icon } from 'antd';
import { httpClient } from 'utils/httpClient';
import './style.scss';

export default class Thumbnail extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        imageUrl: '',
      };
      this.onClick = this.onClick.bind(this);
    }
  
    componentDidMount() {
      httpClient({
        method: 'GET',
        url: `image/download/${this.props.imageId}`,
      }).then(response => {
        this.setState({ imageUrl: response.data.url });
      });
    }
  
    onClick(){
      const post = {
        id: this.props.id,
        imageUrl: this.state.imageUrl,
        author: this.props.author,
        likesCount: this.props.likesCount,
      }
      this.props.onClick(post)
    }

    render() {
      const { likesCount, commentsCount } = this.props;
  
      return (
        <a className="thumbnail-wrapper" onClick={this.onClick}>
          <div
            className="photo-thumbnail"
            style={{
              backgroundImage: `url(${this.state.imageUrl})`,
            }}
          >
            <div className="thumbnail-overlay">
              <span className="thumbnail-icon">
                <Icon type="heart" style={{ marginRight: 8, fontSize: 20 }} />{' '}
                {likesCount}
              </span>
              <span className="thumbnail-icon">
                <Icon type="message" style={{ marginRight: 8, fontSize: 20 }} />{' '}
                {commentsCount}
              </span>
            </div>
          </div>
        </a>
      );
    }
  }
  
  Thumbnail.propTypes = {
    likesCount: PropTypes.number,
    commentsCount: PropTypes.number,
    imageId: PropTypes.string,
  };