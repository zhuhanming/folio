import React from 'react';

import './Music.scss';

const StaticMusic = ({ component }) => {
  const { url } = component;

  return (
    <div className="portfolio-music">
      {url === '' && <></>}
      {url !== '' && (
        <div className="portfolio-music__music">
          <iframe
            title={component.id}
            src={url}
            width="100%"
            height="300"
            scrolling="no"
            frameBorder="no"
          />
        </div>
      )}
    </div>
  );
};

export default StaticMusic;
