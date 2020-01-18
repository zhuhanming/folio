import React, { useState } from 'react';

const SidebarContext = React.createContext();

const SidebarProvider = props => {
  const [isSidebarShown, setIsSidebarShown] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarShown(!isSidebarShown);
  };
  // eslint-disable-next-line react/jsx-props-no-spreading
  return (
    <SidebarContext.Provider
      value={{ isSidebarShown, toggleSidebar }}
      {...props}
    />
  );
};

const useSidebar = () => {
  const context = React.useContext(SidebarContext);
  if (context === undefined) {
    throw new Error(`useSidebar must be used within a SidebarProvider`);
  }
  return context;
};

export { SidebarProvider, useSidebar };
