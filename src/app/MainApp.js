/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation
} from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import Navbar from 'components/navbar';
import Main from 'routes/main';
import Static from 'routes/static';
import { MAIN, ROOT, STATIC } from 'constants/routes';
import Nondesktop from 'routes/nondesktop';

import './App.scss';

const redirectToMain = () => <Redirect to={MAIN} />;

const MainApp = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 1024px)' });
  const { pathname } = useLocation();

  return (
    <Router>
      <div className="app">
        <Navbar showButtons={pathname !== STATIC && !isMobile} />
        <Switch>
          <Route path={`${STATIC}`}>
            <Static />
          </Route>
          <Route exact path={MAIN} component={isMobile ? Nondesktop : Main} />
          <Route exact path={ROOT} render={redirectToMain} />
        </Switch>
      </div>
    </Router>
  );
};

export default MainApp;
