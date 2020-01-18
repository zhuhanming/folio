import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

import { useSidebar } from 'contexts/SidebarContext';
import SidebarComponent from 'components/sidebarComponent';

import './LeftBar.scss';

const LeftBar = () => {
  const { isSidebarShown } = useSidebar();
  const leftBarContent = ['title', 'subtitle'];

  return (
    <Droppable droppableId="left-sidebar" type="portfolio">
      {(provided, snapshot) => (
        <div
          className={`left-bar ${isSidebarShown ? '' : 'hidden'}`}
          ref={provided.innerRef}
          {...provided.droppableProps}
          isDraggingOver={snapshot.isDraggingOver}
        >
          {leftBarContent.map((type, index) => (
            <SidebarComponent type={type} index={index} />
          ))}
        </div>
      )}
    </Droppable>
  );
};
export default LeftBar;
