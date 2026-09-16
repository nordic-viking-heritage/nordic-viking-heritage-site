from pathlib import Path
import re
import sys

ROOT=Path('.'); INDEX=ROOT/'index.html'; CSS=ROOT/'styles.css'; errors=[]
def fail(m): errors.append(m)
def require(c,m):
    if not c: fail(m)
def section(text,sid):
    pattern=re.compile(r'<section\b(?=[^>]*\bid=["\']'+re.escape(sid)+r'["\'])[^>]*>.*?</section>',re.S|re.I)
    matches=pattern.findall(text)
    if len(matches)!=1:
        fail(f'Section {sid!r} must occur exactly once; found {len(matches)}'); return ''
    return matches[0]
require(INDEX.exists(),'index.html is missing'); require(CSS.exists(),'styles.css is missing')
if errors: print('\n'.join(f'ERROR: {e}' for e in errors)); sys.exit(1)
html=INDEX.read_text(encoding='utf-8'); css=CSS.read_text(encoding='utf-8')
required=['voyage','dispatch','voyage-map','saga','ship-roll','honors','crew-honors-archive','chapter-one-complete','chapter-two-complete','chapter-three-complete','keepers-chamber','voyage-archive','sources']
sections={sid:section(html,sid) for sid in required}

# Permanent completed milestones: identity, destination and canonical totals.
for sid,label,destination,total in [
 ('chapter-one-complete','CHAPTER I','NORTH ATLANTIC CROSSING','19,155,478'),
 ('chapter-two-complete','CHAPTER II','NEWFOUNDLAND','30,701,056'),
 ('chapter-three-complete','CHAPTER III','NOVA SCOTIA','50,647,198')]:
    block=sections.get(sid,''); upper=block.upper()
    require(label in upper,f'{label} identity is missing'); require(destination in upper,f'{label} destination marker is missing'); require(total in block,f'{label} completion total changed')
require('CHAPTER IV AWAITS' in sections.get('chapter-three-complete','').upper(),'Chapter III closing marker changed')

# Ship's Roll must retain established identities and Day 26 additions.
ship=sections.get('ship-roll','')
require('THE CAPTAIN' in ship and 'HÁKON' in ship,"Captain role card is missing from Ship's Roll")
require('KEEPER OF THE SAGA' in ship and 'ÞÓRA' in ship,"Keeper role card is missing from Ship's Roll")
roll_cards=re.findall(r'<div class="roll-grid">(.*?)</div>',ship,re.S|re.I)
if roll_cards: require(len(re.findall(r'<article\b',roll_cards[0],re.I))>=68,"Ship's Roll appears truncated")
else: fail("Ship's Roll ordinary registry grid is missing")
for pacer,viking in [('Fred','Auðun'),('Jagadish','Einar'),('Ana','Ragna'),('Jefferycallen','Finn'),('🔥 ОЛЬГА 🔥 (Olga)','Unn'),('Miamimason','Aud'),('YOUNIS A. / ABO RAZI','Gisli'),('ОЛЕСЯ (Olesya)','Gudrid'),('ROBEDSON','Birger'),('Robert Drope','Eyvind'),('Khalil Saudi Arabia','Hjalti'),('Litus','Dag'),('COPY157','Tryggve'),('iphv','Gudny'),('JASSI','Gunni'),('Pat','Hjalmar'),('Mark','Starkad'),('fateme.berenji','Alfhild')]: require(f'<span>{pacer}</span>' in ship and f'<strong>{viking}</strong>' in ship,f"Ship's Roll pairing missing: {pacer} → {viking}")

# Day 26 verified rolling baseline.
honors=sections.get('honors',''); require('CREW HONORS — DAY 26' in honors,'Current Crew Honors is not Day 26'); require('day-26-crew-honors.jpg' in honors,'Current Crew Honors artwork is not Day 26')
for token in ('Pat','HJALMAR','Mark','STARKAD','fateme.berenji','ALFHILD'): require(token in honors,f'Current Crew Honors is missing {token}')
require(len(re.findall(r'<section\b(?=[^>]*\bid=["\']honors["\'])',html,re.I))==1,'There must be exactly one canonical current Crew Honors section')

# Append-only honors archive through Day 26.
honors_archive=sections.get('crew-honors-archive','')
for marker in ('DAY 26 · HJALMAR · STARKAD · ALFHILD','DAY 25 · TRYGGVE · GUDNY · GUNNI','DAY 24 · EYVIND · HJALTI · DAG','DAY 23 · GISLI · GUDRID · BIRGER','DAY 22 · FINN · UNN · AUD','DAY 21 · AUÐUN · EINAR · RAGNA','DAY 20 · RUNA · EGIL · HILD'): require(marker in honors_archive,f'Crew Honors Archive missing {marker}')
for image in ('day-26-crew-honors.jpg','day-25-crew-honors.jpg','day-24-crew-honors.jpg','day-23-crew-honors.jpg','day-22-crew-honors.jpg','day-21-crew-honors.jpg'): require(honors_archive.count(image)==1,f'{image} archive entry must occur exactly once')

normalized_css=re.sub(r'\s+','',css); require('#honors.framed+.naming-list{margin-top:32px}' in normalized_css,'Approved Crew Honors spacing rule is missing'); require('#myth-day-26' in css,'Day 26 Myth & Saga styling is missing'); require('#history-day-26' in css,'Day 26 History spacing is missing')
keeper=sections.get('keepers-chamber','')
for label in ('CREW VOICES','TALES FROM THE CREW','QUESTIONS &amp; IDEAS'): require(label in keeper,f"Keeper's Chamber card missing: {label}")
require('.keeper-grid' in css and '.keeper-card' in css,"Keeper's Chamber permanent card styling is missing")
sources=sections.get('sources',''); require(len(re.findall(r'<a\b[^>]+href=["\']https?://',sources,re.I))>=10,'Sources appears truncated'); require('INSTRUMENT NAVIGATION IN THE VIKING AGE' in sources,'Day 24 navigation source is missing'); require('NOAA FISHERIES — THE GIANT OARFISH' in sources,'Day 25 oarfish source is missing')

# Voyage archive continuity and canonical Day 26 page.
archive=sections.get('voyage-archive','')
for day in range(1,27): require(f'archive/day-{day}.html' in archive,f'Voyage Archive link missing for Day {day}'); require((ROOT/f'archive/day-{day}.html').exists(),f'Archive file missing for Day {day}')
require('day-26-saga-scene.jpg' in archive,'Voyage Archive Day 26 artwork changed or is missing')
d26=(ROOT/'archive/day-26.html').read_text(encoding='utf-8')
for token in ('50,647,198','103','4,329,168','67.53','day-26-voyage-map.jpg','day-26-crew-honors.jpg','CHAPTER III — COMPLETE','ARRIVED — NOVA SCOTIA'):
    require(token in d26,f'Day 26 archive canonical token missing: {token}')

require("THE SHIP'S LOG — DAY 26" in sections.get('voyage',''),'Current Ship Log is not Day 26'); require('50,647,198' in sections.get('voyage','') and '103' in sections.get('voyage',''),'Day 26 status figures are stale'); require('VIKING DISPATCH — DAY 26' in sections.get('dispatch','') and 'day-26-saga-scene.jpg' in sections.get('dispatch',''),'Current Dispatch is not Day 26'); require('DAY 26' in sections.get('voyage-map','') and 'day-26-voyage-map.jpg' in sections.get('voyage-map',''),'Current Voyage Map is not Day 26')
require(html.count('id="history-day-26"')==1 and 'day-26-history.jpg' in html,'Day 26 History is incomplete'); require(html.count('id="myth-day-26"')==1 and 'day-26-myth-saga.jpg' in html,'Day 26 Myth & Saga is incomplete'); require(html.count('id="our-saga-day-26"')==1 and 'day-26-our-saga.jpg' in html,'Day 26 Our Saga is incomplete'); require('href="#our-saga-day-26">SAGA</a>' in html,'SAGA navigation is not pointing to Day 26'); require('id="night-watch-day-26"' in html and 'day-26-night-watch.jpg' in html,'Day 26 Night Watch is incomplete')

for src in re.findall(r'<img\b[^>]+src=["\']([^"\']+)["\']',html,re.I):
    if not src.startswith(('http://','https://','data:')): require((ROOT/src).exists(),f'Local image referenced by index.html is missing: {src}')
ids=re.findall(r'\bid=["\']([^"\']+)["\']',html,re.I); id_set=set(ids)
for href in re.findall(r'<a\b[^>]+href=["\']#([^"\']+)["\']',html,re.I): require(href in id_set,f'Broken internal anchor: #{href}')
for legacy in ('site.js','day16.js'): require(not re.search(rf'<script[^>]+src=["\'][^"\']*{re.escape(legacy)}["\']',html,re.I),f'Legacy runtime overlay {legacy} must not be loaded by index.html')
require('class="closing-saga"' in html,'Approved closing-saga section is missing'); require('DAY 26 · 103 VIKINGS · 50,647,198 STEPS · ONE LIVING SAGA' in html,'Closing Day 26 voyage summary is missing or stale'); require('<footer>' in html and 'NORDIC VIKING HERITAGE' in html and 'Back to top' in html,'Approved footer structure is missing')
duplicates=sorted({v for v in ids if ids.count(v)>1}); require(not duplicates,'Duplicate HTML ids found: '+', '.join(duplicates)); require(html.count('<main>')==1 and html.count('</main>')==1,'index.html must contain exactly one <main> block'); require(html.count('<footer>')==1 and html.count('</footer>')==1,'index.html must contain exactly one footer')
if errors:
    print('SITE STRUCTURE VALIDATION FAILED'); [print(f' - {e}') for e in errors]; sys.exit(1)
print('SITE STRUCTURE VALIDATION PASSED'); print("Day 26 baseline, Chapters I-III, Ship's Roll, archives, local assets, internal links and permanent modules are intact.")