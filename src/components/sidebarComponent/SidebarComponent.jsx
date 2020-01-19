import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import './SidebarComponent.scss';

const SidebarComponent = ({ type, index }) => {
  const sidebarContent = () => {
    switch (type) {
      case 'title':
        return <h1 className="title">Title</h1>;
      case 'subtitle':
        return <h1 className="subtitle">Subtitle</h1>;
      case 'image':
        return <i className="fas fa-image sidebar-component__image" />;
      case 'caption':
        return <h3 className="caption">Caption</h3>;
      case 'description':
        return <h1 className="description">Description</h1>;
      case 'message':
        return (
          <div className="message is-dark">
            <div className="message-body sidebar-component__message">
              Message
            </div>
          </div>
        );
      case 'video':
        return <i className="fab fa-youtube sidebar-component__video" />;
      case 'site':
        return <i className="fas fa-link sidebar-component__site" />;
      case 'code':
        return <i className="fas fa-code sidebar-component__code" />;
      case 'music':
        return <i className="fab fa-soundcloud sidebar-component__music" />;
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
