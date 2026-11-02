export function draw(root,state,length) {
  const arm=root.querySelector('[data-arm]'), y=65+Math.min(260,160+length*50);
  arm.setAttribute('transform',`rotate(${state.angle*180/Math.PI} 310 65)`);
  root.querySelector('[data-rod]').setAttribute('d',`M310 65V${y}`);
  root.querySelector('[data-bob]').setAttribute('cy',y);
  root.querySelector('[data-length-guide]').setAttribute('d',`M428 65H484M428 ${y}H484M469 65V${y}M469 65L465 75M469 65L473 75M469 ${y}L465 ${y-10}M469 ${y}L473 ${y-10}`);
  root.querySelector('[data-length-label]').setAttribute('y',(65+y)/2+5);
  root.querySelector('[data-length-note]').setAttribute('y',(65+y)/2+23);
  root.querySelector('[data-reference-guide]').setAttribute('d',`M310 43V350M140 ${y}H472`);
}
export function equation(result) {
  const c=result.coefficients,terms=[];
  if(c.sin)terms.push(`${c.sin.toFixed(2)} × sin(angle)`);
  if(c.velocity)terms.push(`${c.velocity.toFixed(2)} × velocity`);
  if(c.constant)terms.push(c.constant.toFixed(2));
  return `acceleration ≈ ${terms.join(' + ').replace(/\+ -/g,'− ')||'0'}`;
}
