import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';

import { imageTypes } from 'constants/fileTypes';
import ImgApiService from 'services/imgApiService';

import './UploadImage.scss';

const UploadImage = ({ index }) => {
  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach(file => {
      if (imageTypes.every(type => file.type !== type)) {
        toast.error(`'${file.type}' is not a supported format`);
        return;
      }
      const reader = new FileReader();
      reader.onabort = () => toast.error('The uploading was aborted!');
      reader.onerror = () => toast.error('An error occurred while uploading!');
      reader.onload = async () => {
        const binaryStr = reader.result;
        const responses = await ImgApiService.post('upload', {
          key: process.env.REACT_APP_IMGBB_KEY,
          image: binaryStr
        });
        console.log(responses);
      };
      reader.readAsBinaryString(file);
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} key={index}>
      <input {...getInputProps()} />
      <p>Drop your image file here!</p>
    </div>
  );
};

export default UploadImage;
