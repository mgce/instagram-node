import React from 'react';
import { Link } from 'react-router-dom';
import Banner from './images/banner.jpg';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import './style.scss';

function Header() {
  return (
    <div className="navbar header">
      <div className="container">
        <div className="header-logo">
          <Link to="/">Instaclone</Link>
        </div>
          < div className="header-link-group">
            <Link to="/add">Add post</Link>
          </div>
      </div>
    </div>
  );
}

export default Header;
