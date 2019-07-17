import React from 'react';
import { Link } from 'react-router-dom';
import Banner from './images/banner.jpg';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import './style.scss';

function Header(props) {
  const userExist = () => (
    props.user
  )
  const renderLoggedMenu = () => {
    return (
      <div className="header-link-group form-inline">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/add">
              <strong>Add post</strong>
            </Link>
          </li>
          <li className="nav-item">
            <a className="nav-link" onClick={() => props.logout()}>
              Logout
            </a>
          </li>
        </ul>
      </div>
    );
  };
  const renderNotLoggedMenu = () => {
    return (
      <div className="header-link-group form-inline">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              Login in
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/register">
              Register
            </Link>
          </li>
        </ul>
      </div>
    );
  };
  return (
    <div className="navbar navbar-expand-lg header">
      <div className="container">
        <div className="navbar-brand header-logo">
          <Link to="/">Instaclone</Link>
        </div>
        {userExist()
          ? renderLoggedMenu()
          : renderNotLoggedMenu()}
      </div>
    </div>
  );
}

export default Header;
