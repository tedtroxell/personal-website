import type { CSSProperties, ReactNode } from 'react';
import { workflow, measurement, inspection, type MeasurementOptions } from '@/lib/articles/models';

export function Layer({phase,children}:{phase:number;children:ReactNode}) { return <g className="note-layer" style={{'--reveal':Math.max(0,Math.min(1,phase))} as CSSProperties}>{children}</g>; }
export function Sheet({title,number,children}:{title:string;number:string;children:ReactNode}) {return <svg className="note-draft" viewBox="0 0 560 420" role="img" aria-label={title}>
 <defs><pattern id={`grid-${number}`} width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="#b6c1b5" strokeWidth=".5"/></pattern></defs>
 <rect x="12" y="12" width="536" height="396" fill={`url(#grid-${number})`} opacity=".3"/>
 <path d="M12 12H548V408H12ZM12 49H548M12 383H548M394 383V408" className="note-frame"/>
 <text x="27" y="36" className="note-svg-heading">{title}</text><text x="27" y="400" className="note-svg-small">ILLUSTRATIVE MODEL / NTS</text><text x="408" y="400" className="note-svg-small">DWG {number}</text>{children}
 </svg>;}

export function WorkflowDrawing({result,progress}:{result:ReturnType<typeof workflow>;progress:number}) {
 const x=(t:number)=>113+t/result.finish*410;
 const names=['DESIGN','REVIEW','TEST','RELEASE'];
 return <Sheet title="DELIVERY / WHERE THE WORK WAITS" number="101">
  <Layer phase={progress*5}><path pathLength="1" className="note-trace" d="M30 70H530M30 133H530M30 156H530"/>
   {names.map((name,i)=><g key={name}><rect x={30+i*126} y="80" width="111" height="36" rx="2" pathLength={1} className="note-part note-drawn"/><text x={85+i*126} y="103" textAnchor="middle" className="note-svg-label">{name}</text>{i<3&&<path d={`M${142+i*126} 98h13m-5-4 5 4-5 4`} className="note-frame"/>}</g>)}
  </Layer>
  <Layer phase={progress*5-1}>{result.jobs.map((job,i)=><g key={job.id}><text x="31" y={180+i*14} className="note-svg-small">REQ {String(i+1).padStart(2,'0')}</text><line x1={x(job.arrival)} x2={x(job.complete)} y1={176+i*14} y2={176+i*14} className="note-connector"/>{job.segments.map(s=><rect key={s.stage} x={x(s.start)} y={172+i*14} width={Math.max(1,x(s.end)-x(s.start))} height="8" fill={s.stage===1?'#d96747':'#526c5e'}/>)}</g>)}</Layer>
  <Layer phase={progress*5-2}>{result.jobs.map((job,i)=>{const review=job.segments[1];return <line key={job.id} x1={x(review.start-review.wait)} x2={x(review.start)} y1={169+i*14} y2={169+i*14} stroke="#d96747" strokeWidth="2" strokeDasharray="2 3"/>})}<text x="31" y="146" className="note-svg-small">SOLID = WORK / PALE = WAIT &amp; HANDOFF</text></Layer>
  <Layer phase={progress*5-3}>{names.map((name,i)=><text key={name} x={85+i*126} y="127" textAnchor="middle" className="note-svg-small">{result.capacity[i].toFixed(2)} / DAY</text>)}</Layer>
  <Layer phase={progress*5-4}><path pathLength="1" className="note-trace" d="M113 350H523M113 343V357M523 343V357"/><text x="113" y="373" className="note-svg-small">DAY 0</text><text x="523" y="373" textAnchor="end" className="note-svg-label">DAY {result.finish}</text></Layer>
 </Sheet>;
}

export function MeasurementDrawing({result,options,progress}:{result:ReturnType<typeof measurement>;options:MeasurementOptions;progress:number}) {
 const x=(dimension:number)=>80+(dimension-74.75)/.5*420;
 const curve=Array.from({length:181},(_,i)=>{const v=74.75+i/180*.5;return `${i?'L':'M'}${x(v).toFixed(2)} ${(339-100*Math.exp(-.5*((v-result.mean)/result.se)**2)).toFixed(2)}`}).join(' ');
 return <Sheet title="INSPECTION / MEASUREMENT CHAIN" number="102">
  <Layer phase={progress*5}><rect x="138" y="87" width="284" height="71" rx="8" pathLength={1} className="note-part note-drawn"/><circle cx="162" cy="122" r="8" className="note-frame"/><circle cx="398" cy="122" r="8" className="note-frame"/><path pathLength="1" className="note-trace" d="M138 78V62M422 78V62M138 70H422M138 70l8-4m-8 4 8 4M422 70l-8-4m8 4-8 4"/><text x="280" y="180" textAnchor="middle" className="note-svg-label">75.00 ±0.10 mm</text></Layer>
  <Layer phase={progress*5-1}><rect x={x(result.low)} y="219" width={x(result.high)-x(result.low)} height="122" fill="#526c5e" opacity=".13"/><path pathLength="1" className="note-trace" d="M80 342H500"/><line x1={x(options.dimension)} x2={x(options.dimension)} y1="222" y2="346" stroke="#526c5e" strokeDasharray="4 4"/>{[74.8,74.9,75,75.1,75.2].map(v=><g key={v}><line x1={x(v)} x2={x(v)} y1="342" y2="348" className="note-frame"/><text x={x(v)} y="365" textAnchor="middle" className="note-svg-small">{v.toFixed(1)}</text></g>)}</Layer>
  <Layer phase={progress*5-2}><path d={`${curve}L500 340H80Z`} fill="#d96747" opacity=".13"/><path d={curve} pathLength={1} className="note-drawn" fill="none" stroke="#d96747" strokeWidth="2.4"/><line x1={x(result.mean)} x2={x(result.mean)} y1="230" y2="340" stroke="#d96747" strokeDasharray="3 3"/></Layer>
  <Layer phase={progress*5-3}><path d={`M${x(options.dimension)} 208H${x(result.mean)}`} stroke="#d96747" strokeWidth="2"/><text x="280" y="200" textAnchor="middle" className="note-svg-small">{options.corrected?'KNOWN OFFSET REMOVED':'OFFSET '+(result.bias*1000).toFixed(0)+' µm'}</text></Layer>
  <Layer phase={progress*5-4}><text x="31" y="239" className="note-svg-small">AVERAGE OF {options.repeats}</text><text x="31" y="254" className="note-svg-small">INDEPENDENT READINGS</text></Layer>
 </Sheet>;
}

export function InspectionDrawing({result,progress,reveal}:{result:ReturnType<typeof inspection>;progress:number;reveal:boolean}) {
 const x=(score:number)=>65+score*430;
 return <Sheet title="DECISION / ACCEPT, REVIEW OR REJECT" number="103">
  <Layer phase={progress*5}>{['ACCEPT','REVIEW','REJECT'].map((label,i)=><g key={label}><rect x={35+i*174} y="79" width="142" height="55" rx="2" pathLength={1} className="note-part note-drawn"/><text x={106+i*174} y="103" textAnchor="middle" className="note-svg-label">{label}</text><text x={106+i*174} y="123" textAnchor="middle" className="note-svg-small">{i===0?result.accepted:i===1?result.reviewed:result.rejected} PARTS</text></g>)}</Layer>
  <Layer phase={progress*5-1}>{result.parts.map((part,i)=><circle key={part.id} cx={x(part.score)} cy={197+(i%12)*10.5} r="3.3" fill={reveal?(part.bad?'#c75a40':'#526c5e'):'#526c5e'} opacity={part.decision==='hold'?.35:.85}/>)}</Layer>
  <Layer phase={progress*5-2}><line x1={x((result.low+result.high)/2)} x2={x((result.low+result.high)/2)} y1="177" y2="337" stroke="#172125" strokeDasharray="5 4"/></Layer>
  <Layer phase={progress*5-3}><rect x={x(result.low)} y="177" width={x(result.high)-x(result.low)} height="159" fill="#e7ad62" opacity=".22"/><line x1={x(result.low)} x2={x(result.low)} y1="177" y2="337" stroke="#ba803b"/><line x1={x(result.high)} x2={x(result.high)} y1="177" y2="337" stroke="#ba803b"/><text x="280" y="165" textAnchor="middle" className="note-svg-small">{result.reviewDemand} REQUEST REVIEW / {result.held} ON HOLD</text></Layer>
  <Layer phase={progress*5-4}><path pathLength="1" className="note-trace" d="M65 340H495"/>{[0,.25,.5,.75,1].map(v=><text key={v} x={x(v)} y="365" textAnchor="middle" className="note-svg-small">{v.toFixed(2)}</text>)}<text x="280" y="376" textAnchor="middle" className="note-svg-small">DEFECT SCORE / NOT A CALIBRATED PROBABILITY</text></Layer>
 </Sheet>;
}
