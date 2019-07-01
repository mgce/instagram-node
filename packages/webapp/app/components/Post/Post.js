import React from 'react';
import PropTypes from 'prop-types';
import { httpClient } from 'utils/httpClient';
import { Card, Icon } from 'antd';
import PostComments from '../PostComments/PostComments';

export default class Post extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: null,
      commentsFormExpanded: false,
      commentDescription: '',
    };
    this.likePost = this.likePost.bind(this);
    this.unlikePost = this.unlikePost.bind(this);
    this.expandComments = this.expandComments.bind(this);
    this.addComment = this.addComment.bind(this);
    this.onFieldChanged = this.onFieldChanged.bind(this);
  }

  componentDidMount() {
    httpClient({
      method: 'GET',
      url: `image/download/${this.props.imageId}`,
    }).then((response) => {
      this.setState({ imageUrl: response.data.url });
    });
  }

  onFieldChanged(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  addComment(event) {
    event.preventDefault();
    const comment = {
      postId: this.props.id,
      description: this.state.commentDescription,
    };
    this.props.addComment(comment);
  }

  likePost() {
    this.props.likePost(this.props.id);
  }

  unlikePost() {
    this.props.unlikePost(this.props.id);
  }

  expandComments() {
    if (!this.state.commentsFormExpanded) {
      this.props.loadComments(this.props.id);
    }
    this.setState(prevState => ({
      commentsFormExpanded: !prevState.commentsFormExpanded,
    }));
  }

  render() {
    const {
      author,
      likes,
      description,
      commentsCount,
      liked,
      comments,
    } = this.props;
    const { imageUrl, commentsFormExpanded, commentDescription } = this.state;
    const IconText = ({ type, text, onClick }) => (
      <span onClick={onClick} role="button">
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    );

    const likeIcon = liked ? (
      <IconText type="dislike" text={likes} onClick={this.unlikePost} />
    ) : (
      <IconText type="like" text={likes} onClick={this.likePost} />
    );

    return (
      <>
        <Card
          cover={<img src={imageUrl} alt="test" />}
          actions={[
            likeIcon,
            <IconText
              type="message"
              text={commentsCount}
              onClick={this.expandComments}
            />,
          ]}
        >
          <Card.Meta title={author} description={description} />
        </Card>
        {commentsFormExpanded ? (
          <PostComments
            comments={comments}
            commentDescription={commentDescription}
            onFieldChanged={this.onFieldChanged}
            addComment={this.addComment}
          />
        ) : null}
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
  comments: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  addComment: PropTypes.func,
  onFieldChanged: PropTypes.func,
};
