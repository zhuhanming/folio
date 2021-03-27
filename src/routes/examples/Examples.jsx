import React from 'react';

import StaticDescription from 'components/description/StaticDescription';
import StaticSubtitle from 'components/subtitle/StaticSubtitle';
import StaticTitle from 'components/title/StaticTitle';
import StaticMessage from 'components/message/StaticMessage';
import ComponentRenderer from 'components/componentRenderer';

import Container from 'components/container';
import { renderCommunity, renderTemplates } from 'utils/exampleUtils';
import Modal from 'components/modal';
import { useModal } from 'contexts/ModalContext';
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
  // eslint-disable-next-line react/destructuring-assignment
  const id = props?.match?.params?.id ?? undefined;
  const { toggleModal, isModalVisible } = useModal();

  if (id) {
    const template = Object.keys(templates)[parseInt(id, 10) - 1];
    return (
      <Container>
        <ComponentRenderer components={templates[template]} />
      </Container>
    );
  }

  return (
    <>
      <Modal isOpen={isModalVisible} handleClose={toggleModal}>
        <div className="example-modal">
          <h1 className="title">Share your site with the world!</h1>

          <form
            className="example-modal__form"
            name="submit-example"
            method="post"
          >
            <input type="hidden" name="form-name" value="submit-example" />
            <div className="field">
              <label className="label" htmlFor="url">
                URL of your site
              </label>
              <div className="control">
                <input
                  className="input"
                  type="url"
                  name="url"
                  required
                  placeholder="https://folio-hnr.netlify.app/static?code=example"
                />
              </div>
            </div>
            <div className="field">
              <label className="label" htmlFor="url">
                Name for your site
              </label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="name"
                  required
                  placeholder="Name for your site"
                />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <button
                  type="submit"
                  className="example-modal__form--button button is-link"
                >
                  Send it in!
                </button>
              </div>
            </div>
          </form>

          <h4>Note: We will only showcase sites built with Folio</h4>
        </div>
      </Modal>
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
        <StaticSubtitle
          key="community-subtitle"
          component={communitySubtitle}
        />
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
    </>
  );
};

export default Examples;
