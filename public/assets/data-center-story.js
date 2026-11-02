/* Local data from the supplied report HTML. Scoped to this WordPress article. */
(() => {
const root=document.querySelector('.tt-dc-article');
if (!root) return;

const CASES=[{"id":"P01","name":"Project Jupiter (Oracle/STACK)","place":"Santa Teresa, NM","truth":"DC","raw":13,"disc":19},{"id":"P02","name":"Meta Hyperion (Project Sucre)","place":"Richland Parish, LA","truth":"DC","raw":12,"disc":17},{"id":"P03","name":"Vantage Port Washington","place":"Port Washington, WI","truth":"DC","raw":13,"disc":19},{"id":"P04","name":"Amazon New Carlisle","place":"St. Joseph County, IN","truth":"DC","raw":11,"disc":16},{"id":"P05","name":"Google New Albany (Montauk Innovations LLC)","place":"New Albany, OH","truth":"DC","raw":10,"disc":15},{"id":"P06","name":"Meta New Albany","place":"New Albany, OH","truth":"DC","raw":11,"disc":16},{"id":"P07","name":"Google Fort Wayne","place":"Allen County, IN","truth":"DC","raw":8,"disc":12},{"id":"P08","name":"Oracle/Crusoe Stargate Abilene","place":"Abilene, TX","truth":"DC","raw":11,"disc":17},{"id":"P09","name":"Homer City Energy Campus","place":"Homer City, PA","truth":"DC","raw":9,"disc":14},{"id":"P10","name":"Microsoft Mount Pleasant","place":"Mount Pleasant, WI","truth":"DC","raw":6,"disc":12},{"id":"P11","name":"Slavic Village hyperscale","place":"Cleveland, OH","truth":"DC","raw":5,"disc":10},{"id":"P12","name":"Amherst Nordson campus","place":"Amherst, OH","truth":"DC","raw":1,"disc":5},{"id":"P13","name":"Microsoft Licking County","place":"Heath/Hebron, OH","truth":"DC","raw":9,"disc":15},{"id":"N01","name":"Intel Ohio One","place":"New Albany, OH","truth":"NON_DC","raw":8,"disc":5},{"id":"N02","name":"Anduril Arsenal-1","place":"Pickaway County, OH","truth":"NON_DC","raw":6,"disc":3},{"id":"N03","name":"Hadrian Mesa factory","place":"Mesa, AZ","truth":"NON_DC","raw":2,"disc":-1},{"id":"N04","name":"Honda-LG battery plant","place":"Fayette County, OH","truth":"NON_DC","raw":8,"disc":5},{"id":"N05","name":"Micron Clay megafab","place":"Clay, NY","truth":"NON_DC","raw":10,"disc":7},{"id":"N06","name":"Ford BlueOval City","place":"Stanton, TN","truth":"NON_DC","raw":5,"disc":2},{"id":"N07","name":"Scout Motors (Project Connect)","place":"Blythewood, SC","truth":"NON_DC","raw":8,"disc":5},{"id":"N08","name":"Foxconn Wisconn Valley (2017)","place":"Mount Pleasant, WI","truth":"NON_DC","raw":11,"disc":8},{"id":"N09","name":"Code-named fulfillment center (generic)","place":"Ohio","truth":"NON_DC","raw":5,"disc":7},{"id":"N10","name":"Supplier plant (generic)","place":"Midwest","truth":"NON_DC","raw":3,"disc":0},{"id":"Q01","name":"Saline Twp (Related / Oracle-OpenAI)","place":"Saline Twp, MI","truth":"DC","raw":7,"disc":13},{"id":"Q02","name":"Microsoft Project Nova","place":"Caledonia, WI","truth":"DC","raw":9,"disc":14},{"id":"Q03","name":"PRSM Preble County","place":"Preble County, OH","truth":"DC","raw":5,"disc":11},{"id":"Q04","name":"CRG Project Cumulus","place":"St. Charles, MO","truth":"DC","raw":10,"disc":16},{"id":"Q05","name":"Hancock County MegaSite","place":"Buck Creek Twp, IN","truth":"DC","raw":8,"disc":13},{"id":"Q06","name":"Bristol Innovation Park","place":"Bristol, IN","truth":"DC","raw":7,"disc":12},{"id":"Q07","name":"Howell Twp (Randee LLC)","place":"Howell Twp, MI","truth":"DC","raw":6,"disc":11},{"id":"Q08","name":"QTS Dane County","place":"DeForest, WI","truth":"DC","raw":9,"disc":15},{"id":"Q09","name":"Google Franklin Township","place":"Indianapolis, IN","truth":"DC","raw":6,"disc":12},{"id":"R01","name":"Panasonic De Soto (Project Ocean)","place":"De Soto, KS","truth":"NON_DC","raw":9,"disc":6},{"id":"R02","name":"Samsung Taylor (Project Silicon Silver)","place":"Taylor, TX","truth":"NON_DC","raw":9,"disc":11},{"id":"R03","name":"Hyundai Metaplant","place":"Bryan County, GA","truth":"NON_DC","raw":7,"disc":4},{"id":"R04","name":"Oak Run Solar","place":"Madison County, OH","truth":"NON_DC","raw":4,"disc":8},{"id":"R05","name":"Nucor Mason County","place":"Point Pleasant, WV","truth":"NON_DC","raw":6,"disc":3},{"id":"R06","name":"300 MW battery storage (generic)","place":"Midwest","truth":"NON_DC","raw":2,"disc":6}];
const SIGNALS=[["Who's in the room (S6)",0.955,"A known data-center developer, engineer or counsel behind the LLC"],["Jobs per dollar (S8)",0.938,"Under 5 permanent jobs per $100M of capex"],["Power filings (S1)",0.679,"Load-side utility, RTO or generator air-permit filings"],["Land assembly (S2)",0.624,"100+ contiguous acres by a new LLC"],["Timing (S7)",0.592,"Grading before disclosure; expedited review"],["Site specs (S4)",0.554,"Water, parking, docks, fiber"],["Code name (S3)",0.445,"Project X, NDAs in minutes"],["Capex-sized incentives (S5)",0.409,"Equipment exemptions, 30-year abatements, IRBs"]];
const LEADS=[["Meta, Middleton Twp (Toledo)",28,"Shell LLC rezoning → tenant named","Liames LLC, late 2022 → Apr 2025"],["Aligned, Pataskala (Columbus)",24,"Deed → application","Nov 2023 → Nov 2025"],["Meta, Lebanon (Indianapolis)",24,"Mayor's pursuit → disclosure","~2022 → Nov 2024"],["Prologis, Trenton (Cincinnati)",18,"Purchase agreement → plans","Apr 2024 → Jan 2026"],["Bristolville 25, Lordstown (Youngstown)",17,"Rezoning → site plan","May 2024 → Oct 2025"],["Meta, Beaver Dam (Madison)",14,"Shell LLC NDA → announcement","Balloonist LLC, Dec 2023 → Feb 2025"],["Microsoft, Gaines Twp (Grand Rapids)",14,"Deed → rezoning","Aug 2024 → Dec 2025"],["Bitdeer, Weathersfield (Youngstown)",9,"Deed → investor update","May 2025 → Feb 2026"],["Google, Monrovia (Indianapolis)",9,"PUD filing → tenant named","Jan 2025 → Oct 2025"],["Cloverleaf, Edwardsville (St. Louis)",9,"City emails → disclosure","May 2025 → Feb 2026"],["QTS, DeForest (Madison)",8,"State NDA → announcement","Feb 2025 → Oct 2025"],["Microsoft, Mount Pleasant (Milwaukee)",2,"Village NDA → announcement (voluntary)","Jan 2023 → Mar 2023"],["Springdale (Pittsburgh)",1,"Deed → council vote (voluntary)","Nov 2025 → Dec 2025"]];
const METROS=[["Chicago",14,7,2,"Joliet 1.8 GW; Project Cardinal 1.8 GW"],["Detroit–Ann Arbor",9,7,2,"Saline 1,383 MW"],["Indianapolis",8,2,3,"Meta Lebanon $10B"],["Pittsburgh",7,1,1,"Homer City 4.5 GW; Shippingport 2 GW; Upper Burrell 3 GW"],["Columbus",7,2,6,"Meta Prometheus ~1 GW"],["St. Louis",7,1,3,"CRG Festus $6B"],["Minneapolis–St. Paul",7,3,13,"Tract Farmington ~$5B"],["Milwaukee–Madison",7,3,2,"Vantage Port Washington $15B"],["Akron–Canton",5,2,11,"Bitdeer/Geis Shalersville to 750 MW"],["Youngstown",5,3,7,"McDonald Works to 900 MW (paper)"],["Cincinnati–Dayton",4,2,10,"Trenton 250 MW"],["Grand Rapids",4,1,4,"Microsoft Gaines 414 ac"],["Cleveland",3,2,7,"H5 downtown expansion"],["Toledo",2,0,5,"Meta Middleton $800M"]];

const tip=root.querySelector('#tip');
function showTip(e,html){tip.innerHTML=html;tip.style.opacity=1;moveTip(e)}
function moveTip(e){const x=Math.max(8,Math.min(e.clientX+14,window.innerWidth-296)),y=Math.max(8,Math.min(e.clientY+14,window.innerHeight-110));tip.style.left=x+'px';tip.style.top=y+'px'}
function hideTip(){tip.style.opacity=0}
function el(n,a={},t){const s=document.createElementNS('http://www.w3.org/2000/svg',n);for(const k in a)s.setAttribute(k,a[k]);if(t!=null)s.textContent=t;return s}
function hover(node,html){node.classList.add('mark');node.addEventListener('mouseenter',e=>showTip(e,html));node.addEventListener('mousemove',moveTip);node.addEventListener('mouseleave',hideTip);node.addEventListener('focus',e=>{const r=node.getBoundingClientRect();showTip({clientX:r.left,clientY:r.top},html)});node.addEventListener('blur',hideTip);node.setAttribute('tabindex','0')}
const CSS=getComputedStyle(root);const col=v=>CSS.getPropertyValue(v).trim();

/* F1: AUC lollipops */
(function(){
  const W=880,L=250,R=40,rowH=38,T=30,H=T+SIGNALS.length*rowH+30;
  const svg=el('svg',{viewBox:`0 0 ${W} ${H}`,role:'img','aria-label':'Per-signal AUC'});
  const x=v=>L+v*(W-L-R);
  const ax=el('g',{class:'axis'});
  [0,0.25,0.5,0.75,1].forEach(v=>{ax.appendChild(el('line',{x1:x(v),x2:x(v),y1:T-6,y2:H-26,stroke:col('--rule'),'stroke-dasharray':v===0.5?'':'2 4'}));ax.appendChild(el('text',{x:x(v),y:H-8,'text-anchor':'middle',class:'muted'},v.toFixed(2)))});
  svg.appendChild(ax);
  svg.appendChild(el('line',{x1:x(0.5),x2:x(0.5),y1:T-8,y2:H-26,class:'ref'}));
  svg.appendChild(el('text',{x:x(0.5)+6,y:T-10,class:'ann'},'coin flip'));
  SIGNALS.forEach((s,i)=>{const y=T+i*rowH+rowH/2;const strong=s[1]>=0.9,bad=s[1]<0.5;const c=strong?col('--accent'):bad?col('--alarm'):col('--dim');
    const g=el('g');
    g.appendChild(el('text',{x:L-14,y:y+5,'text-anchor':'end',class:'lab',style:strong?'':'font-weight:500;fill:var(--ink-2)'},s[0]));
    g.appendChild(el('line',{x1:x(0),x2:x(s[1]),y1:y,y2:y,stroke:c,'stroke-width':strong?4:2,'stroke-linecap':'round'}));
    g.appendChild(el('circle',{cx:x(s[1]),cy:y,r:strong?8:6,fill:c,stroke:col('--paper'),'stroke-width':2}));
    g.appendChild(el('text',{x:x(s[1])+14,y:y+4,class:'val'},s[1].toFixed(2)));
    hover(g,`<b>${s[0]}</b><br>AUC ${s[1].toFixed(3)}<br>${s[2]}`);svg.appendChild(g)});
  document.getElementById('c1').replaceChildren(svg);
})();

/* F2: two strip plots */
(function(){
  const W=880,L=150,R=30;const panels=[["Pre-specified rule (0–14)","raw",10,0,14],["Discriminated rule (−3 to 20)","disc",12,-3,20]];
  const rowH=70,T=34,ph=T+2*rowH+34,H=panels.length*ph+10;
  const svg=el('svg',{viewBox:`0 0 ${W} ${H}`,role:'img','aria-label':'Scores under two rules'});
  panels.forEach((p,pi)=>{const y0=pi*ph;const [title,key,thr,lo,hi]=p;const x=v=>L+(v-lo)/(hi-lo)*(W-L-R);
    svg.appendChild(el('text',{x:0,y:y0+16,class:'lab'},title));
    for(let v=lo;v<=hi;v+=(hi-lo>16?2:2)){if((v-lo)%2)continue;svg.appendChild(el('line',{x1:x(v),x2:x(v),y1:y0+T-4,y2:y0+T+2*rowH,stroke:col('--rule'),'stroke-dasharray':'2 4'}));svg.appendChild(el('text',{x:x(v),y:y0+T+2*rowH+16,'text-anchor':'middle',class:'muted'},v))}
    svg.appendChild(el('line',{x1:x(thr)-0.5,x2:x(thr)-0.5,y1:y0+T-8,y2:y0+T+2*rowH+2,class:'ref'}));
    svg.appendChild(el('text',{x:x(thr)+6,y:y0+T-10,class:'ann'},`flag at ≥${thr}`));
    [["Data center","DC"],["Not a data center","NON_DC"]].forEach((row,ri)=>{const yc=y0+T+ri*rowH+rowH/2;
      svg.appendChild(el('text',{x:L-12,y:yc+4,'text-anchor':'end',class:'lab',style:'font-weight:500;fill:var(--ink-2)'},row[0]));
      svg.appendChild(el('line',{x1:L,x2:W-R,y1:yc,y2:yc,stroke:col('--rule')}));
      const pts=CASES.filter(c=>c.truth===row[1]);const buckets={};
      pts.forEach(c=>{const v=c[key];buckets[v]=(buckets[v]||0);const k=buckets[v]++;const off=(k%2?1:-1)*Math.ceil(k/2)*13;const cy=yc+off;
        const wrong=(row[1]==='DC'&&v<thr)||(row[1]==='NON_DC'&&v>=thr);const fill=row[1]==='DC'?col('--accent'):col('--dim');
        const g=el('g');g.appendChild(el('circle',{cx:x(v),cy:cy,r:6,fill:fill,stroke:col('--paper'),'stroke-width':1.5}));
        if(wrong)g.appendChild(el('circle',{cx:x(v),cy:cy,r:9.5,fill:'none',stroke:col('--alarm'),'stroke-width':2.5}));
        hover(g,`<b>${c.name}</b><br>${c.place}<br>Score ${v} · ${row[1]==='DC'?'data center':'not a data center'}${wrong?'<br><b>wrong call</b>':''}`);svg.appendChild(g)});
    });
    // annotations
    if(key==='raw'){const a=[["Foxconn 2017",11,1,30],["Micron",10,1,-24],["Slavic Village",5,0,38],["Amherst",1,0,24]];a.forEach(t=>{const yc=y0+T+t[2]*rowH+rowH/2;svg.appendChild(el('text',{x:x(t[1]),y:yc+t[3],'text-anchor':'middle',class:'ann'},t[0]))})}
    else{const a=[["Samsung Taylor",11,1,30],["Oak Run Solar",8,1,-24],["Slavic Village",10,0,-24],["Amherst",5,0,-24]];a.forEach(t=>{const yc=y0+T+t[2]*rowH+rowH/2;svg.appendChild(el('text',{x:x(t[1]),y:yc+t[3],'text-anchor':'middle',class:'ann'},t[0]))})}
  });
  document.getElementById('c2').replaceChildren(svg);
})();

/* F3: lead-time dot plot */
(function(){
  const W=880,L=300,R=40,rowH=30,T=28,H=T+LEADS.length*rowH+34;
  const svg=el('svg',{viewBox:`0 0 ${W} ${H}`,role:'img','aria-label':'Lead time in months'});
  const x=v=>L+v/30*(W-L-R);
  for(let v=0;v<=30;v+=6){svg.appendChild(el('line',{x1:x(v),x2:x(v),y1:T-6,y2:H-28,stroke:col('--rule'),'stroke-dasharray':'2 4'}));svg.appendChild(el('text',{x:x(v),y:H-8,'text-anchor':'middle',class:'muted'},v+(v===30?' mo':'')))}
  svg.appendChild(el('line',{x1:x(14),x2:x(14),y1:T-8,y2:H-28,class:'ref'}));
  svg.appendChild(el('text',{x:x(14)+6,y:T-10,class:'ann'},'median 14 mo when the first record is a deed, LLC or NDA'));
  LEADS.forEach((d,i)=>{const y=T+i*rowH+rowH/2;const vol=d[2].includes('voluntary');const c=vol?col('--dim'):col('--accent');const g=el('g');
    g.appendChild(el('text',{x:L-12,y:y+4,'text-anchor':'end',class:'lab',style:'font-weight:500;fill:var(--ink-2);font-size:13px'},d[0]));
    g.appendChild(el('line',{x1:x(0),x2:x(d[1]),y1:y,y2:y,stroke:c,'stroke-width':3,'stroke-linecap':'round'}));
    g.appendChild(el('circle',{cx:x(d[1]),cy:y,r:7,fill:c,stroke:col('--paper'),'stroke-width':2}));
    g.appendChild(el('text',{x:x(d[1])+13,y:y+4,class:'val'},d[1]));
    hover(g,`<b>${d[0]}</b><br>${d[1]} months<br>${d[2]}<br>${d[3]}`);svg.appendChild(g)});
  document.getElementById('c3').replaceChildren(svg);
  const k=document.createElement('div');k.className='keyrow';k.innerHTML='<span><i class="sw acc"></i>First record was a deed, LLC, NDA or filing</span><span><i class="sw dim"></i>Developer disclosed voluntarily</span>';document.getElementById('c3').appendChild(k);
})();

/* F4: network */
(function(){
  const W=880,H=420;const svg=el('svg',{viewBox:`0 0 ${W} ${H}`,role:'img','aria-label':'Google shell LLC network'});
  const hub=[["Michael Montfort",300,210,"Manager of record on Deep Meadow Ventures; tied to Spark Innovations and Groot (STLPR)"],["David Thomas",300,260,"Co-manager across the same LLC network (STLPR)"],["Joseph Calderon (counsel)",300,320,"Counsel on both Indiana Google filings; said Deep Meadow 'was created by Google'"]];
  const llcs=[["Deep Meadow Ventures",620,60,"Franklin Twp, Indianapolis · 468 ac · withdrawn Sept 2025"],["Morgan County Data Center I PUD",620,125,"Monrovia, IN · 391 ac · 390 MW · Google confirmed Oct 2025"],["Spark Innovations LLC",620,190,"St. Charles, MO · NDA with city staff · Project Cumulus"],["Groot",620,255,"St. Charles, MO · Army Corps permit applicant"],["AG Rose Solutions",620,320,"Kansas City"],["Peanut LLC",620,385,"Virginia"]];
  const links=[[0,0],[0,2],[0,3],[1,2],[1,3],[1,4],[1,5],[2,0],[2,1]];
  svg.appendChild(el('text',{x:60,y:30,class:'lab'},'Parent'));svg.appendChild(el('text',{x:300,y:30,class:'lab'},'People'));svg.appendChild(el('text',{x:620,y:30,class:'lab'},'LLCs and where they surfaced'));
  const g0=el('g');g0.appendChild(el('rect',{x:40,y:230,width:150,height:44,rx:3,fill:col('--accent')}));g0.appendChild(el('text',{x:115,y:257,'text-anchor':'middle',style:'fill:var(--paper);font-family:var(--display);font-weight:700;font-size:16px'},'Google'));svg.appendChild(g0);
  hub.forEach(h=>svg.appendChild(el('line',{x1:190,y1:252,x2:h[1]-6,y2:h[2]-5,stroke:col('--dim'),'stroke-width':1.5})));
  links.forEach(l=>{const a=hub[l[0]],b=llcs[l[1]];const sx=a[1]+18+a[0].length*7.4;svg.appendChild(el('path',{d:`M${sx},${a[2]-5} C${sx+80},${a[2]-5} ${b[1]-70},${b[2]-5} ${b[1]-8},${b[2]-5}`,fill:'none',stroke:col('--accent'),'stroke-width':1.5,opacity:.7}))});
  hub.forEach(h=>{const g=el('g');g.appendChild(el('circle',{cx:h[1],cy:h[2]-5,r:6,fill:col('--ink')}));g.appendChild(el('text',{x:h[1]+12,y:h[2],class:'val',style:'font-size:13px'},h[0]));hover(g,`<b>${h[0]}</b><br>${h[3]}`);svg.appendChild(g)});
  llcs.forEach(l=>{const g=el('g');g.appendChild(el('circle',{cx:l[1],cy:l[2]-5,r:6,fill:col('--accent')}));g.appendChild(el('text',{x:l[1]+12,y:l[2],class:'val',style:'font-size:13px'},l[0]));g.appendChild(el('text',{x:l[1]+12,y:l[2]+15,class:'muted',style:'font-size:11.5px'},l[3].split(' · ')[0]));hover(g,`<b>${l[0]}</b><br>${l[3]}`);svg.appendChild(g)});
  const wrap=document.createElement('div');wrap.style.overflowX='auto';wrap.appendChild(svg);svg.style.minWidth='640px';document.getElementById('c4').replaceChildren(wrap);
})();

/* F5: metro bars */
(function(){
  const W=880,L=190,R=90,rowH=34,T=26,H=T+METROS.length*rowH+30;const max=15;
  const svg=el('svg',{viewBox:`0 0 ${W} ${H}`,role:'img','aria-label':'Metro pipeline and pushback'});
  const x=v=>L+v/max*(W-L-R);
  for(let v=0;v<=max;v+=5){svg.appendChild(el('line',{x1:x(v),x2:x(v),y1:T-4,y2:H-26,stroke:col('--rule'),'stroke-dasharray':'2 4'}));svg.appendChild(el('text',{x:x(v),y:H-8,'text-anchor':'middle',class:'muted'},v+(v===max?' projects':'')))}
  svg.appendChild(el('text',{x:W-R+12,y:T-8,class:'lab',style:'font-size:12px'},'moratoriums'));
  const neo=new Set(["Cleveland","Akron–Canton","Youngstown","Toledo"]);
  METROS.forEach((m,i)=>{const y=T+i*rowH+4,h=rowH-10;const live=m[1]-m[2];const g=el('g');
    g.appendChild(el('text',{x:L-12,y:y+h/2+5,'text-anchor':'end',class:'lab',style:'font-weight:'+(neo.has(m[0])?'700':'500')+';fill:var(--ink'+(neo.has(m[0])?'':'-2')+')'},m[0]));
    if(live>0)g.appendChild(el('rect',{x:x(0),y:y,width:x(live)-x(0)-2,height:h,fill:col('--accent'),rx:0}));
    if(m[2]>0)g.appendChild(el('rect',{x:x(live)+(live>0?0:0),y:y,width:x(m[1])-x(live)-2,height:h,fill:col('--alarm')}));
    g.appendChild(el('text',{x:x(m[1])+6,y:y+h/2+4,class:'val'},m[1]));
    const mw=el('text',{x:W-R+12,y:y+h/2+5,class:'val',style:'font-family:var(--display);font-weight:800;font-size:18px;fill:'+(m[3]>=7?'var(--alarm)':'var(--ink)')},m[3]);g.appendChild(mw);
    hover(g,`<b>${m[0]}</b><br>${m[1]} proposed since 2022 · ${m[2]} withdrawn/rejected/stalled · ${m[3]} moratoriums<br>Largest live: ${m[4]}`);svg.appendChild(g)});
  document.getElementById('c5').replaceChildren(svg);
})();


/* Phone-sized views use the same case arrays as the desktop charts. */
function mobile(tag, className, label) {
  const n = document.createElement(tag);
  if (className) n.className = className;
  if (label != null) n.textContent = label;
  return n;
}
function mobilePanel(id, title) {
  const panel = mobile('div', 'tt-dc-mobile-chart');
  panel.setAttribute('aria-label', title);
  document.getElementById(id).appendChild(panel);
  return panel;
}
function mobileBar(panel, label, value, max, detail, extraClass='') {
  const row=mobile('div','tt-dc-m-row '+extraClass);
  const head=mobile('div','tt-dc-m-head');
  head.append(mobile('span','tt-dc-m-label',label), mobile('strong','tt-dc-m-value',detail));
  const track=mobile('div','tt-dc-m-track');
  const fill=mobile('span','tt-dc-m-fill');
  fill.style.width=(100*Math.max(0,Math.min(1,value/max)))+'%';
  track.appendChild(fill);
  row.append(head,track);
  panel.appendChild(row);
  return row;
}
{
  const panel=mobilePanel('c1','Signal strength on a zero-to-one scale');
  panel.appendChild(mobile('p','tt-dc-m-scale','AUC 0.00 ───────── 0.50 coin flip ───────── 1.00'));
  SIGNALS.forEach(s=>mobileBar(panel,s[0],s[1],1,s[1].toFixed(3),s[1]<.5?'is-weak':''));
}
{
  const panel=mobilePanel('c2','Two scoring rules compared across 38 projects');
  const rules=[['First rule','raw',0,14,10],['Revised rule','disc',-3,20,12]];
  rules.forEach(([title,key,min,max,threshold])=>{
    const card=mobile('section','tt-dc-m-rule');
    card.appendChild(mobile('h3','',title));
    card.appendChild(mobile('p','tt-dc-m-small','Each dot is a project. Vertical line: flag at '+threshold+'.'));
    [['Data centers','DC'],['Other projects','NON_DC']].forEach(([label,truth])=>{
      card.appendChild(mobile('p','tt-dc-m-row-label',label));
      const plot=mobile('div','tt-dc-m-dotplot');
      const line=mobile('span','tt-dc-m-threshold');
      line.style.left=(100*(threshold-min)/(max-min))+'%';
      plot.appendChild(line);
      const bins={};
      CASES.filter(c=>c.truth===truth).forEach(c=>{
        const keyValue=c[key];
        const index=bins[keyValue]||0;bins[keyValue]=index+1;
        const dot=mobile('span','tt-dc-m-dot '+(truth==='DC'?'is-dc':'is-other'));
        dot.style.left=(100*(keyValue-min)/(max-min))+'%';
        dot.style.top=(6+(index%3)*10)+'px';
        const wrong=(truth==='DC'&&keyValue<threshold)||(truth==='NON_DC'&&keyValue>=threshold);
        if(wrong)dot.classList.add('is-wrong');
        dot.title=c.name+'; score '+keyValue+(wrong?'; wrong call':'');
        plot.appendChild(dot);
      });
      card.appendChild(plot);
    });
    const ticks=mobile('div','tt-dc-m-ticks');
    ticks.append(mobile('span','',String(min)),mobile('span','',String(threshold)+' flag'),mobile('span','',String(max)));
    ticks.children[1].style.left=(100*(threshold-min)/(max-min))+'%';
    card.appendChild(ticks);
    panel.appendChild(card);
  });
}
{
  const panel=mobilePanel('c3','Months between first record and disclosure');
  LEADS.forEach(d=>mobileBar(panel,d[0],d[1],30,d[1]+' mo'));
}
{
  const panel=mobilePanel('c4','Google-affiliated LLCs and recurring people');
  panel.appendChild(mobile('div','tt-dc-m-network-parent','GOOGLE'));
  panel.appendChild(mobile('p','tt-dc-m-network-people','Recurring names in filings: Michael Montfort · David Thomas · Joseph Calderon (counsel)'));
  const llcNames=[['Deep Meadow Ventures','Franklin Township, IN'],['Morgan County Data Center I PUD','Monrovia, IN'],['Spark Innovations LLC','St. Charles, MO'],['Groot','St. Charles, MO'],['AG Rose Solutions','Kansas City'],['Peanut LLC','Virginia']];
  const list=mobile('div','tt-dc-m-network-list');
  llcNames.forEach(([name,place])=>{const item=mobile('div','tt-dc-m-network-item');item.append(mobile('strong','',name),mobile('span','',place));list.appendChild(item)});
  panel.appendChild(list);
}
{
  const panel=mobilePanel('c5','Projects proposed and stalled by metro');
  METROS.forEach(m=>{
    const row=mobile('div','tt-dc-m-row');
    const head=mobile('div','tt-dc-m-head');
    head.append(mobile('span','tt-dc-m-label',m[0]),mobile('strong','tt-dc-m-value',m[1]+' proposed'));
    const track=mobile('div','tt-dc-m-track is-stacked');
    const live=mobile('span','tt-dc-m-fill');live.style.width=(100*(m[1]-m[2])/15)+'%';
    const stopped=mobile('span','tt-dc-m-stalled');stopped.style.width=(100*m[2]/15)+'%';
    track.append(live,stopped);
    row.append(head,track,mobile('p','tt-dc-m-small',m[2]+' dead or stalled · '+m[3]+' moratorium'+(m[3]===1?'':'s')));
    panel.appendChild(row);
  });
}

})();
