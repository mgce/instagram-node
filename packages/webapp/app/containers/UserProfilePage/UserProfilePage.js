import React from 'react';
import PropTypes from 'prop-types';

export default class UserProfilePage extends React.PureComponent {
  componentDidMount() {
    const { userId } = this.props.match.params;
    this.props.getUserPosts(userId);
  }
  render() {
    return <div>User Profile</div>;
  }
}
