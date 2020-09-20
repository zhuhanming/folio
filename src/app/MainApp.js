/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation,
} from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import Navbar from 'components/navbar';
import { EXAMPLES, MAIN, ROOT, STATIC } from 'constants/routes';
import Main from 'routes/main';
import Static from 'routes/static';
import Nondesktop from 'routes/nondesktop';
import Examples from 'routes/examples';

import './App.scss';

const redirectToMain = () => <Redirect to={MAIN} />;

const MainApp = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 1024px)' });
  const { pathname } = useLocation();

  return (
    <Router>
      <div className="app">
        <Navbar
          showButtons={pathname === MAIN && !isMobile}
          isMobile={isMobile}
          isExamples={pathname === EXAMPLES}
          isExample={
            pathname.split(EXAMPLES, 2).length === 2 &&
            pathname
              .split(EXAMPLES, 2)[1]
              .replace('/', '')
              .match(/[0-9]+/)
          }
          pathname={pathname}
        />
        <Switch>
          <Route path={`${STATIC}`}>
            <Static />
          </Route>
          <Route exact path={EXAMPLES} component={Examples} />
          <Route path={`${EXAMPLES}/:id`} component={Examples} />
          <Route exact path={MAIN} component={isMobile ? Nondesktop : Main} />
          <Route exact path={ROOT} render={redirectToMain} />
        </Switch>
      </div>
    </Router>
  );
};

export default MainApp;
