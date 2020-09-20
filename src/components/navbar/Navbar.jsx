import React from 'react';
import { useDispatch } from 'react-redux';

import { EXAMPLES, MAIN } from 'constants/routes';
import { useSidebar } from 'contexts/SidebarContext';
import { useTemplate } from 'contexts/TemplateContext';
import { resetState } from 'reducers/componentDux';
import { SITE_URL } from 'constants/urls';
import { useModal } from 'contexts/ModalContext';

import './Navbar.scss';

const Navbar = ({
  showButtons = true,
  isExamples = false,
  isExample = false,
  isMobile,
  pathname = '',
}) => {
  const dispatch = useDispatch();
  const { toggleSidebar } = useSidebar();
  const { setCurrentTemplate } = useTemplate();
  const { toggleModal } = useModal();

  const resetStatePromise = (myDispatch) =>
    new Promise((resolve, _reject) => {
      myDispatch(resetState());
      resolve();
    });

  const onReset = () => {
    const confirmReset = window.confirm(
      'Are you sure you want to reset this portfolio? You will not be able to undo this action.'
    );
    if (confirmReset) {
      resetStatePromise(dispatch).then(() => window.location.reload());
    }
  };

  const exampleMessage = () => {
    if (isExamples) return 'Back to Editing!';
    if (isExample) return 'View Other Examples!';
    return 'View Example Sites!';
  };

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item navbar__logo" href={`${SITE_URL}${MAIN}`}>
          FOLIO
        </a>
        {(showButtons || (isExamples && !isMobile) || isExample) && (
          <div className="navbar-item">
            <div className="buttons">
              <a
                type="button"
                className="button is-dark"
                href={`${SITE_URL}${isExamples ? MAIN : EXAMPLES}`}
              >
                {exampleMessage()}
              </a>
            </div>
          </div>
        )}
      </div>
      {showButtons && (
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <button
                type="button"
                className="button is-danger"
                onClick={onReset}
              >
                Reset
              </button>
            </div>
          </div>
          <div className="navbar-item">
            <div className="buttons">
              <button
                type="button"
                className="button is-light"
                onClick={toggleSidebar}
              >
                Sidebar
              </button>
            </div>
          </div>
          <div className="navbar-item">
            <div className="buttons">
              <button
                type="button"
                className="button is-primary"
                onClick={toggleModal}
              >
                Complete
              </button>
            </div>
          </div>
        </div>
      )}
      {isExample && !isMobile && (
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <button
                type="button"
                className="button is-info"
                onClick={() => setCurrentTemplate(pathname)}
              >
                Use this Template
              </button>
            </div>
          </div>
        </div>
      )}
      {isExamples && !isMobile && (
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <button
                type="button"
                className="button is-primary"
                onClick={toggleModal}
              >
                Showcase Your Site!
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
