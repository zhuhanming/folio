import React from 'react';

import './Subtitle.scss';

const StaticSubtitle = ({ component }) => {
  const { text } = component;

  return (
    <div className="portfolio-subtitle">
      <h3 className="portfolio-subtitle__input subtitle">{text}</h3>
    </div>
  );
};

export default StaticSubtitle;
