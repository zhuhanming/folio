/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';

import './SiteContent.scss';

const StaticSiteContent = ({ site, component }) => {
  const { image, text, url } = site;

  return (
    <div className="site-preview__container">
      <div className="site-preview__flex overlay">
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
        <img
          className="image site-preview"
          src={
            image === ''
              ? 'https://res.cloudinary.com/dwbg1zcql/image/upload/v1579400434/placeholder-images-image_large_j633uq.png'
              : image
          }
          alt={component.id}
          onClick={() => window.open(url, '_blank')}
        />
      </div>
      <p className="site-preview__input is-size-6">{text}</p>
    </div>
  );
};

export default StaticSiteContent;
