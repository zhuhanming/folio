import React from 'react';

import './Code.scss';

const Code = ({ component }) => {
  const { text } = component;

  return (
    <div className="portfolio-code">
      <pre className="code">
        <code>
          <p className="portfolio-code__input code is-size-6">{text}</p>
        </code>
      </pre>
    </div>
  );
};

export default Code;
