/**
 * Function responsible for image Resize
 *
 * @function resize
 * @param {object} frame frame size
 * @param {object} image image size
 * @return {object} new image
 */
const resize = (frame, image) => {
  const ratio = Math.min(frame.width / image.width, frame.height / image.height);

  return {width: image.width * ratio, height: image.height * ratio};
};

/**
 * Function responsible for image Resize
 * when image loads we getting it`s real dimensions and adapt it to our container
 * @function resizeRenderedImages
*/
export const resizeRenderedImages = () => {
  const imagesContainer = document.querySelector(`.game__content`);
  const images = imagesContainer.querySelectorAll(`img`);

  images.forEach((image) => {
    image.onload = () => {
      const realImageDimensions = resize(
          {width: image.width, height: image.height},
          {width: image.naturalWidth, height: image.naturalHeight}
      );
      image.height = realImageDimensions.height;
      image.width = realImageDimensions.width;
    };
  });
};


export default resize;
