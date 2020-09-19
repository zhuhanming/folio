import React, { useCallback, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import imageCompression from 'browser-image-compression';

import { imageTypes } from 'constants/fileTypes';
import { updateComponent } from 'reducers/componentDux';
import { CLOUDINARY_UPLOAD_URL } from 'constants/urls';

import './UploadImage.scss';

const UploadImage = ({ index, component, size }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length > 1) {
        toast.error('You can only upload one image!');
        return;
      }
      acceptedFiles.forEach(async (file) => {
        if (imageTypes.every((type) => file.type !== type)) {
          toast.error(`'${file.type}' is not a supported format`);
          return;
        }
        const uploadImage = async (image) => {
          setIsLoading(true);
          try {
            const compressedFile = await imageCompression(image, {
              maxSizeMB: 1,
            });
            const formData = new FormData();
            formData.append('file', compressedFile);
            formData.append(
              'upload_preset',
              process.env.REACT_APP_UPLOAD_PRESET
            );
            const response = await fetch(CLOUDINARY_UPLOAD_URL, {
              method: 'POST',
              body: formData,
            });
            const { url } = await response.json();
            const newImages = Array.from(component.images);
            newImages.splice(index, 1);
            newImages.splice(index, 0, url);
            setIsLoading(false);
            dispatch(
              updateComponent({
                id: component.id,
                component: {
                  ...component,
                  images: newImages,
                },
              })
            );
            toast.success('Image uploaded!');
          } catch (e) {
            toast.error('Failed to upload! Try again!');
            setIsLoading(false);
          }
        };
        uploadImage(file);
      });
    },
    [component, dispatch, index]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Draggable draggableId={`${component.id}_${index}_`} index={index}>
      {(provided) => (
        <div
          {...getRootProps()}
          key={`upload-image-${component.id}-${index}`}
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          className={`${
            // eslint-disable-next-line no-nested-ternary
            size === 1 ? 'hundred' : size === 2 ? 'fifty' : 'thirty'
          }`}
        >
          <div className="image-upload">
            {!isLoading && (
              <>
                <input {...getInputProps()} />
                <p>Drop your image here or click to upload your image!</p>
              </>
            )}
            {isLoading && <p>Uploading...</p>}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default UploadImage;
