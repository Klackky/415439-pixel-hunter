/**
 * Function responsible for image Resize
 *
 * @function resize
 * @param {object} frame frame size
 * @param {object} image image size
 */

const resize = (frame, image) => {
  const maxWidth = frame.width;
  const maxHeight = frame.height;
  const imageWidth = image.width;
  const imageHeight = image.height;
  let ratio = [maxWidth / imageWidth, maxHeight / imageHeight];
  ratio = Math.min(ratio[0], ratio[1]);
  return {width: imageWidth * ratio, height: imageHeight * ratio};
};

export default resize;
