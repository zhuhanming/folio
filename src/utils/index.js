/* eslint-disable no-unused-vars */
// const getCurrentPathWithoutParam = path => {
//   // Returns original path given if there no child path.
//   return path.slice(0, path.lastIndexOf('/')) || path;
// };

// https://dev.to/goenning/how-to-retry-when-react-lazy-fails-mb5
const retryPromise = (promise, retriesLeft = 5, interval = 1000) => {
  return new Promise((resolve, reject) => {
    promise()
      .then(resolve)
      .catch(error => {
        setTimeout(() => {
          if (retriesLeft === 1) {
            // reject('maximum retries exceeded');
            reject(error);
            return;
          }

          // Passing on "reject" is the important part
          retryPromise(promise, retriesLeft - 1, interval).then(
            resolve,
            reject
          );
        }, interval);
      });
  });
};

const getYoutubeId = url => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  return match && match[2].length === 11 ? match[2] : null;
};

const getHttpsUrl = url => {
  const prefix = 'https://';
  if (url.toLowerCase().substr(0, prefix.length) !== prefix) {
    return prefix + url;
  }
  return url;
};

const getSoundCloudUrl = url => {
  const [remove, use] = url.split('src="', 2);
  const [useTwo, removeTwo] = use.split('"><', 2);
  return useTwo;
};

export { getHttpsUrl, getYoutubeId, retryPromise, getSoundCloudUrl };
