import React, { useEffect } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import autosize from 'autosize';

import DragHandle from 'components/dragHandle';
import { updateComponent, deleteComponent } from 'reducers/componentDux';
import TrashIcon from 'components/trashIcon';

import './Subtitle.scss';

const Subtitle = ({ component, index }) => {
  const dispatch = useDispatch();
  const { text } = component;
  const { register, getValues } = useForm({
    mode: 'onBlur',
  });

  useEffect(() => {
    autosize(document.querySelectorAll('textarea'));
  });

  const onBlur = () => {
    const newText = getValues().text;
    if (newText !== text) {
      dispatch(
        updateComponent({
          id: component.id,
          component: { ...component, text: newText },
        })
      );
      autosize.update(document.querySelectorAll('textarea'));
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
          className="portfolio-subtitle"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <DragHandle {...provided.dragHandleProps} />
          <textarea
            defaultValue={text}
            name="text"
            ref={register({ required: true })}
            className="portfolio-subtitle__input subtitle"
            onBlur={onBlur}
            rows={1}
          />
          <TrashIcon onClick={handleDelete} />
        </div>
      )}
    </Draggable>
  );
};

export default Subtitle;
