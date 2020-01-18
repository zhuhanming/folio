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

export {
  // getCurrentPathWithoutParam,
  retryPromise
};
