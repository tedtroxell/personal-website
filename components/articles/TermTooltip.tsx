import { useEffect, useId, useRef, useState } from 'react';

export function TermTooltip({term,explanation}:{term:string;explanation:string}) {
 const id=useId(),trigger=useRef<HTMLButtonElement>(null),timer=useRef<ReturnType<typeof setTimeout>|null>(null);
 const [open,setOpen]=useState(false),[position,setPosition]=useState<{left:number;top:number;width:number}|null>(null);
 function cancelClose(){if(timer.current)clearTimeout(timer.current)}
 function show(){cancelClose();setOpen(true)}
 function leave(){cancelClose();timer.current=setTimeout(()=>{if(document.activeElement!==trigger.current)setOpen(false)},180)}
 useEffect(()=>{
  if(!open)return;
  const rect=trigger.current!.getBoundingClientRect(),width=Math.min(320,innerWidth-40);
  setPosition({left:Math.max(20,Math.min(rect.left,innerWidth-width-20)),top:rect.bottom+230<innerHeight?rect.bottom+10:Math.max(20,rect.top-230),width});
  const close=()=>setOpen(false);
  addEventListener('scroll',close,{passive:true,capture:true});addEventListener('resize',close);
  return()=>{removeEventListener('scroll',close,true);removeEventListener('resize',close)};
 },[open]);
 useEffect(()=>()=>cancelClose(),[]);
 return <span className="note-term" onMouseEnter={show} onMouseLeave={leave}>
  <button ref={trigger} type="button" className="note-term-trigger" aria-describedby={open?id:undefined} onFocus={show} onBlur={()=>setOpen(false)} onClick={show} onKeyDown={e=>{if(e.key==='Escape'){cancelClose();setOpen(false);e.stopPropagation()}}}>{term}<span aria-hidden="true"> ⓘ</span></button>
  {open&&position&&<span id={id} role="tooltip" className="note-term-tooltip" style={position} onMouseEnter={cancelClose} onMouseLeave={leave}>{explanation}</span>}
 </span>;
}
export function GramAnchoringText({text}:{text:string}) {
 const term='Gram anchoring',index=text.indexOf(term);
 if(index<0)return <>{text}</>;
 return <>{text.slice(0,index)}<TermTooltip term={term} explanation="Gram anchoring helps image patches keep useful relationships during training. DINOv3 compares a matrix of pairwise patch similarities (a Gram matrix) with one from a teacher model. It encourages those relationships to stay consistent while allowing the feature vectors themselves to change."/>{text.slice(index+term.length)}</>;
}
