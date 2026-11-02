// Dimensionless steady heat equation: u'' + q = 0, u(0)=u(1)=0.
export const width = .09;
export const source = (x:number,s:number) => Math.exp(-.5*((x-s)/width)**2);
const erf=(x:number)=>{const sign=x<0?-1:1,t=1/(1+.3275911*Math.abs(x));return sign*(1-(((((1.061405429*t-1.453152027)*t)+1.421413741)*t-.284496736)*t+.254829592)*t*Math.exp(-x*x));};
export function reference(x:number,s:number,p=1){
 const integral=(a:number,b:number)=>width*Math.sqrt(Math.PI/2)*(erf((b-s)/(Math.SQRT2*width))-erf((a-s)/(Math.SQRT2*width)));
 const a=s*integral(0,x)-width**2*(source(x,s)-source(0,s));
 const b=(1-s)*integral(x,1)+width**2*(source(1,s)-source(x,s));
 return p*((1-x)*a+x*b);
}
export function createNetwork(){return Array.from({length:65},(_,i)=>i===64?0:Math.sin(i*17.13+2)*.65);}
export function evaluate(w:number[],x:number,s:number){
 const g=new Array(65).fill(0);let y=w[64];g[64]=1;
 for(let i=0;i<16;i++){const j=i*4,h=Math.tanh(w[j]*x+w[j+1]*s+w[j+2]),d=w[j+3]*(1-h*h);y+=w[j+3]*h;g[j]=d*x;g[j+1]=d*s;g[j+2]=d;g[j+3]=h;}
 const boundary=x*(1-x);return {y:y*boundary,g:g.map(v=>v*boundary)};
}
export function residual(w:number[],x:number,s:number){const h=.002;return (evaluate(w,x+h,s).y-2*evaluate(w,x,s).y+evaluate(w,x-h,s).y)/(h*h)+source(x,s);}
export class Trainer {
 w=createNetwork();m=new Array(65).fill(0);v=new Array(65).fill(0);step=0;loss=0;
 train(count:number){for(let n=0;n<count;n++){
  const gradient=new Array(65).fill(0);let loss=0;
  for(let b=0;b<24;b++){
   const k=this.step*24+b+1,x=.006+.988*((k*.61803398875)%1),s=.15+.7*((k*.41421356237)%1),h=.002;
   const a=evaluate(this.w,x-h,s),c=evaluate(this.w,x,s),d=evaluate(this.w,x+h,s);
   const r=(a.y-2*c.y+d.y)/(h*h)+source(x,s);loss+=r*r/24;
   for(let j=0;j<65;j++)gradient[j]+=2*r*(a.g[j]-2*c.g[j]+d.g[j])/(h*h*24);
  }
  this.step++;this.loss=loss;
  for(let j=0;j<65;j++){const g=Math.max(-5,Math.min(5,gradient[j]));this.m[j]=.9*this.m[j]+.1*g;this.v[j]=.999*this.v[j]+.001*g*g;this.w[j]-=.003*(this.m[j]/(1-.9**this.step))/(Math.sqrt(this.v[j]/(1-.999**this.step))+1e-8);}
 }}
}
