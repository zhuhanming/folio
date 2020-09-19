import React from 'react';

import StaticImagePreview from './ImagePreview/StaticImagePreview';

import './Image.scss';

const StaticImage = ({ component }) => {
  const { images } = component;

  const isEmpty = images.every((ele) => ele === '');

  if (isEmpty) return <></>;

  return (
    <div className="portfolio-image ">
      <div
        className={`portfolio-image__body static-portfolio-image ${
          images.some((ele) => ele !== '') ? 'has-content' : ''
        }`}
      >
        {images.map((image) =>
          image === '' ? (
            <></>
          ) : (
            <StaticImagePreview
              component={component}
              image={image}
              size={images.length}
            />
          )
        )}
      </div>
    </div>
  );
};

export default StaticImage;
