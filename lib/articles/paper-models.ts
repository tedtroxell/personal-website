export type PaperKind='attention'|'engram'|'bytes'|'agent'|'genome'|'dino';
export type PaperOptions={a:number;b:number;c:number;toggle:boolean;text:string;choice:string;index:number};
export const paperDefaults:Record<PaperKind,PaperOptions>={
 attention:{a:.7,b:3,c:0,toggle:false,text:'',choice:'',index:0},
 engram:{a:5,b:0,c:.8,toggle:false,text:'',choice:'',index:0},
 bytes:{a:4,b:0,c:0,toggle:false,text:'café = 12.50 µm',choice:'',index:0},
 agent:{a:0,b:0,c:0,toggle:false,text:'',choice:'reference',index:0},
 genome:{a:100,b:45,c:.7,toggle:false,text:'',choice:'A',index:0},
 dino:{a:.65,b:0,c:.2,toggle:false,text:'',choice:'',index:5}
};
const sum=(xs:number[])=>xs.reduce((a,b)=>a+b,0);
export function attentionModel(o:PaperOptions){
 const alignment=Array.from({length:8},(_,i)=>Math.cos((i-(o.b-1))*Math.PI/4));
 const logits=alignment.map(x=>x/Math.max(.1,o.a));const top=Math.max(...logits);
 const exp=logits.map(x=>Math.exp(x-top));const weights=exp.map(x=>x/sum(exp));
 return {alignment,weights,uniform:Array(8).fill(.125) as number[],projection:sum(weights.map((w,i)=>w*alignment[i])),concentration:Math.max(...weights),uniformProjection:sum(alignment)/8};
}
export const memoryPhrases=['bearing load','bearing seal','torque limit','surface finish','delivery date','camera gain','gate pressure','cooling time'];
export function memoryHash(text:string,slots:number){let h=0;for(const x of new TextEncoder().encode(text))h=(h*31+x)%65521;return h%Math.max(1,Math.round(slots));}
export function engramModel(o:PaperOptions){const slots=Math.max(2,Math.round(o.a));const buckets=Array.from({length:slots},()=>[] as string[]);for(const p of memoryPhrases)buckets[memoryHash(p,slots)].push(p);const selected=memoryPhrases[Math.round(o.b)]??memoryPhrases[0];const bucket=memoryHash(selected,slots);return {buckets,selected,bucket,occupants:buckets[bucket],collisions:memoryPhrases.length-buckets.filter(b=>b.length).length,gate:o.c,contribution:2*o.c};}
export function bytesModel(o:PaperOptions){const bytes=Array.from(new TextEncoder().encode(o.text));const width=Math.max(1,Math.round(o.a));const patches:number[][]=[];for(let i=0;i<bytes.length;i+=width)patches.push(bytes.slice(i,i+width));return {bytes,patches,codePoints:Array.from(o.text).length,ratio:patches.length?bytes.length/patches.length:0,hex:bytes.map(b=>b.toString(16).padStart(2,'0'))};}
export function agentModel(o:PaperOptions){const issue=o.toggle?'none':o.choice;const failed=issue==='environment'?1:issue==='schema'?2:issue==='reference'?3:-1;const steps=['Read paper + repository','Create pinned environment','Validate tool arguments','Run reference fixture','Expose tested tool'];return {steps:steps.map((name,i)=>({name,status:failed<0||i<failed?'pass':i===failed?'fail':'waiting'})),verified:failed<0,actual:failed===3?9:failed===1||failed===2?null:10,expected:10,issue};}
export function genomeModel(o:PaperOptions){const gain=o.choice==='A'?1:.3;const gaussian=(x:number,mean:number,sd:number)=>Math.exp(-.5*((x-mean)/sd)**2);const effect=o.c*gain*Math.exp(-Math.abs(105-o.b)/50);const tracks=Array.from({length:151},(_,x)=>{const reference=8+14*gaussian(x,o.b,6)+24*gaussian(x,105,10);const alternate=reference-o.c*gain*10*gaussian(x,o.b,6)-effect*18*gaussian(x,105,10);return {x,reference,alternate};});const low=75-o.a/2,high=75+o.a/2;return {tracks,visible:tracks.filter(t=>t.x>=low&&t.x<=high),low,high,covered:o.b>=low&&o.b<=high,gain,effect,deltaAtGene:tracks[105].alternate-tracks[105].reference};}
const norm=(v:number[])=>{const n=Math.hypot(...v);return v.map(x=>x/n)};
const dot=(a:number[],b:number[])=>sum(a.map((x,i)=>x*b[i]));
export function dinoModel(o:PaperOptions){
 const reference=Array.from({length:16},(_,i)=>{const x=i%4,y=Math.floor(i/4);return [Math.cos((x<2?.2:1.7)+y*.08),Math.sin((x<2?.2:1.7)+y*.08)];});
 const student=reference.map((v,i)=>{const angle=Math.atan2(v[1],v[0])+o.a*Math.sin(i*2.3)*1.9;const degraded=[Math.cos(angle),Math.sin(angle)];const anchored=norm(degraded.map((x,j)=>(1-o.c)*x+o.c*v[j]));const r=o.b*Math.PI/180;return [anchored[0]*Math.cos(r)-anchored[1]*Math.sin(r),anchored[0]*Math.sin(r)+anchored[1]*Math.cos(r)];});
 const gram=(f:number[][])=>f.map(a=>f.map(b=>dot(a,b)));const teacherGram=gram(reference),studentGram=gram(student);
 const error=sum(studentGram.flatMap((row,i)=>row.map((v,j)=>(v-teacherGram[i][j])**2)))/256;
 return {reference,student,teacherGram,studentGram,error,similarities:studentGram[Math.min(15,Math.max(0,o.index))]};
}
