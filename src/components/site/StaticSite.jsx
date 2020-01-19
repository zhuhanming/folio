/* eslint-disable no-nested-ternary */
import React from 'react';

import StaticSiteContent from './SiteContent/StaticSiteContent';

import './Site.scss';

const Site = ({ component }) => {
  const { sites } = component;

  return (
    <div className="portfolio-site">
      <div className="portfolio-site__body">
        {sites.map(site =>
          site.url === '' ? (
            <></>
          ) : (
            <StaticSiteContent component={component} site={site} />
          )
        )}
      </div>
    </div>
  );
};

export default Site;
