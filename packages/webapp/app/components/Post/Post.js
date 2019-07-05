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
    this.parseDescription = this.parseDescription.bind(this);
  }

  componentDidMount() {
    httpClient({
      method: 'GET',
      url: `image/download/${this.props.imageId}`,
    }).then(response => {
      this.setState({ imageUrl: response.data.url });
    });
  }

  onFieldChanged(event) {
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
    this.setState(() => ({ commentDescription: '' }));
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

  parseDescription() {
    const wordArr = this.props.description.split(' ');
    const newWordArr = wordArr.map(word => {
      if (!word.startsWith('#')) return word;
      const newWord = `<b>${word}</b>`;
      return newWord;
    });
    return newWordArr.join(' ');
  }

  render() {
    const {
      author,
      likesCount,
      commentsCount,
      description,
      liked,
      comments,
    } = this.props;
    const { imageUrl, commentsFormExpanded, commentDescription } = this.state;

    const IconText = ({ type, text, onClick }) => (
      <span onClick={onClick} role="link">
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    );

    const likeIcon = liked ? (
      <IconText type="dislike" text={likesCount} onClick={this.unlikePost} />
    ) : (
      <IconText type="like" text={likesCount} onClick={this.likePost} />
    );

    return (
      <>
        <Card
          cover={<img src={imageUrl} alt="test" />}
          actions={[
            likeIcon,
            <IconText
              key={1}
              type="message"
              text={commentsCount}
              onClick={this.expandComments}
            />,
          ]}
        >
          <Card.Meta title={author} />
          <p dangerouslySetInnerHTML={{ __html: this.parseDescription() }} />
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
  comments: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  addComment: PropTypes.func,
};
