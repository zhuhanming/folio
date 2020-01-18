import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';

import DragHandle from 'components/dragHandle';
import { deleteComponent } from 'reducers/componentDux';
import TrashIcon from 'components/trashIcon';
import UploadImage from './UploadImage';

import './Image.scss';

const Image = ({ component, index }) => {
  const dispatch = useDispatch();
  const { images } = component;

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      'Are you sure you wish to delete this item?'
    );
    if (confirmDelete) dispatch(deleteComponent(component.id));
  };

  return (
    <Draggable draggableId={component.id} index={index}>
      {provided => (
        <div
          className="portfolio-image"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <DragHandle {...provided.dragHandleProps} />
          <Droppable droppableId="image" type="portfolio">
            {providedTwo => (
              <div
                {...providedTwo.droppableProps}
                ref={providedTwo.innerRef}
                className="portfolio-image__body"
              >
                {images.map((image, indexTwo) =>
                  image === '' ? <UploadImage index={indexTwo} /> : <>Full</>
                )}
              </div>
            )}
          </Droppable>
          <TrashIcon onClick={handleDelete} />
        </div>
      )}
    </Draggable>
  );
};

export default Image;
