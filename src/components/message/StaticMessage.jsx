import React from 'react';

import './Message.scss';

const StaticMessage = ({ component }) => {
  const { text } = component;

  return (
    <div className="portfolio-message">
      <div className="message is-dark portfolio-message__container">
        <div className="message-body portfolio-message__body">
          <p className="portfolio-message__input is-size-6">{text}</p>
        </div>
      </div>
    </div>
  );
};

export default StaticMessage;
