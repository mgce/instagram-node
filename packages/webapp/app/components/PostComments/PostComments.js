import React from 'react';
import PropTypes from 'prop-types';
import {
  List, Input, Form, Button, Icon
} from 'antd';
import './style.scss';

export default class PostComments extends React.PureComponent {
  constructor(props){
    super(props);
    this.renderFooter = this.renderFooter.bind(this);
  }
  renderFooter(){
    const {
      commentDescription,
      onFieldChanged,
      addComment,
    } = this.props;
    return(
      <Form layout="vertical" onSubmit={addComment}>
          <Form.Item>
            <Input.TextArea
              autosize="true"
              name="commentDescription"
              onChange={onFieldChanged}
              value={commentDescription}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Comment
            </Button>
          </Form.Item>
        </Form>
    )
  }
  render() {
    const {
      comments,
      currentUserId
    } = this.props;
    return (
      <div className="comments-list">
        <List
          size="small"
          dataSource={comments}
          renderItem={item => (
            <List.Item rowKey={item.id}>
              <span><b>{item.username}:</b> {item.description}</span>
              {currentUserId === item.userid ? 
              <Icon type="close" style={{ marginLeft: "auto", marginRight: "0"}} />
            : null
            }
              </List.Item>
          )}
          footer={this.renderFooter()}
        />
      </div>
    );
  }
}

PostComments.propTypes = {
  comments: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  commentDescription: PropTypes.string,
  onFieldChanged: PropTypes.func,
  addComment: PropTypes.func,
};
