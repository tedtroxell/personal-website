"""Build original local SVG/PNG covers for the six paper explainers."""
from pathlib import Path
import ast,json,math,subprocess
root=Path(__file__).resolve().parents[1]
module=ast.parse((root/'scripts/build-article-art.py').read_text())
base=next(ast.literal_eval(n.value) for n in module.body if isinstance(n,ast.Assign) and any(isinstance(t,ast.Name) and t.id=='base' for t in n.targets))
notes=json.loads((root/'lib/articles/paper-notes.ts').read_text().split('= ',1)[1].rstrip(';\n'))
ink='#526c5e'; coral='#d96747'
def path(d,stroke=ink,extra=''):return f'<path d="{d}" stroke="{stroke}" stroke-width="2" {extra}/>'
def text(x,y,label,size=16):return f'<text x="{x}" y="{y}" fill="{ink}" font-family="monospace" font-size="{size}">{label}</text>'
drawings={}
drawings['attention']=''.join(f'<rect x="{90+i*100}" y="140" width="65" height="45" fill="#526c5e12" stroke="{ink}"/>'+text(109+i*100,169,f'L{i+1}')+path(f'M{122+i*100} 186Q480 260 480 300')+f'<rect x="{100+i*100}" y="{455-[25,40,90,150,90,40,25,15][i]}" width="44" height="{[25,40,90,150,90,40,25,15][i]}" fill="{ink}"/>' for i in range(8))+text(310,288,'LEARNED ALLOCATION ACROSS DEPTH')+path('M90 455H870')+text(296,492,'SYNTHETIC WEIGHTS / NOT A BENCHMARK')
drawings['engram']=f'<rect x="90" y="131" width="330" height="60" fill="#526c5e12" stroke="{ink}"/>'+text(115,167,'bearing load → hash')+path('M421 160H810V224')+''.join(f'<rect x="{90+i*130}" y="245" width="100" height="95" fill="{coral if i==3 else ink}" fill-opacity=".12" stroke="{ink}"/>'+text(106+i*130,272,f'SLOT {i}')+text(125+i*130,316,str([1,2,0,3,1,1][i]),30) for i in range(6))+path('M90 391H870')+f'<rect x="90" y="410" width="500" height="24" fill="{ink}"/>'+text(628,430,'CONTEXT GATE')+text(90,489,'RETRIEVAL AND USE ARE SEPARATE DECISIONS')
drawings['bytes']=''.join(f'<rect x="{90+i*64}" y="145" width="53" height="45" stroke="{ink}" fill="{ink if i%4<2 else coral}" fill-opacity=".13"/>'+text(100+i*64,174,h) for i,h in enumerate(['63','61','66','c3','a9','20','3d','20','c2','b5','6d','0a']))+path('M480 209V272')+''.join(f'<rect x="{90+i*270}" y="300" width="240" height="95" stroke="{ink}" fill="#526c5e12"/>'+text(110+i*270,340,label)+text(110+i*270,373,'TRAINABLE' if i!=1 else 'FROZEN IN STAGE 1',13) for i,label in enumerate(['LOCAL ENCODER','GLOBAL MODEL','LOCAL DECODER']))+text(90,474,'SAME BYTES / DIFFERENT COMPUTATIONAL BOUNDARIES')
drawings['agent']=''.join(f'<rect x="125" y="{115+i*73}" width="710" height="52" stroke="{ink}" fill="{coral if i==3 else ink}" fill-opacity=".08"/><circle cx="151" cy="{141+i*73}" r="6" fill="{coral if i==3 else ink}"/>'+text(174,147+i*73,label)+text(720,147+i*73,'CHECK' if i==3 else 'PASS')+(path(f'M480 {168+i*73}v20') if i<4 else '') for i,label in enumerate(['READ THE METHOD','PIN THE ENVIRONMENT','VALIDATE ARGUMENTS','VERIFY REFERENCE FIXTURE','EXPOSE THE TOOL']))
xs=range(0,151)
ref=lambda x:8+14*math.exp(-.5*((x-45)/6)**2)+24*math.exp(-.5*((x-105)/10)**2)
alt=lambda x:ref(x)-7*math.exp(-.5*((x-45)/6)**2)-3.8*math.exp(-.5*((x-105)/10)**2)
curve=lambda f:' '.join(f'{"M" if x==0 else "L"}{90+x*5:.1f} {445-f(x)*7:.1f}' for x in xs)
drawings['genome']=f'<rect x="190" y="125" width="560" height="320" fill="#526c5e0d"/>'+path('M90 445H870M90 135V445')+path(curve(ref))+path(curve(alt),coral)+path('M190 115V463M750 115V463',extra='stroke-dasharray="4 6"')+text(300,112,'VISIBLE CONTEXT WINDOW')+text(90,490,'INVENTED TRACKS / NO BIOLOGICAL PREDICTION')
drawings['dino']=''.join(f'<rect x="{90+i%4*62}" y="{153+i//4*62}" width="57" height="57" fill="{ink if i%4<2 else coral}" fill-opacity=".8"/>' for i in range(16))+''.join(f'<rect x="{505+j*19}" y="{140+i*19}" width="17" height="17" fill="{ink if (i%4<2)==(j%4<2) else coral}" fill-opacity="{.85 if i==j else .6}"/>' for i in range(16) for j in range(16))+text(90,125,'PATCH FEATURES')+text(505,116,'PAIRWISE SIMILARITIES')+text(90,490,'RELATIONSHIPS CAN SURVIVE A COMMON ROTATION')
headings={'attention':'ARCHITECTURE / WHICH LAYERS GET A SAY?','engram':'MEMORY / STOP RECOMPUTING THE FAMILIAR','bytes':'REPRESENTATION / INSPECT THE BYTES','agent':'REPRODUCIBILITY / FROM PAPER TO TOOL','genome':'SCIENTIFIC ML / DETAIL NEEDS CONTEXT','dino':'VISION / PRESERVE PATCH RELATIONSHIPS'}
out=root/'public/assets/articles'
for note in notes:
 k=note['paper']['kind'];svg=out/(note['slug']+'.svg');svg.write_text(base.format(title=note['title'].replace('&','&amp;'),heading=headings[k],number=note['paper']['number'],drawing=drawings[k]))
 png=svg.with_suffix('.png')
 subprocess.run(['rsvg-convert','--width','1008','--height','630','--output',str(png),str(svg)],check=True)
 subprocess.run(['magick',str(png),'-background','#eeeee4','-gravity','center','-extent','1200x630',str(png)],check=True)
print('Built six original paper covers and social images locally.')
