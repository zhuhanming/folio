import React from 'react';

import StaticSite from 'components/site/StaticSite';
import { SITE_URL } from 'constants/urls';
import { EXAMPLES } from 'constants/routes';

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

export const renderTemplates = (templates) =>
  pairUp(Object.keys(templates)).map((keys, index) => (
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
  ));

export const renderCommunity = (community) =>
  pairUp(Object.keys(community)).map((keys) => (
    <StaticSite
      key={`community-${keys[0]}${keys[1] ? `-${keys[1]}` : ''}`}
      component={{
        sites: keys.map((key) => ({
          image: community[key].imageUrl,
          text: community[key].components.defaultTitle.text,
          url: community[key].siteUrl,
        })),
      }}
    />
  ));
