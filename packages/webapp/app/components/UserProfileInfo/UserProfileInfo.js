import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const UserProfileInfo = props => (
  <div className="user-profile container">
    <h2 className="user-profile-username">{props.username}</h2>
    <div className="user-profile-stats">
      <div className="user-profile-stats-item">
        <strong>{props.posts} </strong>
        Posts
      </div>
      <div className="user-profile-stats-item">
        <strong>{props.followers} </strong>
        Followers
      </div>
      <div className="user-profile-stats-item">
        <strong>{props.following} </strong>
        Following
      </div>
    </div>
  </div>
);

export default UserProfileInfo;
