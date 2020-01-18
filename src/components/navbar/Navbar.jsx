import React from 'react';
import { Link } from 'react-router-dom';

import { MAIN } from 'constants/routes';
import { useSidebar } from 'contexts/SidebarContext';

import './Navbar.scss';

const Navbar = () => {
  const { toggleSidebar } = useSidebar();
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link className="navbar-item navbar__logo" to={MAIN}>
          Folio
        </Link>
      </div>

      <div className="navbar-end">
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
            <button type="button" className="button is-primary">
              Complete
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
