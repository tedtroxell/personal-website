"""Create local drafting illustrations and social previews for the original posts."""
from pathlib import Path
import ast, math, subprocess

root = Path(__file__).resolve().parents[1]
module = ast.parse((root / 'scripts/build-article-art.py').read_text())
base = next(ast.literal_eval(n.value) for n in module.body if isinstance(n, ast.Assign) and any(isinstance(t, ast.Name) and t.id == 'base' for t in n.targets))
ink, coral = '#526c5e', '#d96747'
def label(x, y, value, size=16):
    return f'<text x="{x}" y="{y}" fill="{ink}" font-family="monospace" font-size="{size}">{value}</text>'
def path(d, color=ink, extra=''):
    return f'<path d="{d}" stroke="{color}" stroke-width="2" {extra}/>'

# Neural network feeds a smooth field, constrained by boundary measurements.
pinn = label(80, 121, 'LEARN FROM DATA') + label(555, 121, 'RESPECT THE PHYSICS')
layers = [[(110, y) for y in (225, 315)], [(235, y) for y in (185, 270, 355)], [(360, y) for y in (225, 315)]]
for left, right in zip(layers, layers[1:]):
    for x, y in left:
        for xx, yy in right:
            pinn += path(f'M{x} {y}L{xx} {yy}', extra='opacity=".3"')
for layer in layers:
    for x, y in layer:
        pinn += f'<circle cx="{x}" cy="{y}" r="14" fill="#eeeee4" stroke="{ink}" stroke-width="2"/>'
pinn += path('M380 270H465m-13-8 13 8-13 8', coral)
for row in range(8):
    points = ' '.join(f'{"M" if i == 0 else "L"}{520+i*8} {185+row*29-32*math.sin(i/40*math.pi)*math.cos(row/7*math.pi):.2f}' for i in range(41))
    pinn += path(points, coral if row == 3 else ink)
for i in range(9):
    pinn += path(f'M{520+i*40} 185V388', extra='opacity=".2"')
for x, y in [(520,185),(520,388),(840,185),(840,388)]:
    pinn += f'<circle cx="{x}" cy="{y}" r="5" fill="{coral}"/>'
pinn += label(82, 442, 'DATA + EQUATIONS + BOUNDARIES', 22) + label(82, 484, 'A NEURAL NETWORK WITH PHYSICAL CONSTRAINTS', 15)

# Isometric site plan with converging public-record evidence.
dc = '<g stroke="#526c5e" stroke-width="2" stroke-linejoin="round">'
dc += '<path d="M380 215L594 150 790 247 577 316Z" fill="#dce3d8"/><path d="M380 215V327L577 429V316Z" fill="#526c5e" fill-opacity=".12"/><path d="M577 316L790 247V359L577 429Z" fill="#526c5e" fill-opacity=".25"/>'
for i in range(5):
    x, y = 424+i*32, 214-i*9.5
    dc += f'<path d="M{x} {y}l58 29 28-9-58-29Z" fill="#eeeee4"/>'
for i in range(7):
    dc += path(f'M{593+i*27} {329-i*8.5}v69', extra='opacity=".5"')
dc += '</g>' + path('M346 350L574 468 830 384', extra='stroke-dasharray="5 7"')
for y, title, target in [(170,'LAND RECORDS','420 208'),(280,'POWER FILINGS','540 170'),(390,'JOBS / DOLLAR','427 345')]:
    dc += f'<circle cx="92" cy="{y}" r="5" fill="{coral}"/>' + label(110,y+5,title)
    dc += path(f'M285 {y}H322L{target}', coral)
dc += label(82, 492, '38 PROJECTS / FOLLOW THE EVIDENCE', 18)

out = root / 'public/assets/articles'
for slug, title, heading, number, drawing in [
    ('whats-a-pinn', 'What is a physics-informed neural network?', 'MACHINE LEARNING / WHAT IS A PINN?', '012', pinn),
    ('what-gives-a-data-center-away', 'What gives a data center away', 'PUBLIC RECORDS / READING THE SIGNALS', '013', dc),
]:
    svg = out / f'{slug}.svg'
    svg.write_text(base.format(title=title, heading=heading, number=number, drawing=drawing))
    png = svg.with_suffix('.png')
    subprocess.run(['rsvg-convert', '--width', '1008', '--height', '630', '--output', str(png), str(svg)], check=True)
    subprocess.run(['magick', str(png), '-background', '#eeeee4', '-gravity', 'center', '-extent', '1200x630', str(png)], check=True)
print('Built two local SVG covers and 1200×630 PNG social previews.')
