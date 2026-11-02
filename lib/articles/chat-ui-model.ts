export type ChatWorkspace = {built:boolean;cost:boolean;maxLead:number;sort:'lead'|'cost'};
export const chatDefaults:ChatWorkspace={built:false,cost:false,maxLead:30,sort:'lead'};
export const chatPrompts=[
 {id:'build',text:'Build a supplier comparison.',reply:'A working comparison is ready. These are three fictional suppliers.'},
 {id:'cost',text:'Add the cost per part.',reply:'Cost is now visible. Change the view directly or keep refining it here.'},
 {id:'filter',text:'Show only suppliers ready within 14 days.',reply:'The lead-time limit is 14 days. The hidden rows are still in the dataset.'},
 {id:'sort',text:'Put the lowest cost first.',reply:'Sorted by cost. No supplier has been contacted or selected.'}
] as const;
export type ChatCommand=typeof chatPrompts[number]['id'];
export function applyChatCommand(state:ChatWorkspace,command:ChatCommand):ChatWorkspace {
 switch(command){
  case 'build':return {...state,built:true};
  case 'cost':return {...state,built:true,cost:true};
  case 'filter':return {...state,built:true,maxLead:14};
  case 'sort':return {...state,built:true,cost:true,sort:'cost'};
 }
}
export const suppliers=[{name:'Alder',lead:8,cost:18.4},{name:'Birch',lead:12,cost:16.9},{name:'Cedar',lead:21,cost:14.2}];
export function visibleSuppliers(state:ChatWorkspace){return state.built?suppliers.filter(s=>s.lead<=state.maxLead).sort((a,b)=>state.sort==='cost'?a.cost-b.cost:a.lead-b.lead):[];}
