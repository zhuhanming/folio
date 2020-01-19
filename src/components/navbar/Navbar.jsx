import React, { useReducer } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Modal from 'components/modal';
import { MAIN } from 'constants/routes';
import { useSidebar } from 'contexts/SidebarContext';
import ApiService from 'services/apiService';
import { generateName } from 'utils/nameUtils';
import { resetState } from 'reducers/componentDux';
import { SITE_URL } from 'constants/urls';

import './Navbar.scss';

const Navbar = ({ showButtons = true }) => {
  const [navbarState, setNavbarState] = useReducer((s, a) => ({ ...s, ...a }), {
    isLoading: false,
    websiteName: generateName(),
    isModalOpen: false,
    isError: false
  });
  const dispatch = useDispatch();
  const { toggleSidebar } = useSidebar();
  const components = useSelector(state => state.components);

  const onComplete = async () => {
    setNavbarState({
      isLoading: true,
      isModalOpen: true,
      isError: false
    });
    try {
      const responses = await ApiService.post('/pages', {
        newName: navbarState.websiteName,
        pageJson: JSON.stringify({
          ...components
        })
      });
      if (responses.status === 200) {
        setNavbarState({ isLoading: false });
      } else {
        setNavbarState({
          isLoading: false,
          isError: true
        });
      }
    } catch (error) {
      setNavbarState({
        isLoading: false,
        isError: true
      });
    }
  };

  const onReset = () => {
    const confirmReset = window.confirm(
      'Are you sure you want to reset this portfolio? You will not be able to undo this action.'
    );
    if (confirmReset) {
      dispatch(resetState());
    }
  };

  return (
    <>
      <Modal
        isOpen={navbarState.isModalOpen}
        handleClose={() =>
          setNavbarState({
            isModalOpen: false,
            isLoading: false,
            isError: false
          })
        }
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
                  href={`${SITE_URL}/static?code=${navbarState.websiteName}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >{`${SITE_URL}/static?code=${navbarState.websiteName}`}</a>
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
          <Link className="navbar-item navbar__logo" to={MAIN}>
            FOLIO
          </Link>
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
      </nav>
    </>
  );
};

export default Navbar;
