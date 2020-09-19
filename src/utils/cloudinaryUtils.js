import imageCompression from 'browser-image-compression';
import humps from 'humps';

import { CLOUDINARY_UPLOAD_URL } from 'constants/urls';

export const uploadImageToCloudinary = async (image) => {
  const compressedFile = await imageCompression(image, {
    maxSizeMB: 1,
  });
  const formData = new FormData();
  formData.append('file', compressedFile);
  formData.append('upload_preset', process.env.REACT_APP_UPLOAD_PRESET);
  const response = await fetch(CLOUDINARY_UPLOAD_URL, {
    method: 'POST',
    body: formData,
  });
  const { secureUrl } = humps.camelizeKeys(await response.json());
  return secureUrl;
};
