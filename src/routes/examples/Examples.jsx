import React from 'react';

import StaticDescription from 'components/description/StaticDescription';
import StaticSubtitle from 'components/subtitle/StaticSubtitle';
import StaticTitle from 'components/title/StaticTitle';
import StaticMessage from 'components/message/StaticMessage';
import ComponentRenderer from 'components/componentRenderer';

import Container from 'components/container';
import { renderCommunity, renderTemplates } from 'utils/exampleUtils';
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
      <Container>
        <ComponentRenderer components={templates[template]} />
      </Container>
    );
  }

  return (
    <Container>
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
      {renderTemplates(templates)}
      <StaticSubtitle key="community-subtitle" component={communitySubtitle} />
      <StaticDescription
        key="community-description"
        component={communityDescription}
      />
      {renderCommunity(community)}
      {Object.keys(community).length === 0 && (
        <StaticMessage
          index="empty-community-message"
          component={communityNoSitesMessage}
        />
      )}
    </Container>
  );
};

export default Examples;
