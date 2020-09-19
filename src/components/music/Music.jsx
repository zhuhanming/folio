import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import DragHandle from 'components/dragHandle';
import { updateComponent, deleteComponent } from 'reducers/componentDux';
import TrashIcon from 'components/trashIcon';
import { getSoundCloudUrl } from 'utils';

import './Music.scss';

const Music = ({ component, index }) => {
  const dispatch = useDispatch();
  const { url } = component;
  const { register, getValues, handleSubmit } = useForm();

  const onSubmit = () => {
    const newUrl = getValues().url;
    if (newUrl !== url) {
      const newId = getSoundCloudUrl(newUrl);
      dispatch(
        updateComponent({
          id: component.id,
          component: {
            ...component,
            url: newId,
          },
        })
      );
    }
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      'Are you sure you wish to delete this item?'
    );
    if (confirmDelete) dispatch(deleteComponent(component.id));
  };

  return (
    <Draggable draggableId={component.id} index={index}>
      {(provided) => (
        <div
          className="portfolio-music"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <DragHandle {...provided.dragHandleProps} />
          {url === '' && (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="portfolio-music__form"
            >
              <input
                type="text"
                name="url"
                ref={register({ required: true })}
                className="portfolio-music__input music is-size-6"
                placeholder="Enter SoundCloud embed code here"
              />
            </form>
          )}
          {url !== '' && (
            <div className="portfolio-music__music">
              <iframe
                title={component.id}
                src={url}
                width="100%"
                height="300"
                scrolling="no"
                frameBorder="no"
              />
            </div>
          )}
          <TrashIcon onClick={handleDelete} />
        </div>
      )}
    </Draggable>
  );
};

export default Music;
