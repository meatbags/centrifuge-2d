/** Common tangents */
// https://cp-algorithms.com/geometry/tangents-to-two-circles.html#implementation

import Line from './line';

const EPSILON = 0.00001;

const GetTangent = (p, r1, r2, tangents) => {
  let r = r2 - r1;
  let z = p.x*p.x + p.y*p.y;
  let d = z - (r * r);
  if (d < -EPSILON) return;
  let a = (p.x * r + p.y * d) / z;
  let b = (p.y * r - p.x * d) / z;
  let c = r1;
  tangents.push(new Line(a, b, c));
};

const CommonTangents(c1, c2) {
  let tangents = [];
  let p = c2.position.clone().sub(c1.position);
  GetTangent(p, -c1.radius, -c2.radius, tangents);
  GetTangent(p,  c1.radius, -c2.radius, tangents);
  GetTangent(p, -c1.radius,  c2.radius, tangents);
  GetTangent(p,  c1.radius,  c2.radius, tangents);
  tangents.forEach(line => {
    line.c -= line.a * c1.position.x + line.b * c1.position.y;
  });
  return tangents;
};

export default CommonTangents;
