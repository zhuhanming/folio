import React from 'react';

import './Title.scss';

const StaticTitle = ({ component }) => {
  const { text } = component;

  return (
    <div className="portfolio-title">
      <h1 className="portfolio-title__input title">{text}</h1>
    </div>
  );
};

export default StaticTitle;
