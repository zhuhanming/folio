import React, { useCallback, useEffect } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import autosize from 'autosize';

import { imageTypes } from 'constants/fileTypes';
import { updateComponent } from 'reducers/componentDux';

import './UploadSite.scss';

const UploadImage = ({ index, component, site }) => {
  const dispatch = useDispatch();
  const { text } = site;
  const { register, getValues } = useForm({
    mode: 'onBlur'
  });
  useEffect(() => {
    autosize(document.querySelectorAll('textarea'));
  });
  const onDrop = useCallback(
    acceptedFiles => {
      if (acceptedFiles.length > 1) {
        toast.error('You can only upload one image!');
        return;
      }
      acceptedFiles.forEach(file => {
        if (imageTypes.every(type => file.type !== type)) {
          toast.error(`'${file.type}' is not a supported format`);
          return;
        }
        if (file.size > 524288) {
          toast.error('Your file needs to be smaller than 500KB!');
          return;
        }
        const reader = new FileReader();
        reader.onabort = () => toast.error('The uploading was aborted!');
        reader.onerror = () =>
          toast.error('An error occurred while uploading!');
        reader.onload = () => {
          const url = reader.result;
          const newSites = Array.from(component.sites);
          newSites.splice(index, 1);
          newSites.splice(index, 0, {
            ...component.sites[index],
            image: url
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
        };
        reader.readAsDataURL(file);
      });
    },
    [component, dispatch, index]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

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
        <div
          key={index}
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="site-upload"
        >
          <div className="image-upload" {...getRootProps()}>
            <input {...getInputProps()} />
            <p {...provided.dragHandleProps}>
              Drop an image to go with your site here!
            </p>
          </div>
          <textarea
            defaultValue={text}
            name="text"
            ref={register({ required: true })}
            className="site-upload__input is-size-6"
            onBlur={onBlur}
            rows={1}
          />
        </div>
      )}
    </Draggable>
  );
};

export default UploadImage;
