export type OodOptions = { shift:number; threshold:number; persistence:number; labels:number; contract:boolean; cooldown:boolean; oldLoss:number; newGain:number };
export const oodDefaults: OodOptions = {shift:1.5,threshold:4.5,persistence:3,labels:120,contract:true,cooldown:false,oldLoss:.4,newGain:3};
export function ood(options:OodOptions) {
 const windows=Array.from({length:4},(_,w)=>{
  const scores=Array.from({length:200},(_,i)=>{
   const u=(((i*73+w*31)%200)+.5)/200;
   return -Math.log(1-u)+options.shift*(.7+.3*Math.sin(i*1.7+w)**2);
  });
  const flagged=scores.filter(s=>s>options.threshold).length;
  return {flagged,total:scores.length,rate:flagged/scores.length,breach:flagged/scores.length>.08};
 });
 let streak=0;for(const window of windows)streak=window.breach?streak+1:0;
 const alert=streak>=options.persistence;
 const ready=alert&&options.labels>=200&&options.contract&&!options.cooldown;
 const passed=options.oldLoss<=1&&options.newGain>=2;
 const reason=!alert?'Waiting for persistent alerts':options.labels<200?'Waiting for reviewed labels':!options.contract?'Data contract failed':options.cooldown?'Cooldown is active':!passed?'Candidate held at evaluation':'Eligible for a canary';
 return {windows,streak,alert,ready,passed,eligible:ready&&passed,reason,rate:windows.reduce((s,w)=>s+w.flagged,0)/800};
}
