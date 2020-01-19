import React from 'react';

import './Video.scss';

const StaticVideo = ({ component }) => {
  const { url } = component;

  if (url === '') return <></>;

  return (
    <div className="portfolio-video">
      <div className="portfolio-video__video">
        <iframe
          title={component.id}
          className="iframe-video-static"
          src={url}
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default StaticVideo;
