import React from 'react';
import { ModalProvider } from './ModalContext';
import { SidebarProvider } from './SidebarContext';
import { TemplateProvider } from './TemplateContext';

const AppProviders = ({ children }) => (
  <SidebarProvider>
    <TemplateProvider>
      <ModalProvider>{children}</ModalProvider>
    </TemplateProvider>
  </SidebarProvider>
);

export default AppProviders;
