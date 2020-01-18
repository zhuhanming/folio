import React, { useCallback } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';

import { imageTypes } from 'constants/fileTypes';
import { updateComponent } from 'reducers/componentDux';

import './UploadImage.scss';

const UploadImage = ({ index, component, size }) => {
  const dispatch = useDispatch();
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
        const reader = new FileReader();
        reader.onabort = () => toast.error('The uploading was aborted!');
        reader.onerror = () =>
          toast.error('An error occurred while uploading!');
        reader.onload = () => {
          const url = reader.result;
          const newImages = Array.from(component.images);
          newImages.splice(index, 1);
          newImages.splice(index, 0, url);
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
        reader.readAsDataURL(file);
      });
    },
    [component, dispatch, index]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Draggable draggableId={`${component.id}_${index}_`} index={index}>
      {provided => (
        <div
          {...getRootProps()}
          key={index}
          {...provided.draggableProps}
          ref={provided.innerRef}
          className={`${
            // eslint-disable-next-line no-nested-ternary
            size === 1 ? 'hundred' : size === 2 ? 'fifty' : 'thirty'
          }`}
        >
          <div className="image-upload">
            <input {...getInputProps()} />
            <p {...provided.dragHandleProps}>
              Drop your image here or click to upload your image!
            </p>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default UploadImage;
