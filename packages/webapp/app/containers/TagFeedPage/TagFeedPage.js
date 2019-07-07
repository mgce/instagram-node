import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import './style.scss';
import Post from 'components/Post';
import { Card, Icon } from 'antd';
import { httpClient } from 'utils/httpClient';
import Thumbnail from 'components/Thumbnail';

export default class TagFeedPage extends React.PureComponent {
  componentDidMount() {
    const { tagName } = this.props.match.params;
    this.props.loadTag(tagName);
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
                    imageId={tagPost.imageId}
                    likesCount={tagPost.likesCount}
                    commentsCount={tagPost.commentsCount}
                  />
                ))
            : null}
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
