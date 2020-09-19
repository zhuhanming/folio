import React, { useEffect } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import autosize from 'autosize';

import DragHandle from 'components/dragHandle';
import { updateComponent, deleteComponent } from 'reducers/componentDux';
import TrashIcon from 'components/trashIcon';

import './Code.scss';

const Code = ({ component, index }) => {
  const dispatch = useDispatch();
  const { text } = component;
  const { register, getValues, setValue } = useForm({
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

  const handleKeyDown = (event) => {
    const textarea = document.getElementById(component.id);
    // support tab on textarea
    if (event.keyCode === 9) {
      event.preventDefault();
      // tab was pressed
      const { selectionStart, selectionEnd } = event.target;
      const value = getValues().text;
      const newValue = `${value.substring(
        0,
        selectionStart
      )}    ${value.substring(selectionEnd)}`;
      setValue('text', newValue);
      if (textarea.current) {
        textarea.current.selectionStart = selectionStart + 4;
      }
    }
  };

  return (
    <Draggable draggableId={component.id} index={index}>
      {(provided) => (
        <div
          className="portfolio-code"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <DragHandle {...provided.dragHandleProps} />
          <pre className="code">
            <code>
              <textarea
                id={component.id}
                defaultValue={text}
                name="text"
                ref={register({ required: true })}
                className="portfolio-code__input code is-size-6"
                onBlur={onBlur}
                rows={5}
                onKeyDown={handleKeyDown}
              />
            </code>
          </pre>
          <TrashIcon onClick={handleDelete} />
        </div>
      )}
    </Draggable>
  );
};

export default Code;
