import React from 'react';

import StaticTitle from 'components/title/StaticTitle';
import StaticSubtitle from 'components/subtitle/StaticSubtitle';
import StaticImage from 'components/image/StaticImage';
import StaticCaption from 'components/caption/StaticCaption';
import StaticDescription from 'components/description/StaticDescription';
import StaticMessage from 'components/message/StaticMessage';
import StaticVideo from 'components/video/StaticVideo';
import StaticSite from 'components/site/StaticSite';
import StaticCode from 'components/code/StaticCode';
import StaticMusic from 'components/music/StaticMusic';

const ComponentRenderer = ({ components }) => (
  <>
    {components.componentOrder.map((componentId) => {
      const component = components.components[componentId];
      switch (component.type) {
        case 'title':
          return <StaticTitle key={componentId} component={component} />;
        case 'subtitle':
          return <StaticSubtitle key={componentId} component={component} />;
        case 'image':
          return <StaticImage key={componentId} component={component} />;
        case 'caption':
          return <StaticCaption key={componentId} component={component} />;
        case 'description':
          return <StaticDescription key={componentId} component={component} />;
        case 'message':
          return <StaticMessage key={componentId} component={component} />;
        case 'video':
          return <StaticVideo key={componentId} component={component} />;
        case 'music':
          return <StaticMusic key={componentId} component={component} />;
        case 'site':
          return <StaticSite key={componentId} component={component} />;
        case 'code':
          return <StaticCode key={componentId} component={component} />;
        default:
          return <></>;
      }
    })}
  </>
);

export default ComponentRenderer;
