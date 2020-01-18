import React from 'react';

import { useSidebar } from 'contexts/SidebarContext';

import './RightBar.scss';

const RightBar = () => {
  const { isSidebarShown } = useSidebar();

  return (
    <div className={`right-bar ${isSidebarShown ? '' : 'hidden'}`}>
      This is the rightbar.
    </div>
  );
};
export default RightBar;
