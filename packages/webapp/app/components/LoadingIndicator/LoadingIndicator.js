import React from 'react';
import './style.scss';
import { Spin } from 'antd';

const LoadingIndicator = () => (
  // <div className="loading-indicator">
  //   <div />
  //   <div />
  //   <div />
  //   <div />
  //   <div />
  //   <div />
  //   <div />
  //   <div />
  // </div>
  <Spin tip="Loading..."/>
);

export default LoadingIndicator;
