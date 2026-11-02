"use client";
import { useEffect, useMemo, useRef, useState } from 'react';
import { getPublicationDate } from '@/lib/articles/publication-dates';
import { fieldNotes, type FieldNote } from '@/lib/articles/field-notes';
import { workflow, measurement, inspection, workflowDefaults, measurementDefaults, inspectionDefaults } from '@/lib/articles/models';
import { WorkflowDrawing, MeasurementDrawing, InspectionDrawing } from './DraftDrawings';
import { ChatUiDrawing, ChatUiControls } from './ChatUiExperiment';
import { chatDefaults } from '@/lib/articles/chat-ui-model';
import { PaperDrawing, PaperControls } from './PaperExperiment';
import { paperDefaults } from '@/lib/articles/paper-models';
import { GramAnchoringText } from './TermTooltip';
import { CodeExample } from './CodeExample';
import { OodDrawing, OodControls } from './OodExperiment';
import { ood, oodDefaults } from '@/lib/articles/ood-model';
import { WorkflowControls, MeasurementControls, InspectionControls } from './WorkbenchControls';

export function InteractiveArticle({note}:{note:FieldNote}) {
 const root=useRef<HTMLElement>(null);
 const publication=getPublicationDate(note.slug);
 const [progress,setProgress]=useState(0),[active,setActive]=useState(0),[full,setFull]=useState(false),[reveal,setReveal]=useState(false);
 const [work,setWork]=useState(workflowDefaults),[gauge,setGauge]=useState(measurementDefaults),[policy,setPolicy]=useState(inspectionDefaults);
 const [paper,setPaper]=useState(paperDefaults[note.paper?.kind??'attention']);
 const [chat,setChat]=useState(chatDefaults);
 const [chatEpoch,setChatEpoch]=useState(0);
 const [monitor,setMonitor]=useState(oodDefaults);
 const monitorResult=useMemo(()=>ood(monitor),[monitor]);
 const workResult=useMemo(()=>workflow(work),[work]);
 const gaugeResult=useMemo(()=>measurement(gauge),[gauge]);
 const policyResult=useMemo(()=>inspection(policy),[policy]);
 useEffect(()=>{
  const media=matchMedia('(prefers-reduced-motion: reduce)');let frame=0;
  const clamp=(n:number)=>Math.max(0,Math.min(1,n));
  const draw=()=>{frame=0;const sections=[...root.current!.querySelectorAll<HTMLElement>('[data-note-section]')];const value=sections.reduce((sum,section)=>{const r=section.getBoundingClientRect();return sum+clamp((innerHeight*.7-r.top)/Math.max(1,r.height*.9));},0)/sections.length;setProgress(media.matches?1:Math.round(value*100)/100);setActive(sections.reduce((current,section,i)=>section.getBoundingClientRect().top<=innerHeight*.65?i:current,0));};
  const queue=()=>{if(!frame)frame=requestAnimationFrame(draw)};
  addEventListener('scroll',queue,{passive:true});addEventListener('resize',queue);media.addEventListener('change',queue);draw();
  return()=>{removeEventListener('scroll',queue);removeEventListener('resize',queue);media.removeEventListener('change',queue);cancelAnimationFrame(frame)};
 },[note.slug]);
 const drawn=full?1:progress;
 function reset(){setPaper(paperDefaults[note.paper?.kind??'attention']);setChat(chatDefaults);setChatEpoch(v=>v+1);setMonitor(oodDefaults);setWork(workflowDefaults);setGauge(measurementDefaults);setPolicy(inspectionDefaults);setReveal(false);}
 return <main id="main" className="wrap field-note" tabIndex={-1} ref={root}>
  <header className="note-header"><div><p className="eyebrow"><time dateTime={publication.iso}>{publication.label.toUpperCase()}</time> / {note.category.toUpperCase()}</p><h1>{note.title}</h1><p className="note-deck">{note.deck}</p><p className="note-meta">TED TROXELL <span> / </span>{note.readTime} + AN EXPERIMENT</p><a className="text-link" href="#try-model">Try the model <span aria-hidden="true">↘</span></a></div><figure className="note-cover"><img src={`/assets/articles/${note.slug}.svg`} alt="" width="960" height="600"/><figcaption>FIELD NOTES / {note.paper?note.paper.number:note.kind==='chat'?'105':note.kind==='ood'?'104':note.kind==='workflow'?'101':note.kind==='measurement'?'102':'103'}</figcaption></figure></header>
  {note.paper&&<aside className="paper-source-card"><p className="eyebrow">READING THE RESEARCH / {note.paper.status.toUpperCase()}</p><a href={note.paper.url}>{note.paper.title} ↗</a><p>{note.paper.authors} · {note.paper.released}</p><p>The paper supplies the research claims. This article’s browser experiment is an independent, simplified illustration.</p></aside>}
  <nav className="note-chapters" aria-label="Article sections">{note.sections.map((section,i)=><a key={section.title} href={`#chapter-${i+1}`} aria-label={`Section ${i+1}: ${section.title}`} aria-current={active===i?'location':undefined}>{String(i+1).padStart(2,'0')}<span>{section.title.split('.')[0]}</span></a>)}<a href="#try-model">↗<span>The experiment</span></a></nav>
  <div className="note-layout">
   <aside className="note-figure" aria-label="Scroll-linked drafting illustration"><div className="note-figure-head"><span>ASSEMBLED BY YOUR SCROLL</span><button type="button" aria-pressed={full} onClick={()=>setFull(!full)}>{full?'Follow the story':'Show complete drawing'}</button></div>
    {note.paper?<PaperDrawing kind={note.paper.kind} options={paper} progress={drawn}/>:note.kind==='chat'?<ChatUiDrawing state={chat} progress={drawn}/>:note.kind==='ood'?<OodDrawing result={monitorResult} progress={drawn}/>:note.kind==='workflow'?<WorkflowDrawing result={workResult} progress={drawn}/>:note.kind==='measurement'?<MeasurementDrawing result={gaugeResult} options={gauge} progress={drawn}/>:<InspectionDrawing result={policyResult} progress={drawn} reveal={reveal}/>}
    <p className="note-figure-caption">{note.paper?'An independent teaching illustration. Use the experiment controls and numeric readouts below; no research model runs in this drawing.':note.kind==='chat'?'A request becomes a validated view, then a working comparison. Conversation and controls share the same state.':note.kind==='ood'?'Reference → monitoring → reviewed labels → candidate → evaluation → canary. Each gate has a separate job.':note.kind==='workflow'?'Bars show work. Pale lines include waiting and handoffs.':note.kind==='measurement'?'Green: specification. Dashed green: reference. Coral: average reading. Curve height is normalized to its peak.':reveal?'Coral: reference defects. Green: reference good parts. Amber band: offered for review.':'Each dot is a part. Amber band: offered for review. Reveal the reference labels in the controls.'}</p><div className="note-progress" aria-hidden="true"><span style={{width:`${drawn*100}%`}}/></div>
   </aside>
   <div className="note-copy">{note.sections.map((section,i)=><section id={`chapter-${i+1}`} className="note-section" data-note-section key={section.title}><p className="eyebrow">{String(i+1).padStart(2,'0')} / {note.paper?'READ THE METHOD':note.kind==='chat'?'BUILD THE WORKSPACE':note.kind==='ood'?'CLOSE THE LEARNING LOOP':note.kind==='workflow'?'FOLLOW THE WORK':note.kind==='measurement'?'CHECK THE REFERENCE':'DEFINE THE DECISION'}</p><h2>{section.title}</h2>{section.paragraphs.map(p=><p key={p.slice(0,45)}>{note.paper?.kind==='dino'?<GramAnchoringText text={p}/>:p}</p>)}{section.equation&&<p className="note-equation">{section.equation}</p>}{section.code&&<CodeExample {...section.code}/>} {section.takeaway&&<aside className="note-takeaway"><span className="eyebrow">KEEP THIS IN VIEW</span><p>{section.takeaway}</p></aside>}</section>)}
    <section className="note-workbench" id="try-model"><p className="eyebrow">THE EXPERIMENT / CHANGE ONE THING</p><h2>{note.modelTitle}</h2><p>{note.modelIntro}</p><p className="note-example-label">SYNTHETIC EXAMPLE / LIVE RESULTS</p>
     {note.paper?<PaperControls kind={note.paper.kind} options={paper} set={setPaper}/>:note.kind==='chat'?<ChatUiControls key={chatEpoch} state={chat} set={setChat}/>:note.kind==='ood'?<OodControls options={monitor} set={setMonitor} result={monitorResult}/>:note.kind==='workflow'?<WorkflowControls options={work} set={setWork} result={workResult}/>:note.kind==='measurement'?<MeasurementControls options={gauge} set={setGauge} result={gaugeResult}/>:<InspectionControls options={policy} set={setPolicy} result={policyResult} reveal={reveal} setReveal={setReveal}/>}
     <button type="button" className="note-reset" onClick={reset}>Reset this example ↺</button><details className="note-assumptions"><summary>What this model assumes</summary><p>{note.assumptions}</p></details>
    </section>
    {note.kind==='ood'&&<section className="note-download"><p className="eyebrow">BUILD IT LOCALLY</p><h2>The PyTorch example.</h2><p>Source, six unit tests, pinned dependency and setup instructions. Runs on your machine, with synthetic data. No service credentials required.</p><a className="text-link" href="/downloads/ood-observability-pytorch.zip" download>Download the example ZIP ↗</a><p><small>Tested with Python 3.12 / PyTorch 2.4.1 / CPU. Includes limitations and production integration notes.</small></p></section>}
    <section className="note-sources"><p className="eyebrow">SOURCES &amp; FURTHER READING</p><h2>The references behind the ideas.</h2><p>The numbers in the experiment are illustrative. These references support the methods and distinctions discussed in the article.</p><ol>{note.sources.map(s=><li key={s.url}><a href={s.url}>{s.label} ↗</a><p>{s.note}</p></li>)}</ol></section>
   </div>
  </div>
  <nav className="note-related" aria-label="More field notes"><div><p className="eyebrow">KEEP READING</p><h2>Another part of the problem.</h2></div>{fieldNotes.filter(n=>n.slug!==note.slug).sort((a,b)=>getPublicationDate(b.slug).iso.localeCompare(getPublicationDate(a.slug).iso)).slice(0,3).map(n=><a key={n.slug} href={`/${n.slug}/`}><img src={`/assets/articles/${n.slug}.svg`} alt="" width="480" height="300"/><span>{n.category}</span><strong>{n.title} ↗</strong></a>)}</nav><p className="note-back"><a href="/blog/">← All field notes</a></p>
 </main>;
}
