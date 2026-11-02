import { useState } from 'react';
import { Sheet, Layer } from './DraftDrawings';
import { Range } from './WorkbenchControls';
import { applyChatCommand,chatPrompts,visibleSuppliers,type ChatWorkspace,type ChatCommand } from '@/lib/articles/chat-ui-model';
export function ChatUiDrawing({state,progress}:{state:ChatWorkspace;progress:number}) {return <Sheet title="CONVERSATION / A SHARED WORKSPACE" number="105">
 <Layer phase={progress*5}><rect x="36" y="80" width="193" height="55" rx="6" pathLength={1} className="note-frame note-drawn"/><path d="M54 135v14l18-14M58 101h143M58 115h104" pathLength={1} className="note-trace"/><text x="38" y="173" className="note-svg-label">01 / DESCRIBE THE TASK</text></Layer>
 <Layer phase={progress*5-1}><path d="M243 108H296m-9-6 9 6-9 6" pathLength={1} className="note-trace"/><rect x="312" y="80" width="207" height="82" className="note-frame"/><text x="330" y="104" className="note-svg-small">VALIDATED VIEW CONTRACT</text><path d="M331 120h161M331 137h102" pathLength={1} className="note-trace"/><text x="313" y="186" className="note-svg-small">TRUSTED COMPONENTS + DATA</text></Layer>
 <Layer phase={progress*5-2}><rect x="37" y="211" width="482" height="133" pathLength={1} className="note-part note-drawn"/><path d="M37 242H519M37 276H519M37 310H519M245 242V344M380 242V344" pathLength={1} className="note-trace"/><text x="55" y="232" className="note-svg-label">SUPPLIER COMPARISON</text>{['ALDER','BIRCH','CEDAR'].map((n,i)=><g key={n}><text x="55" y={265+i*34} className="note-svg-small">{n}</text><text x="270" y={265+i*34} className="note-svg-small">{[8,12,21][i]} DAYS</text><text x="411" y={265+i*34} className="note-svg-small">{state.cost?[18.4,16.9,14.2][i].toFixed(2):'···'}</text></g>)}</Layer>
 <Layer phase={progress*5-3}><path d="M416 345V364H132V190m-6 9 6-9 6 9" pathLength={1} className="note-trace"/><text x="187" y="359" className="note-svg-small">REQUEST ↔ DIRECT CONTROL ↔ UNDO</text></Layer>
 <Layer phase={progress*5-4}><circle cx="44" cy="372" r="3" fill="#d96747"/><text x="56" y="376" className="note-svg-small">{state.built?`LIVE VIEW: ${visibleSuppliers(state).length} SUPPLIERS / ${state.maxLead} DAY LIMIT`:'A QUESTION BECOMES A WORKING SURFACE'}</text></Layer>
 </Sheet>;}
export function ChatUiControls({state,set}:{state:ChatWorkspace;set:(s:ChatWorkspace)=>void}) {
 const [history,setHistory]=useState<{state:ChatWorkspace;message:string;reply:string}[]>([]);
 function change(next:ChatWorkspace,message:string,reply:string){setHistory(h=>[...h,{state:{...state},message,reply}]);set(next)}
 function request(command:ChatCommand){const p=chatPrompts.find(p=>p.id===command)!;change(applyChatCommand(state,command),p.text,p.reply)}
 function undo(){const previous=history.at(-1);if(previous){set(previous.state);setHistory(history.slice(0,-1))}}
 const rows=visibleSuppliers(state);
 return <div className="chat-ui-demo">
  <p className="chat-demo-label">SCRIPTED DEMO / NO AI SERVICE OR EXTERNAL CALLS</p>
  <div className="chat-requests" role="group" aria-label="Scripted conversation requests">{chatPrompts.map((p,i)=><button type="button" key={p.id} onClick={()=>request(p.id)}><span>0{i+1}</span>{p.text}<span aria-hidden="true">↗</span></button>)}</div>
  <div className="chat-transcript" aria-label="Conversation history"><p className="eyebrow">THE CONVERSATION</p>{history.length?history.map((turn,i)=><div className="chat-turn" key={i}><p><strong>You</strong>{turn.message}</p><p><strong>Workspace</strong>{turn.reply}</p></div>):<p>Choose a request above to start building the view.</p>}</div>
  <section className="chat-workspace" aria-label="Generated supplier comparison"><p className="eyebrow">THE WORKSPACE / FICTIONAL QUOTES V1</p><h3>{state.built?'Supplier comparison':'Your view will appear here.'}</h3>{state.built&&<>
   <div className="note-controls"><Range label="Maximum lead time" value={state.maxLead} min={7} max={30} format={v=>v+' days'} onChange={v=>change({...state,maxLead:v},`Set lead-time limit to ${v} days using the slider.`,'The same comparison is updated.')}/><label className="chat-sort">Sort suppliers<select value={state.sort} onChange={e=>change({...state,sort:e.target.value as ChatWorkspace['sort']},'Changed sort using the control.','The current filter is preserved.')}><option value="lead">Shortest lead time</option><option value="cost">Lowest cost</option></select></label></div>
   <label className="note-check"><input type="checkbox" checked={state.cost} onChange={e=>change({...state,cost:e.target.checked},e.target.checked?'Show costs using the checkbox.':'Hide costs using the checkbox.','The dataset and filter are unchanged.')}/>Show cost per part</label>
   <p className="chat-result" role="status">{rows.length} of 3 suppliers shown. Lead time ≤ {state.maxLead} days. Sorted by {state.sort==='cost'?'cost':'lead time'}.</p>
   {rows.length?<div className="note-data-scroll"><table><caption>Illustrative quotes / cost in currency units per part</caption><thead><tr><th>Supplier</th><th>Lead time</th>{state.cost&&<th>Unit cost</th>}</tr></thead><tbody>{rows.map(s=><tr key={s.name}><th>{s.name}</th><td>{s.lead} days</td>{state.cost&&<td>{s.cost.toFixed(2)}</td>}</tr>)}</tbody></table></div>:<p>No suppliers meet this limit. Increase the lead time to bring rows back.</p>}
  </>}</section>
  <button className="note-reset" type="button" disabled={!history.length} onClick={undo}>Undo last change ↶</button><p className="note-reading">Everything stays in this page visit. The requests are predefined transformations, not generated code. No supplier is contacted.</p>
 </div>;
}
