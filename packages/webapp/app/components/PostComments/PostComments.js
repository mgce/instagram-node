import React from 'react';
import PropTypes from 'prop-types';
import {
  List, Input, Form, Button,
} from 'antd';

export default class PostComments extends React.PureComponent {
  render() {
    const {
      comments,
      commentDescription,
      onFieldChanged,
      addComment,
    } = this.props;
    return (
      <>
        <List
          itemLayout="vertical"
          size="large"
          dataSource={comments}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                description={item.description}
                title={item.username}
              />
            </List.Item>
          )}
        />
        <Form layout="horizontal" onSubmit={addComment}>
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
      </>
    );
  }
}

PostComments.propTypes = {
  comments: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  commentDescription: PropTypes.string,
  onFieldChanged: PropTypes.func,
  addComment: PropTypes.func,
};
