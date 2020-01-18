import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { MAIN } from 'constants/routes';
import { useSidebar } from 'contexts/SidebarContext';
import ApiService from 'services/apiService';
import { generateName } from 'utils/nameUtils';
import NavbarLogo from 'assets/images/navbarLogo';

import './Navbar.scss';

const Navbar = () => {
  const { toggleSidebar } = useSidebar();
  const components = useSelector(state => state.components);

  const onComplete = async () => {
    try {
      const responses = await ApiService.post('/pages', {
        newName: generateName(),
        pageJson: {
          ...components
        }
      });
      if (responses.status === 200) {
        toast.success(
          'Success! You can now view your page at some random url!'
        );
      } else if (responses.status === 400) {
        toast.error(
          'Please use a different url! The url you wanted already exists.'
        );
      } else {
        toast.error('Something went wrong... Please try again.');
      }
    } catch (error) {
      toast.error(
        "Something went wrong! Please refresh your page. Don't worry, your information won't disappear."
      );
    }
  };

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link className="navbar-item navbar__logo" to={MAIN}>
          <NavbarLogo />
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
    </nav>
  );
};

export default Navbar;
