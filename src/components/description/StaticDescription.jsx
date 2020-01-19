import React from 'react';

import './Description.scss';

const StaticDescription = ({ component }) => {
  const { text } = component;

  return (
    <div className="portfolio-description">
      <p className="portfolio-caption__input description is-size-6">{text}</p>
    </div>
  );
};

export default StaticDescription;
