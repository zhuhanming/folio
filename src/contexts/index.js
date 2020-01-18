import React from 'react';
import { SidebarProvider } from './SidebarContext';

const AppProviders = ({ children }) => {
  return <SidebarProvider>{children}</SidebarProvider>;
};

export default AppProviders;
