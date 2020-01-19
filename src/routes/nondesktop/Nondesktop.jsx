import React from 'react';

import Navbar from 'components/navbar';

import './Nondesktop.scss';

const Nondesktop = () => {
  return (
    <div className="non-desktop">
      <Navbar isDesktop={false} />
      <div className="columns">
        <div className="column is-full">
          <article className="message is-info">
            <div className="message-header">
              <p>Welcome to Folio</p>
            </div>
            <div className="message-body">
              Unfortunate, we currently do not support non-desktop usage. We
              strongly recommend you to try our app on your computer. Thank you
              for understanding.
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default Nondesktop;