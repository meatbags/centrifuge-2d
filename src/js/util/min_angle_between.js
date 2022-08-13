/** Min angle between anlgles */

export default (x, y) => {
  return Math.atan2(Math.sin(x-y), Math.cos(x-y));
};
