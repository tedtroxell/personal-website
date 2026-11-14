/** Illustrative four-year exposure model. Initial share 85%, revenue 100, profit 60. */
export function scenario(growth:number,share:number,margin:number,opex=15) {
 if(![growth,share,margin,opex].every(Number.isFinite)||growth < -100||share<0||share>100||margin<0||margin>100||opex<0||opex>100)throw new RangeError('Invalid scenario assumptions');
 const revenue=100*(1+growth/100)**4*(share/85);
 const profit=revenue*(margin-opex)/100;
 return {revenue,profit,profitMultiple:profit/60,years:Array.from({length:5},(_,year)=>{const s=85+(share-85)*year/4;return {year,revenue:100*(1+growth/100)**year*s/85}})};
}
export function matchingRelationships<T extends {from:string;to:string;kind:string}>(rows:T[],company:string,kind:string):T[]{return rows.filter(r=>(company==='all'||r.from===company||r.to===company)&&(kind==='all'||r.kind===kind))}

/** Hypothetical unit economics; final effective yield, no estimated NVIDIA BOM. */
export function chipEconomics(waferCost:number,dies:number,yieldPct:number,packageCost:number,designMillions:number,units:number){
 if(![waferCost,dies,yieldPct,packageCost,designMillions,units].every(Number.isFinite)||waferCost<0||dies<=0||yieldPct<=0||yieldPct>100||packageCost<0||designMillions<0||units<=0)throw new RangeError('Invalid unit economics');
 const goodDies=dies*yieldPct/100,waferPerUnit=waferCost/goodDies,designPerUnit=designMillions*1e6/units;
 return {goodDies,waferPerUnit,designPerUnit,variableCost:waferPerUnit+packageCost,totalCost:waferPerUnit+packageCost+designPerUnit};
}
/** Additive teaching schedule. Excludes overlapping tasks and rework. */
export function aiSchedule(eligibleMonths:number,otherMonths:number,speedup:number){
 if(![eligibleMonths,otherMonths,speedup].every(Number.isFinite)||eligibleMonths<0||otherMonths<0||speedup<1)throw new RangeError('Invalid schedule assumptions');
 const before=eligibleMonths+otherMonths,after=eligibleMonths/speedup+otherMonths;
 return {before,after,saved:before-after,reduction:before===0?0:(before-after)/before*100};
}
