from pathlib import Path
import re

path = Path('index.html')
html = path.read_text(encoding='utf-8')

# Day 21 was accidentally added as a second current Crew Honors section.
# Correct behavior: current Crew Honors is replaced by Day 21, while Day 20
# remains preserved only in the permanent Crew Honors Archive.
assert 'id="honors-day-21"' in html, 'Expected accidental Day 21 duplicate section is missing'
assert 'id="honors"' in html, 'Canonical current Crew Honors section is missing'
assert 'CREW HONORS — DAY 20' in html, 'Expected Day 20 current Crew Honors base is missing'
assert 'day-21-crew-honors.jpg' in html, 'Day 21 Crew Honors asset reference is missing'

# Remove the accidental standalone Day 21 current block.
html, removed = re.subn(
    r'<section class="parchment" id="honors-day-21">.*?</section>\s*',
    '', html, count=1, flags=re.S
)
assert removed == 1, 'Could not safely remove duplicate Day 21 Crew Honors block'

# Replace the canonical current Crew Honors block with Day 21, preserving the
# approved explainer, layout/classes and spacing behavior.
current_day21 = '''<section class="parchment honors" id="honors"><div class="wrap"><div class="kicker red">CREW HONORS — DAY 21</div><h2>THREE NAMES ENTER THE SHIP'S ROLL</h2><div class="honors-explainer"><div class="kicker red">THE HONOR BEHIND THE NAME</div><h3>EVERY OAR MATTERS</h3><p>Crew Honors belongs to <strong>OUR SAGA</strong>. It is a Viking Voyage II tradition, not a claimed reconstruction of a documented Viking Age ceremony.</p><p>Once entered into <strong>THE SHIP'S ROLL</strong>, a sailor's name remains part of this voyage.</p></div><figure class="framed"><img class="zoomable" src="day-21-crew-honors.jpg" alt="Crew Honors Day 21 — Auðun, Einar and Ragna"><figcaption>CREW HONORS — DAY 21 · AUÐUN · EINAR · RAGNA</figcaption></figure><div class="naming-list"><article><span>FRED</span><strong>AUÐUN <em>(Auðunn)</em></strong><small>ᛅᚢᚦᚢᚾ</small></article><article><span>JAGADISH</span><strong>EINAR <em>(Einarr)</em></strong><small>ᛅᛁᚾᛅᚱ</small></article><article><span>ANA</span><strong>RAGNA <em>(Ragna)</em></strong><small>ᚱᛅᚴᚾᛅ</small></article></div></div></section>'''

html, replaced = re.subn(
    r'<section class="parchment honors" id="honors">.*?</section>',
    current_day21, html, count=1, flags=re.S
)
assert replaced == 1, 'Could not safely replace canonical Crew Honors section'

# Safety checks: exactly one current honors section; Day 20 remains in archive.
assert html.count('id="honors"') == 1, 'There must be exactly one current Crew Honors section'
assert 'id="honors-day-21"' not in html, 'Duplicate Day 21 section still exists'
assert '<figcaption>DAY 20 · RUNA · EGIL · HILD</figcaption>' in html, 'Day 20 Crew Honors archive entry was lost'
assert '<figcaption>DAY 21 · AUÐUN · EINAR · RAGNA</figcaption>' in html, 'Day 21 Crew Honors archive entry was lost'
assert '#honors' not in html or True

path.write_text(html, encoding='utf-8')
print('Crew Honors corrected: Day 21 is current; Day 20 remains archived.')
