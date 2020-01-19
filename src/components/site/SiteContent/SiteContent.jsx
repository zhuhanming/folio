/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import { useForm } from 'react-hook-form';
import autosize from 'autosize';

import { updateComponent } from 'reducers/componentDux';

import './SiteContent.scss';

const SiteContent = ({ index, site, component }) => {
  const { image, text, url } = site;
  const dispatch = useDispatch();
  const { register, getValues } = useForm({
    mode: 'onBlur'
  });

  useEffect(() => {
    autosize(document.querySelectorAll('textarea'));
  });

  const onBlur = () => {
    const newText = getValues().text;
    if (newText !== text) {
      const newSites = Array.from(component.sites);
      newSites.splice(index, 1);
      newSites.splice(index, 0, {
        ...component.sites[index],
        text: newText
      });
      dispatch(
        updateComponent({
          id: component.id,
          component: {
            ...component,
            sites: newSites
          }
        })
      );
      autosize.update(document.querySelectorAll('textarea'));
    }
  };

  return (
    <Draggable
      draggableId={`${component.id}_${index}_${JSON.stringify(site)}`}
      index={index}
    >
      {provided => (
        <div className="site-preview__container">
          <div
            className="site-preview__flex overlay"
            {...provided.draggableProps}
            ref={provided.innerRef}
            {...provided.dragHandleProps}
          >
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
            <img
              className="image site-preview"
              src={image}
              alt={component.id}
              onClick={() => window.open(url, '_blank')}
            />
          </div>
          <textarea
            defaultValue={text}
            name="text"
            ref={register({ required: true })}
            className="site-preview__input is-size-6"
            onBlur={onBlur}
            rows={1}
          />
        </div>
      )}
    </Draggable>
  );
};

export default SiteContent;
