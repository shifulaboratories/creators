# Regenerates every SVG in brand/logo from the mark geometry and Geist Medium outlines.
# Usage: pip install fonttools && GEIST_TTF=path/to/Geist-Medium.ttf python3 brand/logo/generate.py brand/logo
import math, os, sys
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
OUT = sys.argv[1]; os.makedirs(OUT, exist_ok=True)
FONT = os.environ.get('GEIST_TTF', 'Geist-Medium.ttf')  # from `npm pack geist`: dist/fonts/geist-sans/

# ---------- mark geometry (64 x 64 grid) ----------
S = 64; C = 12.5; R = 3.2  # chamfer, corner softening
def plate(inset=0):
    i=inset; c=C-inset*0.414; r=max(R-inset*0.4,0.8)
    pts=[(c+i,i),(S-c-i,i),(S-i,c+i),(S-i,S-c-i),(S-c-i,S-i),(c+i,S-i),(i,S-c-i),(i,c+i)]
    n=len(pts); out=[]
    def toward(a,b,dist):
        dx,dy=b[0]-a[0],b[1]-a[1]; l=math.hypot(dx,dy); return (a[0]+dx/l*dist,a[1]+dy/l*dist)
    for k in range(n):
        p0=pts[k-1]; p1=pts[k]; p2=pts[(k+1)%n]
        a=toward(p1,p0,r); b=toward(p1,p2,r)
        out.append(('L' if out else 'M')+f'{a[0]:.2f} {a[1]:.2f} Q{p1[0]:.2f} {p1[1]:.2f} {b[0]:.2f} {b[1]:.2f}')
    return ' '.join(out)+' Z'
r2=math.sqrt(2); u=(1/r2,-1/r2); d=(1/r2,1/r2)
def P(o,su,td): return (o[0]+su*u[0]+td*d[0], o[1]+su*u[1]+td*d[1])
W=2.4; G=1.8; A=(0,0)  # long-stroke foot
L_LONG=28.5; L_SHORT=12.5
def poly(pts): return 'M'+' L'.join(f'{x:.2f} {y:.2f}' for x,y in pts)+' Z'
long_=poly([P(A,0,-W),P(A,L_LONG,-W),P(A,L_LONG,W),P(A,0,W)])
Dc=P(A,W,-W-G)       # short-stroke end centre
short_=poly([(Dc[0]-W*u[0]-L_SHORT*d[0],Dc[1]-W*u[1]-L_SHORT*d[1]),
             (Dc[0]+W*u[0]-L_SHORT*d[0],Dc[1]+W*u[1]-L_SHORT*d[1]),
             (Dc[0]+W*u[0],Dc[1]+W*u[1]),(Dc[0]-W*u[0],Dc[1]-W*u[1])])
import re as _re
_raw=long_+' '+short_
_nums=[float(v) for v in _re.findall(r'-?\d+\.\d+',_raw)]
_xs=_nums[0::2]; _ys=_nums[1::2]
_ox=32-(min(_xs)+max(_xs))/2; _oy=32.6-(min(_ys)+max(_ys))/2
CHECK=_re.sub(r'(-?\d+\.\d+) (-?\d+\.\d+)', lambda m: f'{float(m.group(1))+_ox:.2f} {float(m.group(2))+_oy:.2f}', _raw)

DEFS='''<defs>
  <linearGradient id="sc-plate" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1c1c1c"/><stop offset=".55" stop-color="#0a0a0a"/><stop offset="1" stop-color="#000"/></linearGradient>
  <linearGradient id="sc-edge" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#9a9a98"/><stop offset=".35" stop-color="#3a3a39"/><stop offset=".7" stop-color="#1a1a1a"/><stop offset="1" stop-color="#5c5c5b"/></linearGradient>
  <linearGradient id="sc-ti" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fafaf9"/><stop offset=".5" stop-color="#d4d4d2"/><stop offset="1" stop-color="#8e8e8c"/></linearGradient>
</defs>'''
def mark_group(variant):
    if variant=='metal':   # primary: black plate, titanium edge, platinum split check
        return f'<path d="{plate(0.75)}" fill="url(#sc-plate)" stroke="url(#sc-edge)" stroke-width="1.5" stroke-linejoin="round"/><path d="{plate(3.2)}" fill="none" stroke="#fff" stroke-opacity=".06" stroke-width=".75" stroke-linejoin="round"/><path d="{CHECK}" fill="url(#sc-ti)"/>'
    if variant=='black':   # flat black plate, check knocked out (for light backgrounds, print)
        return f'<path fill-rule="evenodd" d="{plate(0)} {CHECK}" fill="#0a0a0a"/>'
    if variant=='white':   # flat white plate, check knocked out (dark backgrounds, one colour)
        return f'<path fill-rule="evenodd" d="{plate(0)} {CHECK}" fill="#f5f5f4"/>'
def mark_svg(variant, size=None):
    defs = DEFS if variant=='metal' else ''
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="Select Creators">{defs}{mark_group(variant)}</svg>\n'

# ---------- wordmark as outlines ----------
f=TTFont(FONT); gs=f.getGlyphSet(); cmap=f.getBestCmap(); upm=f['head'].unitsPerEm
def text_path(txt, size, track_em):
    pen=SVGPathPen(gs); x=0; sc=size/upm
    for ch in txt:
        g=cmap[ord(ch)]
        tp=TransformPen(pen,(sc,0,0,-sc,x,0)); gs[g].draw(tp)
        x+=gs[g].width*sc + track_em*size
    return pen.getCommands(), x - track_em*size
CAP = f['OS/2'].sCapHeight
def wordmark(color, size=20, track=0.22):
    d,w=text_path('SELECT CREATORS', size, track)
    ch=CAP*size/upm
    return d,w,ch
def word_svg(color):
    d,w,ch=wordmark(color)
    pad=0
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 {-ch:.2f} {w:.2f} {ch:.2f}" role="img" aria-label="Select Creators"><path d="{d}" fill="{color}"/></svg>\n'
def lockup_h(variant, color):
    d,w,ch=wordmark(color)
    m=40; gap=14; scale=m/64
    tx=m+gap; ty=m/2+ch/2
    W_=tx+w
    defs = DEFS if variant=='metal' else ''
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W_:.2f} {m}" role="img" aria-label="Select Creators">{defs}<g transform="scale({scale})">{mark_group(variant)}</g><path transform="translate({tx} {ty:.2f})" d="{d}" fill="{color}"/></svg>\n'
def lockup_v(variant, color):
    d,w,ch=wordmark(color)
    m=72; gap=22
    W_=max(w,m); mx=(W_-m)/2
    defs = DEFS if variant=='metal' else ''
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W_:.2f} {m+gap+ch:.2f}" role="img" aria-label="Select Creators">{defs}<g transform="translate({mx:.2f} 0) scale({m/64})">{mark_group(variant)}</g><path transform="translate({(W_-w)/2:.2f} {m+gap+ch:.2f})" d="{d}" fill="{color}"/></svg>\n'

files={
 'mark.svg':mark_svg('metal'),
 'mark-black.svg':mark_svg('black'),
 'mark-white.svg':mark_svg('white'),
 'wordmark-light.svg':word_svg('#f5f5f4'),
 'wordmark-dark.svg':word_svg('#0a0a0a'),
 'lockup-horizontal-on-dark.svg':lockup_h('metal','#f5f5f4'),
 'lockup-horizontal-on-light.svg':lockup_h('black','#0a0a0a'),
 'lockup-stacked-on-dark.svg':lockup_v('metal','#f5f5f4'),
 'lockup-stacked-on-light.svg':lockup_v('black','#0a0a0a'),
}
for k,v in files.items(): open(os.path.join(OUT,k),'w').write(v)
