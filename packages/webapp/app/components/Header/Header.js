import React from 'react';
import { Link } from 'react-router-dom';
import Banner from './images/banner.jpg';
import './style.scss';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

function Header(){
  return (
    <Layout.Header className="header">
    <div className="logo" />
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={['1']}
      style={{ lineHeight: '64px' }}
      >
      <Menu.Item key="1">
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/add">Add post</Link>
      </Menu.Item>
    </Menu>
  </Layout.Header>
  )
}

export default Header;
