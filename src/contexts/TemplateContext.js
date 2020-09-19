import React from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import { EXAMPLES, MAIN } from 'constants/routes';
import templates from 'routes/examples/templates';
import {
  setComponentCounter,
  setComponentOrder,
  setComponents,
} from 'reducers/componentDux';

const TemplateContext = React.createContext();

const TemplateProvider = (props) => {
  const dispatch = useDispatch();

  const setCurrentTemplate = (pathname) => {
    const splitPathname = pathname.split(EXAMPLES, 2);
    if (splitPathname.length < 2) {
      toast.error('You are currently not viewing any templates!');
      return;
    }
    // eslint-disable-next-line no-alert
    const confirmReplace = window.confirm(
      'Using this template will replace any ongoing work you might have! Are you sure you wish to continue?'
    );
    if (!confirmReplace) {
      return;
    }
    const id = parseInt(splitPathname[1].replace('/', ''), 10);
    const template = templates[Object.keys(templates)[id - 1]];
    dispatch(setComponents(template.components));
    dispatch(setComponentOrder(template.componentOrder));
    dispatch(setComponentCounter(template.setComponentCounter));
    window.location.href = MAIN;
  };
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <TemplateContext.Provider value={{ setCurrentTemplate }} {...props} />;
};

const useTemplate = () => {
  const context = React.useContext(TemplateContext);
  if (context === undefined) {
    throw new Error(`useTemplate must be used within a TemplateProvider`);
  }
  return context;
};

export { TemplateProvider, useTemplate };
