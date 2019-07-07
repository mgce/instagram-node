import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import './style.scss';
import Post from 'components/Post';

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
        {tags.get(tagName)
          ? tags.get(tagName).map(tagPost => (
              <Post
                key={tagPost.id}
                id={tagPost.id}
                author={tagPost.author}
                imageId={tagPost.imageId}
                likesCount={tagPost.likesCount}
                commentsCount={tagPost.commentsCount}
                description={tagPost.description}
                liked={tagPost.liked}
              />
            ))
          : null}
      </div>
    );
  }
}

TagFeedPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  tags: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};
