import React, { useEffect, useState, useReducer } from 'react';
import { useLocation } from 'react-router-dom';
import qs from 'qs';

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
import ApiService from 'services/apiService';
import Loading from 'components/loading';

import '../main/Main.scss';

const Static = () => {
  const location = useLocation();
  const [components, setComponents] = useState(null);
  const [state, setState] = useReducer((s, a) => ({ ...s, ...a }), {
    isLoading: true,
    isError: false
  });
  const { code } = qs.parse(location.search, {
    ignoreQueryPrefix: true
  });
  // const components = useSelector(state => state.components.components);
  // const componentOrder = useSelector(state => state.components.componentOrder);

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      try {
        const responses = await ApiService.get(`pages?name=${code}`);
        if (!didCancel) {
          setComponents(JSON.parse(responses.data.page.pageJson));
          setState({ isLoading: false });
        }
      } catch (error) {
        if (!didCancel) {
          setState({ isLoading: false, isError: true });
        }
      }
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [code]);

  if (state.isLoading) return <Loading />;
  if (state.isError)
    return (
      <div className="columns">
        <div className="column is-full">
          <article className="message is-danger">
            <div className="message-body">
              An error has occurred. Please reload the page.
            </div>
          </article>
        </div>
      </div>
    );

  return (
    <div className="main">
      <div className="portfolio">
        {components.componentOrder.map(componentId => {
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
              return (
                <StaticDescription key={componentId} component={component} />
              );
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
      </div>
    </div>
  );
};

export default Static;
