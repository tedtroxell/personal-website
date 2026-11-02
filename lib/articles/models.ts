export type WorkSegment = { stage: number; start: number; end: number; wait: number };
export type WorkflowOptions = { reviewers: number; reviewDays: number; wip: number; handoff: number };
export const workflowDefaults: WorkflowOptions = { reviewers: 1, reviewDays: 4, wip: 8, handoff: 1 };
export function workflow(options: WorkflowOptions) {
  const jobs = Array.from({ length: 12 }, (_, id) => ({ id, arrival: id, admitted: -1, complete: -1, stage: 0, ready: id, running: false, segments: [] as WorkSegment[] }));
  const durations = [2, options.reviewDays, 3, 1];
  const capacities = [2, options.reviewers, 2, 1];
  let finish = 0;
  for (let tick = 0; tick < 4000; tick++) {
    const now = tick / 4;
    jobs.forEach(job => {
      if (!job.running || job.segments.at(-1)!.end > now) return;
      job.running = false; job.stage++;
      if (job.stage === 4) { job.complete = now; finish = now; }
      else job.ready = now + options.handoff;
    });
    let active = jobs.filter(j => j.admitted >= 0 && j.complete < 0).length;
    jobs.forEach(job => { if (job.admitted < 0 && job.arrival <= now && active < options.wip) { job.admitted = now; job.ready = now; active++; } });
    for (let stage = 0; stage < 4; stage++) {
      let busy = jobs.filter(j => j.running && j.stage === stage).length;
      const queue = jobs.filter(j => j.admitted >= 0 && j.complete < 0 && !j.running && j.stage === stage && j.ready <= now).sort((a,b)=>a.ready-b.ready || a.id-b.id);
      queue.forEach(job => { if (busy >= capacities[stage]) return; job.running = true; busy++; job.segments.push({ stage, start: now, end: now + durations[stage], wait: now - job.ready }); });
    }
    if (jobs.every(j => j.complete >= 0)) break;
  }
  const mean = (values: number[]) => values.reduce((a,b)=>a+b,0)/values.length;
  const waitByStage = durations.map((_,stage)=>mean(jobs.map(j=>j.segments[stage].wait)));
  return { jobs, finish, leadTime: mean(jobs.map(j=>j.complete-j.arrival)), cycleTime: mean(jobs.map(j=>j.complete-j.admitted)), intakeWait: mean(jobs.map(j=>j.admitted-j.arrival)), waitByStage, workDays: durations.reduce((a,b)=>a+b,0), capacity: capacities.map((n,i)=>n/durations[i]) };
}

function normalCDF(x: number) {
  const sign = x < 0 ? -1 : 1, z = Math.abs(x) / Math.SQRT2, t = 1 / (1 + 0.3275911 * z);
  const erf = 1 - (((((1.061405429*t-1.453152027)*t)+1.421413741)*t-0.284496736)*t+0.254829592)*t*Math.exp(-z*z);
  return (1 + sign*erf)/2;
}
export type MeasurementOptions = { bias: number; noise: number; repeats: number; corrected: boolean; dimension: number };
export const measurementDefaults: MeasurementOptions = { bias: 0.04, noise: 0.035, repeats: 1, corrected: false, dimension: 75.075 };
export function measurement(o: MeasurementOptions) {
  const bias = o.corrected ? 0 : o.bias, se = o.noise / Math.sqrt(o.repeats), low = 74.9, high = 75.1;
  const acceptChance = (truth: number) => Math.max(0,Math.min(1,normalCDF((high-truth-bias)/se)-normalCDF((low-truth-bias)/se)));
  // An explicit, uniform synthetic set spanning the specification edges.
  const parts = Array.from({length: 301},(_,i)=>74.85+i*.001);
  let falseAccept=0,falseReject=0,good=0,bad=0;
  parts.forEach(truth=>{ if(truth >= low-1e-9 && truth <= high+1e-9) {good++;falseReject+=1-acceptChance(truth);} else {bad++;falseAccept+=acceptChance(truth);} });
  return { mean: o.dimension+bias, se, low, high, bias, accept: acceptChance(o.dimension), falseAccept, falseReject, good, bad, count:parts.length, goodPart:o.dimension>=low&&o.dimension<=high };
}

function rng(seed: number) { let state=seed>>>0; return ()=>{state=(1664525*state+1013904223)>>>0;return (state+.5)/4294967296;}; }
export type InspectionOptions = { threshold: number; band: number; capacity: number; reviewerAccuracy: number; missCost: number; drift: boolean };
export const inspectionDefaults: InspectionOptions = { threshold:.5, band:.16, capacity:60, reviewerAccuracy:.95, missCost:500, drift:false };
export function inspection(o: InspectionOptions) {
  const random=rng(84721);
  const low=Math.max(0,o.threshold-o.band/2),high=Math.min(1,o.threshold+o.band/2);
  let reviewed=0,accepted=0,rejected=0,held=0,missed=0,scrapped=0,reviewDemand=0;
  const parts=Array.from({length:240},(_,i)=>{
    const bad=i%8===0;
    const z=Math.sqrt(-2*Math.log(random()))*Math.cos(2*Math.PI*random());
    const score=Math.min(.999,Math.max(.001,(bad?.72:.18)+z*.19+(o.drift?(bad?-.15:.22):0)));
    let decision: 'accept'|'reject'|'review'|'hold';
    if(score<low){decision='accept';accepted++;if(bad)missed++;}
    else if(score>=high){decision='reject';rejected++;if(!bad)scrapped++;}
    else{reviewDemand++;if(reviewed<o.capacity){decision='review';reviewed++;if(bad)missed+=1-o.reviewerAccuracy;else scrapped+=1-o.reviewerAccuracy;}else{decision='hold';held++;}}
    return {id:i,score,bad,decision};
  });
  return { parts, low, high, reviewed, accepted, rejected, held, missed, scrapped, reviewDemand, cost:missed*o.missCost+scrapped*40+reviewed*5+held*10, bad:30, good:210 };
}
