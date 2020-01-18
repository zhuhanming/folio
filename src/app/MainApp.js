/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import Navbar from 'components/navbar';
import Main from 'routes/main';
import { MAIN, ROOT } from 'constants/routes';

import './App.scss';

const redirectToMain = () => <Redirect to={MAIN} />;

const AuthenticatedApp = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Switch>
          <Route exact path={MAIN} component={Main} />
          {/* <Route exact path={ROOT} component={Landing} /> */}
          <Route exact path={ROOT} render={redirectToMain} />
        </Switch>
      </div>
    </Router>
  );
};

export default AuthenticatedApp;
