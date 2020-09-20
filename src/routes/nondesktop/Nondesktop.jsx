import React from 'react';

import Container from 'components/container';
import StaticTitle from 'components/title/StaticTitle';
import StaticDescription from 'components/description/StaticDescription';
import StaticSubtitle from 'components/subtitle/StaticSubtitle';
import templates from 'routes/examples/templates';
import community from 'routes/examples/communityExamples';
import { renderCommunity, renderTemplates } from 'utils/exampleUtils';

import './Nondesktop.scss';

const Nondesktop = () => {
  return (
    <Container>
      <StaticTitle component={{ text: 'Welcome to Folio!' }} />
      <article className="message is-info">
        <div className="message-body">
          Unfortunately, we currently do not support the creation of portfolios
          on mobile or tablet. We strongly recommend trying our app on your
          computer.
        </div>
      </article>
      <StaticSubtitle
        component={{ text: 'Sample Portfolios Built with Folio' }}
      />
      <StaticDescription
        component={{
          text:
            'Portfolios built with Folio are all perfectly mobile and tablet responsive!',
        }}
      />
      {renderTemplates(templates)}
      {renderCommunity(community)}
    </Container>
  );
};

export default Nondesktop;
