import React from 'react';

import './Container.scss';
import '../../routes/main/Portfolio/Portfolio.scss';

const Container = ({ children }) => (
  <div className="container__outer">
    <div className="container__inner portfolio">{children}</div>
  </div>
);

export default Container;
