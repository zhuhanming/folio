import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

import { useSidebar } from 'contexts/SidebarContext';
import SidebarComponent from 'components/sidebarComponent';

import './LeftBar.scss';

const LeftBar = () => {
  const { isSidebarShown } = useSidebar();
  const leftBarContent = ['title', 'subtitle', 'description', 'caption'];

  return (
    <Droppable droppableId="left-sidebar" type="portfolio">
      {(provided, snapshot) => (
        <div
          className={`left-bar ${isSidebarShown ? '' : 'hidden'}`}
          ref={provided.innerRef}
          {...provided.droppableProps}
          isdraggingover={snapshot.isDraggingOver.toString()}
        >
          {leftBarContent.map((type, index) => (
            <SidebarComponent
              type={type}
              index={index}
              key={`component-${type}`}
            />
          ))}
        </div>
      )}
    </Droppable>
  );
};
export default LeftBar;
