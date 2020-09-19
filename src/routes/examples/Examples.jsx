import React from 'react';

import StaticDescription from 'components/description/StaticDescription';
import StaticSubtitle from 'components/subtitle/StaticSubtitle';
import StaticTitle from 'components/title/StaticTitle';
import StaticSite from 'components/site/StaticSite';
import StaticMessage from 'components/message/StaticMessage';
import ComponentRenderer from 'components/componentRenderer';
import { SITE_URL } from 'constants/urls';

import { EXAMPLES } from 'constants/routes';
import {
  communityDescription,
  communityNoSitesMessage,
  communitySubtitle,
  exampleDescription,
  exampleTitle,
  templateDescription,
  templateSubtitle,
} from './components';
import templates from './templates';
import community from './communityExamples';

import './Examples.scss';
import '../static/Static.scss';

const Examples = (props) => {
  const id = props?.match?.params?.id ?? undefined;

  if (id) {
    const template = Object.keys(templates)[parseInt(id, 10) - 1];
    return (
      <div className="static">
        <div className="static__portfolio portfolio">
          <ComponentRenderer components={templates[template]} />
        </div>
      </div>
    );
  }

  const pairUp = (keys) => {
    const result = [];
    for (let i = 0; i < keys.length; i += 2) {
      const pair = [keys[i]];
      if (keys[i + 1]) {
        pair.push(keys[i + 1]);
      }
      result.push(pair);
    }
    return result;
  };

  return (
    <div className="static">
      <div className="static__portfolio portfolio">
        <StaticTitle key="example-title" component={exampleTitle} />
        <StaticDescription
          key="example-description"
          component={exampleDescription}
        />
        <StaticSubtitle key="template-subtitle" component={templateSubtitle} />
        <StaticDescription
          key="template-description"
          component={templateDescription}
        />
        {pairUp(Object.keys(templates)).map((keys, index) => (
          <StaticSite
            key={`template-${keys[0]}${keys[1] ? `-${keys[1]}` : ''}`}
            component={{
              sites: keys.map((key, indexTwo) => ({
                image: templates[key].imageUrl,
                text: templates[key].components.defaultTitle.text,
                url: `${SITE_URL}${EXAMPLES}/${index * 2 + indexTwo + 1}`,
              })),
            }}
          />
        ))}
        <StaticSubtitle
          key="community-subtitle"
          component={communitySubtitle}
        />
        <StaticDescription
          key="community-description"
          component={communityDescription}
        />
        {pairUp(Object.keys(community)).map((keys) => (
          <StaticSite
            key={`community-${keys[0]}${keys[1] ? `-${keys[1]}` : ''}`}
            component={{
              sites: keys.map((key) => ({
                image: community[key].imageUrl,
                text: community[key].components.defaultTitle.text,
                url: community[key].siteUrl,
              })),
            }}
            openInNewTab={false}
          />
        ))}
        {Object.keys(community).length === 0 && (
          <StaticMessage
            index="empty-community-message"
            component={communityNoSitesMessage}
          />
        )}
      </div>
    </div>
  );
};

export default Examples;
