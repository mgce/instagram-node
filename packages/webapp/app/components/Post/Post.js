/* eslint-disable react/jsx-key */
import React from 'react';
import PropTypes from 'prop-types';
import { httpClient } from 'utils/httpClient';
import { Card, Icon, List } from 'antd';

export default class Post extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: null,
      commentsExpanded: false,
    };
    this.likePost = this.likePost.bind(this);
    this.unlikePost = this.unlikePost.bind(this);
    this.expondComments = this.expondComments.bind(this);
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

  expondComments() {
    this.setState((prevState) => ({
      commentsExpanded: !prevState.commentsExpanded,
    }));
    this.props.loadComments(this.props.id);
  }

  render() {
    const {
      author, likes, description, commentsCount, liked, comments 
    } = this.props;
    const { imageUrl } = this.state;
    const likeIcon = liked ? <Icon type="dislike" onClick={this.unlikePost} /> : <Icon type="like" onClick={this.likePost} />;
    const iconWithCount = (likeCount, icon) => (<div className="d-inline"> <p>{likeCount}</p>{icon}</div>);
    return (
      <>
        <Card
          cover={
            <img src={imageUrl} alt="test" />
          }
          actions={[iconWithCount(likes, likeIcon), iconWithCount(commentsCount, <Icon type="message" onClick={this.expondComments} />)]}
        >
          <Card.Meta
            title={author}
            description={description}
          />
        </Card>
        <List
          itemLayout="vertical"
          size="large"
          dataSource={comments}
          renderItem={(item) => (
            <List.Item></List.Item>
          )}
        >

        </List>
      </>
    );
  }
}


Post.propTypes = {
  id: PropTypes.number,
  author: PropTypes.string,
  likes: PropTypes.number,
  commentsCount: PropTypes.number,
  description: PropTypes.string,
  imageId: PropTypes.string,
  liked: PropTypes.bool,
  likePost: PropTypes.func,
  unlikePost: PropTypes.func,
  loadComments: PropTypes.func,
  comments: PropTypes.array,
};
