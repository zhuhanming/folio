/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import Modal from 'components/modal';

import './ImagePreview.scss';

const ImagePreview = ({ index, image, component, size }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <Draggable draggableId={`${component.id}_${index}_${image}`} index={index}>
      {provided => (
        <>
          <Modal isOpen={isModalOpen} handleClose={() => setIsModalOpen(false)}>
            <img
              src={image}
              className="image image-modal"
              alt={`full-${component.id}`}
            />
          </Modal>
          <div
            className={`image-preview__flex overlay ${
              // eslint-disable-next-line no-nested-ternary
              size === 1 ? 'hundred' : size === 2 ? 'fifty' : 'thirty'
            }`}
            {...provided.draggableProps}
            ref={provided.innerRef}
            {...provided.dragHandleProps}
          >
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
            <img
              className="image image-preview"
              src={image}
              alt={component.id}
              onClick={() => setIsModalOpen(true)}
            />
          </div>
        </>
      )}
    </Draggable>
  );
};

export default ImagePreview;
