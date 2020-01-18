import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import DragHandle from 'components/dragHandle';
import { deleteComponent, updateComponent } from 'reducers/componentDux';
import TrashIcon from 'components/trashIcon';
import AddIcon from 'components/addIcon';
import UploadImage from './UploadImage';
import ImagePreview from './ImagePreview';

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

  const handleAdd = () => {
    if (images.length === 3) {
      toast.warn('You can only have 3 images!');
      return;
    }
    const newImages = Array.from(images);
    newImages.push('');
    dispatch(
      updateComponent({
        id: component.id,
        component: {
          ...component,
          images: newImages
        }
      })
    );
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
          <Droppable droppableId="image" type="image" direction="horizontal">
            {(providedTwo, snapshotTwo) => (
              <div
                {...providedTwo.droppableProps}
                ref={providedTwo.innerRef}
                className={`portfolio-image__body ${
                  images.some(ele => ele !== '') ? 'has-content' : ''
                } ${
                  snapshotTwo.isDraggingOver
                    ? 'portfolio-image__dragged-over'
                    : ''
                }`}
              >
                {images.map((image, indexTwo) =>
                  image === '' ? (
                    <UploadImage
                      index={indexTwo}
                      component={component}
                      size={images.length}
                      // eslint-disable-next-line react/no-array-index-key
                    />
                  ) : (
                    <ImagePreview
                      index={indexTwo}
                      component={component}
                      image={image}
                      size={images.length}
                      // eslint-disable-next-line react/no-array-index-key
                    />
                  )
                )}
              </div>
            )}
          </Droppable>
          <div className="portfolio-image__buttons">
            <AddIcon onClick={handleAdd} />
            <TrashIcon onClick={handleDelete} />
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Image;
