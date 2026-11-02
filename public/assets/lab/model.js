/** Small educational pendulum model; SI units, angle in radians. */
export function step(state, dt, length) {
  if (![state.angle,state.velocity,dt,length].every(Number.isFinite) || length<=0 || dt<0) throw new RangeError('Finite state and a positive length are required.');
  const duration=Math.min(dt,.05), count=Math.max(1,Math.ceil(duration/.005)), h=duration/count;
  let {angle,velocity}=state;
  for(let i=0;i<count;i++) {velocity+=(-9.81/length*Math.sin(angle)-.08*velocity)*h;angle+=velocity*h;}
  return {angle,velocity};
}
/** Fit acceleration to sin(angle), velocity, and a constant using least squares. */
export function fit(observations, threshold=.2) {
  const samples=observations.filter(s=>[s.angle,s.velocity,s.acceleration].every(Number.isFinite));
  if(samples.length<60 || !Number.isFinite(threshold) || samples.reduce((n,s)=>n+s.angle*s.angle,0)/samples.length<1e-5) return null;
  const matrix=Array.from({length:3},()=>[0,0,0,0]);
  for(const s of samples) {const row=[Math.sin(s.angle),s.velocity,1];for(let i=0;i<3;i++){for(let j=0;j<3;j++) matrix[i][j]+=row[i]*row[j];matrix[i][3]+=row[i]*s.acceleration;}}
  for(let col=0;col<3;col++) {
    let pivot=col;for(let r=col+1;r<3;r++)if(Math.abs(matrix[r][col])>Math.abs(matrix[pivot][col]))pivot=r;
    if(Math.abs(matrix[pivot][col])<1e-8)return null;
    [matrix[col],matrix[pivot]]=[matrix[pivot],matrix[col]];
    const scale=matrix[col][col];for(let j=col;j<4;j++)matrix[col][j]/=scale;
    for(let r=0;r<3;r++)if(r!==col){const k=matrix[r][col];for(let j=col;j<4;j++)matrix[r][j]-=k*matrix[col][j];}
  }
  const values=matrix.map(row=>Math.abs(row[3])<Math.max(0,threshold)?0:row[3]);
  if(!values.every(Number.isFinite))return null;
  const error=Math.sqrt(samples.reduce((n,s)=>{const d=values[0]*Math.sin(s.angle)+values[1]*s.velocity+values[2]-s.acceleration;return n+d*d},0)/samples.length);
  return {coefficients:{sin:values[0],velocity:values[1],constant:values[2]},error,termCount:values.filter(v=>Math.abs(v)>1e-7).length};
}
