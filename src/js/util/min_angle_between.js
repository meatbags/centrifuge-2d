/** Min angle between anlgles */

export default (a, b) => {
  return Math.atan2(Math.sin(b-a), Math.cos(b-a));
};
