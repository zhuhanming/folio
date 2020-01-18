import React, { useEffect } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import autosize from 'autosize';

import DragHandle from 'components/dragHandle';
import { updateComponent, deleteComponent } from 'reducers/componentDux';
import TrashIcon from 'components/trashIcon';

import './Message.scss';

const Message = ({ component, index }) => {
  const dispatch = useDispatch();
  const { text } = component;
  const { register, getValues } = useForm({
    mode: 'onBlur'
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
          component: { ...component, text: newText }
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
      {provided => (
        <div
          className="portfolio-message"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <DragHandle {...provided.dragHandleProps} />

          <div className="message is-dark portfolio-message__container">
            <div className="message-body portfolio-message__body">
              <textarea
                defaultValue={text}
                name="text"
                ref={register({ required: true })}
                className="portfolio-message__input is-size-6"
                onBlur={onBlur}
                rows={1}
              />
            </div>
          </div>
          <TrashIcon onClick={handleDelete} />
        </div>
      )}
    </Draggable>
  );
};

export default Message;
