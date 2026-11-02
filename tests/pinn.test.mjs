import test from 'node:test';
import assert from 'node:assert/strict';
import {Trainer,evaluate,reference,source} from '../lib/articles/pinn-model.ts';
test('analytical reference satisfies the end conditions, heat equation and power scaling',()=>{
 for(const s of [.15,.5,.85]){
  assert.equal(reference(0,s),0);assert.equal(reference(1,s),0);
  for(const x of [.1,.3,.5,.7,.9]){const h=.001,d=(reference(x-h,s)-2*reference(x,s)+reference(x+h,s))/(h*h);assert.ok(Math.abs(d+source(x,s))<.001);assert.ok(Math.abs(reference(x,s,2)-2*reference(x,s))<1e-10);}
 }
});
test('physics-only training improves held-out temperature error across heater positions',()=>{
 const t=new Trainer();const error=()=>[.22,.47,.78].reduce((sum,s)=>sum+Array.from({length:19},(_,i)=>(i+1)/20).reduce((v,x)=>v+(evaluate(t.w,x,s).y-reference(x,s))**2,0),0);
 const initial=error();t.train(3000);assert.ok(error()<initial*.05);
 for(const s of [.15,.5,.85]){assert.equal(evaluate(t.w,0,s).y,0);assert.equal(evaluate(t.w,1,s).y,0);assert.ok(t.w.every(Number.isFinite));}
});
