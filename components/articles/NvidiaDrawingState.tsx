'use client';
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
export type NvidiaDrawingInputs={
 moat:number;
 chip:{yieldPct:number;volume:number;design:number;pack:number};
 ai:{eligible:number;other:number;entrant:number;incumbent:number};
 investment:{growth:number;share:number;margin:number;opex:number};
 competition:{company:string;group:string};
 workload:{name:string;checked:string[]};
 financing:{company:string;kind:string;id:number|null;loops:boolean};
 evidence:number;
};
const defaults:NvidiaDrawingInputs={moat:0,chip:{yieldPct:70,volume:500000,design:500,pack:400},ai:{eligible:12,other:8,entrant:2,incumbent:2},investment:{growth:35,share:70,margin:70,opex:18},competition:{company:'AMD',group:'All'},workload:{name:'Training',checked:[]},financing:{company:'all',kind:'all',id:1,loops:false},evidence:0};
type Publisher=<K extends keyof NvidiaDrawingInputs>(key:K,value:NvidiaDrawingInputs[K])=>void;
const Context=createContext<{inputs:NvidiaDrawingInputs;publish:Publisher}|null>(null);
export function NvidiaDrawingProvider({children}:{children:ReactNode}){const [inputs,setInputs]=useState(defaults);const publish:Publisher=useCallback((key,value)=>setInputs(old=>JSON.stringify(old[key])===JSON.stringify(value)?old:{...old,[key]:value}),[]);const context=useMemo(()=>({inputs,publish}),[inputs,publish]);return <Context.Provider value={context}>{children}</Context.Provider>}
export function useNvidiaDrawing(){const value=useContext(Context);if(!value)throw new Error('Drawing state requires article provider');return value}
/** Controls remain the source of truth; the drawing receives derived snapshots. */
export function usePublishDrawing<K extends keyof NvidiaDrawingInputs>(key:K,value:NvidiaDrawingInputs[K]){const {publish}=useNvidiaDrawing();const serialized=JSON.stringify(value);useEffect(()=>{publish(key,JSON.parse(serialized))},[key,serialized,publish])}
