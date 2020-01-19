import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

import { useSidebar } from 'contexts/SidebarContext';
import SidebarComponent from 'components/sidebarComponent';

import './RightBar.scss';

const RightBar = () => {
  const { isSidebarShown } = useSidebar();
  const rightBarContent = ['image', 'site', 'video', 'code', 'music'];

  return (
    <Droppable droppableId="right-sidebar" type="portfolio">
      {(provided, snapshot) => (
        <div
          className={`right-bar ${isSidebarShown ? '' : 'hidden'}`}
          ref={provided.innerRef}
          {...provided.droppableProps}
          isdraggingover={snapshot.isDraggingOver.toString()}
        >
          {rightBarContent.map((type, index) => (
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
export default RightBar;
