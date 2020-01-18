import React from 'react';
import { Lottie } from '@crello/react-lottie';
import FadeIn from 'react-fade-in';

import animationData from 'assets/animations/loading.json';

import './Loading.scss';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

const Loading = ({ className = '' }) => {
  return (
    <div className={`loading ${className}`}>
      <FadeIn>
        <Lottie config={defaultOptions} width="auto" height="auto" />
      </FadeIn>
    </div>
  );
};

export default Loading;
