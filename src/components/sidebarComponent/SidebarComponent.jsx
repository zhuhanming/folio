import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import './SidebarComponent.scss';

const SidebarComponent = ({ type, index }) => {
  const sidebarContent = () => {
    switch (type) {
      case 'title':
        return <h1 className="title">Title</h1>;
      default:
        return <></>;
    }
  };

  return (
    <Draggable draggableId={type} index={index}>
      {(provided, snapshot) => (
        <div
          className={`sidebar-component ${
            snapshot.isDragging ? 'is-dragged' : ''
          }`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {sidebarContent()}
        </div>
      )}
    </Draggable>
  );
};

export default SidebarComponent;
