import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import './ImagePreview.scss';

const ImagePreview = ({ index, image, component, size }) => {
  return (
    <Draggable draggableId={`${component.id}_${index}_${image}`} index={index}>
      {provided => (
        <div
          className={`image-preview__flex ${
            // eslint-disable-next-line no-nested-ternary
            size === 1 ? 'hundred' : size === 2 ? 'fifty' : 'thirty'
          }`}
          {...provided.dragHandleProps}
        >
          <img
            className="image image-preview"
            src={image}
            alt={component.id}
            {...provided.draggableProps}
            ref={provided.innerRef}
          />
        </div>
      )}
    </Draggable>
  );
};

export default ImagePreview;
