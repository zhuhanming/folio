import React, { useReducer, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Modal from 'components/modal';
import { EXAMPLES, MAIN, STATIC } from 'constants/routes';
import { useSidebar } from 'contexts/SidebarContext';
import { useTemplate } from 'contexts/TemplateContext';
import ApiService from 'services/apiService';
import { generateName } from 'utils/nameUtils';
import { resetState } from 'reducers/componentDux';
import { SITE_URL } from 'constants/urls';

import './Navbar.scss';

const Navbar = ({
  showButtons = true,
  isExamples = false,
  isExample = false,
  isMobile,
  pathname = '',
}) => {
  const [navbarState, setNavbarState] = useReducer((s, a) => ({ ...s, ...a }), {
    isLoading: false,
    websiteName: generateName(),
    isModalOpen: false,
    isError: false,
  });
  const [errorTimeout, setErrorTimeout] = useState(undefined);
  const dispatch = useDispatch();
  const { toggleSidebar } = useSidebar();
  const { setCurrentTemplate } = useTemplate();
  const components = useSelector((state) => state.components);

  const onComplete = async () => {
    if (errorTimeout) {
      clearTimeout(errorTimeout);
      setErrorTimeout(undefined);
    }
    setNavbarState({
      isLoading: true,
      isModalOpen: true,
      isError: false,
    });
    try {
      const responses = await ApiService.post('/pages', {
        newName: navbarState.websiteName,
        pageJson: JSON.stringify({
          ...components,
        }),
      });
      if (responses.status === 200) {
        setNavbarState({ isLoading: false });
      } else {
        setNavbarState({
          isLoading: false,
          isError: true,
        });
      }
    } catch (error) {
      setNavbarState({
        isLoading: false,
        isError: true,
      });
    }
  };

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
    <>
      <Modal
        isOpen={navbarState.isModalOpen}
        handleClose={() => {
          setNavbarState({
            isModalOpen: false,
            isLoading: false,
          });
          const t = setTimeout(() => {
            setNavbarState({ isError: false });
          }, 500);
          setErrorTimeout(t);
        }}
      >
        <div className="complete-modal">
          {navbarState.isLoading && <h1 className="title">Loading...</h1>}
          {!navbarState.isLoading && navbarState.isError && (
            <h1 className="title has-text-danger">
              Something went wrong... Try again!
            </h1>
          )}
          {!navbarState.isLoading && !navbarState.isError && (
            <>
              <h1 className="title">Portfolio saved!</h1>
              <h3 className="subtitle complete-modal__description">
                You can access your portfolio at:
                <br />
                <a
                  href={`${SITE_URL}${STATIC}?code=${navbarState.websiteName}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >{`${SITE_URL}${STATIC}?code=${navbarState.websiteName}`}</a>
              </h3>
              <h4>
                Note: If you wish to generate another link, you need to refresh
                the page.
              </h4>
            </>
          )}
        </div>
      </Modal>
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
                  onClick={onComplete}
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
      </nav>
    </>
  );
};

export default Navbar;
