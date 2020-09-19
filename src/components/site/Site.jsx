/* eslint-disable no-nested-ternary */
import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

import DragHandle from 'components/dragHandle';
import { deleteComponent, updateComponent } from 'reducers/componentDux';
import TrashIcon from 'components/trashIcon';
import AddIcon from 'components/addIcon';
import { getHttpsUrl } from 'utils';
import UploadSite from './UploadSite';
import SiteContent from './SiteContent';

import './Site.scss';

const Site = ({ component, index }) => {
  const dispatch = useDispatch();
  const { sites } = component;

  const { register, getValues, handleSubmit } = useForm();

  const onSubmit = (id) => {
    const newUrl = getValues()[`url-${id}`];
    if (newUrl !== sites[id].url) {
      const finalUrl = getHttpsUrl(newUrl);
      const newSites = Array.from(sites);
      newSites[id] = {
        ...sites[id],
        url: finalUrl,
        text: 'Enter site title here',
      };
      dispatch(
        updateComponent({
          id: component.id,
          component: {
            ...component,
            sites: newSites,
          },
        })
      );
    }
  };

  const handleDelete = () => {
    // eslint-disable-next-line no-alert
    const confirmDelete = window.confirm(
      'Are you sure you wish to delete this item?'
    );
    if (confirmDelete) {
      // TODO: Add deletion of images
      dispatch(deleteComponent(component.id));
    }
  };

  const handleAdd = () => {
    if (sites.length === 2) {
      toast.warn('You can only have 2 sites in a row!');
      return;
    }
    const newSites = Array.from(sites);
    newSites.push({
      image: '',
      url: '',
      text: 'Enter site title here',
    });
    dispatch(
      updateComponent({
        id: component.id,
        component: {
          ...component,
          sites: newSites,
        },
      })
    );
  };

  return (
    <Draggable draggableId={component.id} index={index}>
      {(provided) => (
        <div
          className="portfolio-site"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <DragHandle {...provided.dragHandleProps} />
          <Droppable
            droppableId={`site-${component.id}`}
            type="site"
            direction="horizontal"
          >
            {(providedTwo, snapshotTwo) => (
              <div
                {...providedTwo.droppableProps}
                ref={providedTwo.innerRef}
                className={`portfolio-site__body ${
                  snapshotTwo.isDraggingOver
                    ? 'portfolio-site__dragged-over'
                    : ''
                }`}
              >
                {sites.map((site, indexTwo) =>
                  site.url === '' ? (
                    <Draggable
                      draggableId={`${
                        component.id
                      }_${indexTwo}_${JSON.stringify(site)}`}
                      index={index}
                      // eslint-disable-next-line react/no-array-index-key
                      key={`site-draggable-${component.id}-${indexTwo}`}
                    >
                      {(providedThree) => (
                        <form
                          onSubmit={handleSubmit(() => onSubmit(indexTwo))}
                          className="portfolio-site__form"
                          // eslint-disable-next-line react/no-array-index-key
                          key={`form-${indexTwo}`}
                          {...providedThree.draggableProps}
                          ref={providedThree.innerRef}
                          {...providedThree.dragHandleProps}
                        >
                          <input
                            type="text"
                            name={`url-${indexTwo}`}
                            // ref={register({ required: true })}
                            ref={register}
                            className="portfolio-site__input is-size-6"
                            placeholder="Enter external link here"
                          />
                        </form>
                      )}
                    </Draggable>
                  ) : site.image === '' ? (
                    <UploadSite
                      index={indexTwo}
                      component={component}
                      site={site}
                      // eslint-disable-next-line react/no-array-index-key
                      key={`site-upload-${component.id}-${indexTwo}`}
                    />
                  ) : (
                    <SiteContent
                      index={indexTwo}
                      component={component}
                      site={site}
                      // eslint-disable-next-line react/no-array-index-key
                      key={`site-content-${component.id}-${indexTwo}`}
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

export default Site;
