import React from 'react';
import { SidebarProvider } from './SidebarContext';
import { TemplateProvider } from './TemplateContext';

const AppProviders = ({ children }) => {
  return (
    <SidebarProvider>
      <TemplateProvider>{children}</TemplateProvider>
    </SidebarProvider>
  );
};

export default AppProviders;
