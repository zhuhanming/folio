import React from 'react';

import './Video.scss';

const StaticVideo = ({ component }) => {
  const { url } = component;

  return (
    <div className="portfolio-video">
      {url === '' && <></>}
      {url !== '' && (
        <div className="portfolio-video__video">
          <iframe
            title={component.id}
            className="iframe-video-static"
            src={url}
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
};

export default StaticVideo;
