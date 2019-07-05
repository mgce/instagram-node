import React from 'react';
import { Link } from 'react-router-dom';
import Banner from './images/banner.jpg';
import './style.scss';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

// class Header extends React.Component {
//   // eslint-disable-line react/prefer-stateless-function
//   render() {
//     return (
//       <nav className="navbar navbar-expand-lg navbar-light">
//         <Link className="navbar-brand mb-0 h1" to="/">
//           Instaclone
//         </Link>
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-toggle="collapse"
//           data-target="#navbarSupportedContent"
//           aria-controls="navbarSupportedContent"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon" />
//         </button>
//         <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
//           <ul className="navbar-nav">
//             <li className="nav-item active">
//               <Link className="router-link nav-link" to="/add">
//                 Add post
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </nav>
//     );
//   }
// }

function Header(){
  return (
    <Layout.Header className="header">
    <div className="logo" />
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={['2']}
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
