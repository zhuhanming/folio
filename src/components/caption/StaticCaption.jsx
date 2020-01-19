import React from 'react';

import './Caption.scss';

const StaticCaption = ({ component }) => {
  const { text } = component;

  return (
    <div className="portfolio-caption">
      <p className="portfolio-caption__input caption is-size-6">{text}</p>
    </div>
  );
};

export default StaticCaption;
