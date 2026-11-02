"""Convert a local WordPress reference export into editable TSX, preserving geometry."""
from html.parser import HTMLParser
from pathlib import Path
import json, re, sys
ROOT=Path(__file__).resolve().parents[1]
SNAPSHOTS=Path(sys.argv[1]) if len(sys.argv)>1 else ROOT/'docs/reference/wordpress'
VOID=set('area base br col embed hr img input link meta param source track wbr'.split())
class Node:
 def __init__(self,tag='',attrs=()): self.tag=tag;self.attrs=dict(attrs);self.children=[]
class Parser(HTMLParser):
 def __init__(self,html):
  super().__init__(convert_charrefs=True);self.root=Node();self.stack=[self.root];self.feed(html)
 def handle_starttag(self,tag,attrs):
  n=Node(tag,attrs);self.stack[-1].children.append(n)
  if tag not in VOID:self.stack.append(n)
 def handle_startendtag(self,tag,attrs):
  self.handle_starttag(tag,attrs)
  if tag not in VOID:self.stack.pop()
 def handle_endtag(self,tag):
  for i in range(len(self.stack)-1,0,-1):
   if self.stack[i].tag==tag:self.stack=self.stack[:i];break
 def handle_data(self,data):self.stack[-1].children.append(data)
def nodes(n):
 if isinstance(n,Node):
  yield n
  for c in n.children:yield from nodes(c)
def find(root,tag=None,cls=None):
 return next(n for n in nodes(root) if (not tag or n.tag==tag) and (not cls or cls in n.attrs.get('class','').split()))
def local(value):
 value=value.replace('http://localhost:8091/wp-content/themes/tedtroxell/assets/','/assets/')
 value=value.replace('http://localhost:8091','')
 value=value.replace('/?post_type=post','/writing').replace('?post_type=post','/writing')
 value=value.replace('/?p=88','/pareto-mold-fill').replace('/?page_id=','/?page_id=')
 return value
SPECIAL={'class':'className','for':'htmlFor','tabindex':'tabIndex','readonly':'readOnly','maxlength':'maxLength','minlength':'minLength','autocomplete':'autoComplete','autofocus':'autoFocus','colspan':'colSpan','rowspan':'rowSpan','srcset':'srcSet','fetchpriority':'fetchPriority','viewbox':'viewBox','preserveaspectratio':'preserveAspectRatio','patternunits':'patternUnits','patterntransform':'patternTransform','gradientunits':'gradientUnits','gradienttransform':'gradientTransform','textlength':'textLength','lengthadjust':'lengthAdjust','markerwidth':'markerWidth','markerheight':'markerHeight','refx':'refX','refy':'refY','xmlns:xlink':'xmlnsXlink','xlink:href':'xlinkHref','datetime':'dateTime','crossorigin':'crossOrigin','value':'defaultValue','stddeviation':'stdDeviation','filterunits':'filterUnits','color-interpolation-filters':'colorInterpolationFilters','checked':'defaultChecked'}
BOOL=set('hidden disabled required multiple open reversed download autofocus readonly checked selected'.split())
def prop(k):
 if k in SPECIAL:return SPECIAL[k]
 if k.startswith(('data-','aria-')):return k
 return re.sub('-([a-z])',lambda m:m[1].upper(),k)
TAGS={'clippath':'clipPath','fegaussianblur':'feGaussianBlur','fecomponenttransfer':'feComponentTransfer','fefunca':'feFuncA','lineargradient':'linearGradient','radialgradient':'radialGradient'}
NUMERIC=set('tabindex maxlength minlength rows cols size span colspan rowspan start'.split())
for snapshot in SNAPSHOTS.glob('wp-reference-*.html'):
 raw=snapshot.read_text()
 SPECIAL.update({a.lower():a for a in re.findall(r'\b([a-zA-Z][\w:.-]*)\s*=',raw) if any(c.isupper() for c in a)})
 TAGS.update({t.lower():t for t in re.findall(r'</?([a-zA-Z][\w]*)',raw) if any(c.isupper() for c in t)})
def jsx(n):
 if isinstance(n,str):return '{'+json.dumps(n,ensure_ascii=False)+'}'
 if n.tag in ('script','noscript'):return ''
 attrs=[]
 for k,v in n.attrs.items():
  attr = 'value' if k == 'value' and n.tag not in ('input','textarea','select') else prop(k)
  if k=='selected':continue
  if k=='style':
   style={prop(a.strip()):b.strip() for a,b in (x.split(':',1) for x in v.split(';') if ':' in x)}
   attrs.append('style={'+json.dumps(style)+' as CSSProperties}')
  elif k in BOOL and (v is None or v=='' or v==k):attrs.append(attr)
  elif k in NUMERIC:attrs.append(attr+'={'+str(int(v))+'}')
  else:attrs.append(attr+'='+('{true}' if v is None else '{'+json.dumps(local(v),ensure_ascii=False)+'}'))
 a=(' '+' '.join(attrs)) if attrs else ''
 n.tag=TAGS.get(n.tag,n.tag)
 if n.tag in VOID:return '<'+n.tag+a+' />'
 children=[c for c in n.children if not (n.tag in ('table','thead','tbody','tfoot','tr','colgroup') and isinstance(c,str) and not c.strip())]
 return '<'+n.tag+a+'>\n'+'\n'.join(jsx(c) for c in children)+'\n</'+n.tag+'>'
def emit(name,node):
 p=ROOT/'components/reference'/f'{name}.tsx'
 p.write_text('// Converted from the local WordPress reference; preserve SVG coordinates and data attributes.\nimport type { CSSProperties } from "react";\n\nexport function '+name+'() {\n  return (\n'+jsx(node)+'\n  );\n}\n')
home=Parser((SNAPSHOTS/'wp-reference-home.html').read_text()).root
emit('HomeContent',find(home,'main'))
emit('ReferenceContactForm',find(home,'form','contact-form'))
for name,tag,cls in [('ReferenceHeader','header','site-header'),('ReferenceFooter','footer','site-footer'),('ReferenceDialog','dialog',None),('ReferenceToast','aside','latest-article-toast')]:emit(name,find(home,tag,cls))
for filename,name in [('data','DataCenterContent'),('pareto','ParetoContent')]:
 tree=Parser((SNAPSHOTS/f'wp-reference-{filename}.html').read_text()).root
 emit(name,find(tree,'main'))
# Preserve the CSS emitted by core blocks, including button classes and layout rules.
head=find(home,'head')
css='\n'.join(''.join(c for c in n.children if isinstance(c,str)) for n in nodes(head) if n.tag=='style')
(ROOT/'app/wordpress-base.css').write_text(css)
print('Generated reference TSX and WordPress layout CSS')

for filename,name in [('writing','BlogContent'),('pinn','PinnContent'),('hello','HelloContent'),('privacy','PrivacyContent'),('work-ai','WorkAIContent'),('work-founder','WorkFounderContent'),('work-community','WorkCommunityContent')]:
 tree=Parser((SNAPSHOTS/f'wp-reference-{filename}.html').read_text()).root
 emit(name,find(tree,'main'))

p=ROOT/'components/reference/ReferenceDialog.tsx'
s=p.read_text().replace('CSSProperties','CSSProperties, ReactNode',1).replace('ReferenceDialog()','ReferenceDialog({ children }: { children?: ReactNode })').replace('<div data-contact-modal-body={true}>','<div data-contact-modal-body={true}>{children}')
p.write_text(s)

# Preserve live article discovery when refreshing the original visual reference.
p=ROOT/'components/reference/HomeContent.tsx'
s=p.read_text().replace('import type { CSSProperties } from "react";', 'import type { CSSProperties } from "react";\nimport { WritingList } from "@/components/articles/WritingList";')
a=s.index('<ul className={"writing-list"}>'); b=s.index('</ul>',a)+len('</ul>')
p.write_text(s[:a]+'<WritingList />'+s[b:])
p=ROOT/'components/reference/BlogContent.tsx'
s=p.read_text().replace('import type { CSSProperties } from "react";', 'import type { CSSProperties } from "react";\nimport { ArchivePosts } from "@/components/articles/ArchivePosts";')
a=s.index('<div className={"blog-tools"}'); b=s.index('</main>',a)
p.write_text(s[:a]+'<ArchivePosts />\n'+s[b:])
p=ROOT/'components/reference/ReferenceToast.tsx'
s=p.read_text().replace('import type { CSSProperties } from "react";', 'import type { CSSProperties } from "react";\nimport { publishedArticles } from "@/lib/article-index";').replace('export function ReferenceToast() {','export function ReferenceToast() {\n  const article = publishedArticles[0];')
s=s.replace('data-article-id={"97"}', 'data-article-id={article.slug}').replace('href={"/what-gives-a-data-center-away/"}', 'href={`/${article.slug}/`}').replace('{"What gives a data center away"}', '{article.title}').replace('{" Oct 26, 2026"}', '{" " + article.date}').replace('{"A look at 38 large projects finds that code names are weak clues. The parties behind land records and jobs promised per dollar offer a more useful lead, with important limits."}', '{article.excerpt}')
p.write_text(s)
