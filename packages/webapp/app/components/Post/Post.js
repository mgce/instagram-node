/* eslint-disable react/jsx-key */
import React from 'react';
import PropTypes from 'prop-types';
import { httpClient } from 'utils/httpClient';
import {
  Card, Icon, List, Input, Form, Button
} from 'antd';

export default class Post extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: null,
      commentsFormExpanded: false,
    };
    this.likePost = this.likePost.bind(this);
    this.unlikePost = this.unlikePost.bind(this);
    this.expandComments = this.expandComments.bind(this);
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

  expandComments() {
    this.setState((prevState) => ({
      commentsFormExpanded: !prevState.commentsFormExpanded,
    }));

    if (this.state.commentsFormExpanded) { this.props.loadComments(this.props.id); }
  }

  render() {
    const {
      author, likes, description, commentsCount, liked, comments
    } = this.props;
    const { imageUrl, commentsFormExpanded } = this.state;
    // const iconWithCount = (likeCount, icon) => (<div className="d-inline"> <p>{likeCount}</p>{icon}</div>);
    const IconText = ({ type, text, onClick }) => (
      <span onClick={onClick} role="button" >
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    );

    const likeIcon = liked ? <IconText type="dislike" text={likes} onClick={this.unlikePost} /> : <IconText type="like" text={likes} onClick={this.likePost} />;

    const CommentForm = () => (
      <>
        <List
          itemLayout="vertical"
          size="large"
          dataSource={comments}
          renderItem={(item) => (
            <List.Item></List.Item>
          )}
        >

        </List>
        <Form layout="horizontal">
          <Form.Item>
            <Input.TextArea row={4} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
                  Add Comment
            </Button>
          </Form.Item>
        </Form>
      </>
    );

    return (
      <>
        <Card
          cover={
            <img src={imageUrl} alt="test" />
          }
          actions={[likeIcon, <IconText type="message" text={commentsCount} onClick={this.expandComments} />]}
        >
          <Card.Meta
            title={author}
            description={description}
          />
        </Card>
        {commentsFormExpanded ? <CommentForm /> : null}
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
