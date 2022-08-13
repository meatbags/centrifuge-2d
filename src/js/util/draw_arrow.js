/** Draw arrow */

const DrawArrow = (ctx, p, v, length) => {
  let tmp = v.clone().normalise();
  let size = length / 4;
  let x = p.x + tmp.x * length;
  let y = p.y + tmp.y * length;
  ctx.beginPath();
  ctx.moveTo(p.x, p.y);
  ctx.lineTo(x, y);
  tmp.rotate(Math.PI * 0.75);
  ctx.moveTo(x, y);
  ctx.lineTo(x + size * tmp.x, y + size * tmp.y);
  tmp.rotate(Math.PI * 0.5);
  ctx.moveTo(x, y);
  ctx.lineTo(x + size * tmp.x, y + size * tmp.y);
  ctx.stroke();
};

export default DrawArrow;
