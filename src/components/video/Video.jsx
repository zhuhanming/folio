import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import DragHandle from 'components/dragHandle';
import { updateComponent, deleteComponent } from 'reducers/componentDux';
import TrashIcon from 'components/trashIcon';
import { getYoutubeId } from 'utils/index';

import './Video.scss';

const Video = ({ component, index }) => {
  const dispatch = useDispatch();
  const { url } = component;
  const { register, getValues, handleSubmit } = useForm();

  const onSubmit = () => {
    const newUrl = getValues().url;
    if (newUrl !== url) {
      const newId = getYoutubeId(newUrl);
      dispatch(
        updateComponent({
          id: component.id,
          component: {
            ...component,
            url: `https://www.youtube.com/embed/${newId}`,
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
          className="portfolio-video"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <DragHandle {...provided.dragHandleProps} />
          {url === '' && (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="portfolio-video__form"
            >
              <input
                type="text"
                name="url"
                ref={register({ required: true })}
                className="portfolio-video__input video is-size-6"
                placeholder="Enter YouTube URL here"
              />
            </form>
          )}
          {url !== '' && (
            <div className="portfolio-video__video">
              <iframe
                title={component.id}
                src={url}
                width="640"
                height="385"
                allowFullScreen
              />
            </div>
          )}
          <TrashIcon onClick={handleDelete} />
        </div>
      )}
    </Draggable>
  );
};

export default Video;
