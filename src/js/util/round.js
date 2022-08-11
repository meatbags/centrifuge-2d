/** Round number */

export default (x, places) => {
  let s = Math.pow(10, places);
  return Math.round(x * s) / s;
};
