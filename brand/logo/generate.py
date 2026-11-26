# Regenerates every SVG in brand/logo from the mark geometry and Geist Medium outlines.
# Usage: pip install fonttools && GEIST_TTF=path/to/Geist-Medium.ttf python3 brand/logo/generate.py brand/logo
import math, os, sys
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
OUT = sys.argv[1]; os.makedirs(OUT, exist_ok=True)
FONT = os.environ.get('GEIST_TTF', 'Geist-Medium.ttf')  # from `npm pack geist`: dist/fonts/geist-sans/

# ---------- mark geometry (64 x 64 grid) ----------
S = 64; LOBES = 12; R = 28.9; AMP = 1.6  # the rosette: 12 soft scallops (platform badges use 8)
def plate(inset=0):
    """Scalloped verification seal centred on (32, 32), shrunk by `inset`."""
    pts=[]
    for k in range(LOBES*24):
        t=2*math.pi*k/(LOBES*24)
        r=R-inset+AMP*math.cos(LOBES*t)
        pts.append((32+r*math.sin(t), 32-r*math.cos(t)))
    return 'M'+' L'.join(f'{x:.2f} {y:.2f}' for x,y in pts)+' Z'
# The check: one continuous stroke with rounded ends and a rounded corner.
CHECK_D = 'M20.4 32.9 L28.1 40.5 L43.8 24.8'
CHECK_W = 5.4
CHECK_LEN = 10.82 + 22.20

DEFS='''<defs>
  <linearGradient id="sc-plate" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1c1c1c"/><stop offset=".55" stop-color="#0a0a0a"/><stop offset="1" stop-color="#000"/></linearGradient>
  <linearGradient id="sc-edge" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#9a9a98"/><stop offset=".35" stop-color="#3a3a39"/><stop offset=".7" stop-color="#1a1a1a"/><stop offset="1" stop-color="#5c5c5b"/></linearGradient>
  <linearGradient id="sc-ti" gradientUnits="userSpaceOnUse" x1="18" y1="22" x2="46" y2="42"><stop offset="0" stop-color="#fafaf9"/><stop offset=".5" stop-color="#d4d4d2"/><stop offset="1" stop-color="#8e8e8c"/></linearGradient>
</defs>'''
def check_stroke(paint):
    return f'<path d="{CHECK_D}" fill="none" stroke="{paint}" stroke-width="{CHECK_W}" stroke-linecap="round" stroke-linejoin="round"/>'
def knockout(fill, mid):
    # one-colour seal with the check cut out (mask keeps the check transparent)
    return (f'<mask id="{mid}" maskUnits="userSpaceOnUse" x="0" y="0" width="64" height="64"><rect width="64" height="64" fill="#fff"/>'
            f'{check_stroke("#000")}</mask><path d="{plate(0)}" fill="{fill}" mask="url(#{mid})"/>')
def mark_group(variant):
    if variant=='metal':   # primary: black seal, titanium edge, platinum check
        return f'<path d="{plate(0.75)}" fill="url(#sc-plate)" stroke="url(#sc-edge)" stroke-width="1.5" stroke-linejoin="round"/><path d="{plate(3.2)}" fill="none" stroke="#fff" stroke-opacity=".06" stroke-width=".75" stroke-linejoin="round"/>' + check_stroke('url(#sc-ti)')
    if variant=='black':
        return knockout('#0a0a0a','sc-cut-k')
    if variant=='white':
        return knockout('#f5f5f4','sc-cut-w')
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
