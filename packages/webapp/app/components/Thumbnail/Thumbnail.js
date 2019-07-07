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
    }
  
    componentDidMount() {
      httpClient({
        method: 'GET',
        url: `image/download/${this.props.imageId}`,
      }).then(response => {
        this.setState({ imageUrl: response.data.url });
      });
    }
  
    render() {
      const { likesCount, commentsCount } = this.props;
  
      return (
        <div className="thumbnail-wrapper">
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
        </div>
      );
    }
  }
  
  Thumbnail.propTypes = {
    likesCount: PropTypes.number,
    commentsCount: PropTypes.number,
    imageId: PropTypes.string,
  };