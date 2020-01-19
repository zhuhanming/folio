import React from 'react';
import { useSelector } from 'react-redux';

import StaticTitle from 'components/title/StaticTitle';
import StaticSubtitle from 'components/subtitle/StaticSubtitle';
import StaticImage from 'components/image/StaticImage';
import StaticCaption from 'components/caption/StaticCaption';
import StaticDescription from 'components/description/StaticDescription';
import StaticMessage from 'components/message/StaticMessage';
import StaticVideo from 'components/video/StaticVideo';
import StaticSite from 'components/site/StaticSite';
import StaticCode from 'components/code/StaticCode';

import '../main/Main.scss';

const Static = () => {
  const components = useSelector(state => state.components.components);
  const componentOrder = useSelector(state => state.components.componentOrder);

  return (
    <div className="main">
      <div className="portfolio">
        {componentOrder.map(componentId => {
          const component = components[componentId];
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
              return (
                <StaticDescription key={componentId} component={component} />
              );
            case 'message':
              return <StaticMessage key={componentId} component={component} />;
            case 'video':
              return <StaticVideo key={componentId} component={component} />;
            case 'site':
              return <StaticSite key={componentId} component={component} />;
            case 'code':
              return <StaticCode key={componentId} component={component} />;
            default:
              return <></>;
          }
        })}
      </div>
    </div>
  );
};

export default Static;
