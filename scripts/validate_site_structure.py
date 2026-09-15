from pathlib import Path
import re
import sys

ROOT = Path('.')
INDEX = ROOT / 'index.html'
CSS = ROOT / 'styles.css'
errors = []

def fail(message): errors.append(message)
def require(condition, message):
    if not condition: fail(message)

def section(text, section_id):
    pattern = re.compile(r'<section\b(?=[^>]*\bid=["\']' + re.escape(section_id) + r'["\'])[^>]*>.*?</section>', re.S | re.I)
    matches = pattern.findall(text)
    if len(matches) != 1:
        fail(f'Section {section_id!r} must occur exactly once; found {len(matches)}')
        return ''
    return matches[0]

require(INDEX.exists(), 'index.html is missing')
require(CSS.exists(), 'styles.css is missing')
if errors:
    print('\n'.join(f'ERROR: {e}' for e in errors)); sys.exit(1)
html = INDEX.read_text(encoding='utf-8'); css = CSS.read_text(encoding='utf-8')
required_sections = ['voyage','dispatch','voyage-map','saga','ship-roll','honors','crew-honors-archive','chapter-one-complete','chapter-two-complete','keepers-chamber','voyage-archive','sources']
sections = {sid: section(html, sid) for sid in required_sections}

# Locked chapters.
require('CHAPTER I' in sections.get('chapter-one-complete','').upper(), 'Chapter I identity is missing')
require('CHAPTER II' in sections.get('chapter-two-complete','').upper(), 'Chapter II identity is missing')
require('NEWFOUNDLAND' in sections.get('chapter-two-complete','').upper(), 'Chapter II destination marker is missing')

# Ship's Roll integrity.
ship=sections.get('ship-roll','')
require('THE CAPTAIN' in ship and 'HÁKON' in ship, 'Captain role card is missing from Ship\'s Roll')
require('KEEPER OF THE SAGA' in ship and 'ÞÓRA' in ship, 'Keeper role card is missing from Ship\'s Roll')
roll_cards=re.findall(r'<div class="roll-grid">(.*?)</div>',ship,re.S|re.I)
if roll_cards:
    entries=re.findall(r'<article\b',roll_cards[0],re.I)
    require(len(entries)>=65, f'Ship\'s Roll appears truncated: only {len(entries)} ordinary entries found')
else: fail('Ship\'s Roll ordinary registry grid is missing')
for pacer,viking in [('Fred','Auðun'),('Jagadish','Einar'),('Ana','Ragna')]: require(f'<span>{pacer}</span>' in ship and f'<strong>{viking}</strong>' in ship,f'Day 21 Ship\'s Roll pairing missing: {pacer} → {viking}')
for pacer,viking in [('Jefferycallen','Finn'),('🔥 ОЛЬГА 🔥 (Olga)','Unn'),('Miamimason','Aud')]: require(f'<span>{pacer}</span>' in ship and f'<strong>{viking}</strong>' in ship,f'Day 22 Ship\'s Roll pairing missing: {pacer} → {viking}')
for pacer,viking in [('YOUNIS A. / ABO RAZI','Gisli'),('ОЛЕСЯ (Olesya)','Gudrid'),('ROBEDSON','Birger')]: require(f'<span>{pacer}</span>' in ship and f'<strong>{viking}</strong>' in ship,f'Day 23 Ship\'s Roll pairing missing: {pacer} → {viking}')
for pacer,viking in [('Robert Drope','Eyvind'),('Khalil Saudi Arabia','Hjalti'),('Litus','Dag')]: require(f'<span>{pacer}</span>' in ship and f'<strong>{viking}</strong>' in ship,f'Day 24 Ship\'s Roll pairing missing: {pacer} → {viking}')
for pacer,viking in [('COPY157','Tryggve'),('iphv','Gudny'),('JASSI','Gunni')]: require(f'<span>{pacer}</span>' in ship and f'<strong>{viking}</strong>' in ship,f'Day 25 Ship\'s Roll pairing missing: {pacer} → {viking}')

# Current Crew Honors must replace the previous day.
honors=sections.get('honors','')
require('CREW HONORS — DAY 25' in honors,'Current Crew Honors is not Day 25')
require('day-25-crew-honors.jpg' in honors,'Current Crew Honors is not using Day 25 artwork')
for token in ('COPY157','TRYGGVE','iphv','GUDNY','JASSI','GUNNI'): require(token in honors,f'Current Crew Honors is missing {token}')
require('CREW HONORS — DAY 24' not in honors,'Day 24 is still present in current Crew Honors')
require('id="honors-day-25"' not in html,'Duplicate standalone Day 25 Crew Honors section exists')
require(len(re.findall(r'<section\b(?=[^>]*\bid=["\']honors["\'])',html,re.I))==1,'There must be exactly one canonical current Crew Honors section')

# Crew Honors archive remains append-only.
honors_archive=sections.get('crew-honors-archive','')
require('DAY 25 · TRYGGVE · GUDNY · GUNNI' in honors_archive,'Day 25 missing from Crew Honors Archive')
require('DAY 24 · EYVIND · HJALTI · DAG' in honors_archive,'Day 24 missing from Crew Honors Archive')
require('DAY 23 · GISLI · GUDRID · BIRGER' in honors_archive,'Day 23 missing from Crew Honors Archive')
require('DAY 22 · FINN · UNN · AUD' in honors_archive,'Day 22 missing from Crew Honors Archive')
require('DAY 21 · AUÐUN · EINAR · RAGNA' in honors_archive,'Day 21 missing from Crew Honors Archive')
require('DAY 20 · RUNA · EGIL · HILD' in honors_archive,'Day 20 missing from Crew Honors Archive')
for image in ('day-25-crew-honors.jpg','day-24-crew-honors.jpg','day-23-crew-honors.jpg','day-22-crew-honors.jpg','day-21-crew-honors.jpg'): require(honors_archive.count(image)==1,f'{image} archive entry must occur exactly once')

# Approved visual spacing.
normalized_css=re.sub(r'\s+','',css)
require('#honors.framed+.naming-list{margin-top:32px}' in normalized_css,'Approved Crew Honors spacing rule is missing')

# Keeper's Chamber.
keeper=sections.get('keepers-chamber','')
for label in ('CREW VOICES','TALES FROM THE CREW','QUESTIONS &amp; IDEAS'): require(label in keeper,f'Keeper\'s Chamber card missing: {label}')
require('.keeper-grid' in css and '.keeper-card' in css,'Keeper\'s Chamber permanent card styling is missing')

# Sources.
sources=sections.get('sources',''); source_links=re.findall(r'<a\b[^>]+href=["\']https?://',sources,re.I)
require(len(source_links)>=10,f'Sources appears truncated: only {len(source_links)} external references found')
require('INSTRUMENT NAVIGATION IN THE VIKING AGE' in sources,'Day 24 navigation source is missing')
require('NOAA FISHERIES — THE GIANT OARFISH' in sources,'Day 25 oarfish source is missing')

# Voyage Archive continuity through Day 25.
archive=sections.get('voyage-archive','')
for day in range(1,26):
    require(f'archive/day-{day}.html' in archive,f'Voyage Archive link missing for Day {day}')
    require((ROOT/f'archive/day-{day}.html').exists(),f'Archive file missing for Day {day}')
approved_archive_images={25:'day-25-viking-dispatch.jpg',24:'day-24-viking-dispatch.jpg',23:'day-23-viking-dispatch.jpg',22:'day-22-viking-dispatch.jpg',21:'day-21-viking-dispatch.jpg',20:'day-20-viking-dispatch.jpg',19:'day-19-viking-dispatch.jpg',18:'day-18-viking-dispatch.png',17:'day-17-viking-dispatch.png',16:'day-16-dispatch.png',15:'day-15-dispatch.jpg',14:'day-14-dispatch.jpg',13:'day-13-dispatch.jpg',12:'day-12-dispatch.jpg',11:'3603CAC6-D075-49DC-A4AC-C0DA57129282.png',10:'day-10-dispatch.jpg',9:'day-9-dispatch.jpg',8:'day-8-dispatch.jpg',7:'day-7-dispatch.jpg',6:'viking-dispatch-day-6.png'}
for day,image in approved_archive_images.items():
    require((ROOT/image).exists(),f'Approved archive artwork file missing: {image}')
    card_pattern=re.compile(rf'<a class="archive-day" href="archive/day-{day}\.html">.*?<img src="{re.escape(image)}"',re.S|re.I)
    require(bool(card_pattern.search(archive)),f'Voyage Archive Day {day} is not using approved Dispatch artwork')
for day in range(1,6): require(bool(re.search(rf'<a class="archive-day" href="archive/day-{day}\.html">.*?<img src="archive-prologue-day1-5\.jpg"',archive,re.S|re.I)),f'Voyage Archive Day {day} must retain the shared prologue artwork')

# Day 25 rolling sections.
require('THE SHIP\'S LOG — DAY 25' in sections.get('voyage',''),'Current Ship Log is not Day 25')
require('46,318,030' in sections.get('voyage','') and '99' in sections.get('voyage',''),'Day 25 status figures are stale')
require('VIKING DISPATCH — DAY 25' in sections.get('dispatch','') and 'day-25-viking-dispatch.jpg' in sections.get('dispatch',''),'Current Dispatch is not Day 25')
require('DAY 25' in sections.get('voyage-map','') and 'day-25-voyage-map.jpg' in sections.get('voyage-map',''),'Current Voyage Map is not Day 25')
require(html.count('id="history-day-25"')==1 and 'id="history-day-24"' not in html,'Current History must be Day 25 only')
require('day-25-history.jpg' in html and 'THE FISH BEHIND THE MONSTER' in html,'Day 25 History is incomplete')
require(html.count('id="myth-day-25"')==1 and 'id="myth-day-24"' not in html,'Current Myth & Saga must be Day 25 only')
require('day-25-myth-and-saga.jpg' in html and 'THE SHADOW OF JÖRMUNGANDR' in html,'Day 25 Myth & Saga is incomplete')
require(html.count('id="our-saga-day-25"')==1 and 'id="our-saga-day-24"' not in html,'Current Our Saga must be Day 25 only')
require('day-25-our-saga.jpg' in html and 'NO SHIP FIGHTS ALONE.' in html,'Day 25 Our Saga is incomplete')
require('href="#our-saga-day-25">SAGA</a>' in html,'SAGA navigation is not pointing to Day 25')
require('id="night-watch-day-20"' in html,'Locked Day 20 Night Watch must remain current until replaced')

# Local image references on the current page must resolve.
for src in re.findall(r'<img\b[^>]+src=["\']([^"\']+)["\']',html,re.I):
    if src.startswith(('http://','https://','data:')): continue
    require((ROOT/src).exists(),f'Local image referenced by index.html is missing: {src}')

# Internal anchors.
ids=re.findall(r'\bid=["\']([^"\']+)["\']',html,re.I); id_set=set(ids)
for href in re.findall(r'<a\b[^>]+href=["\']#([^"\']+)["\']',html,re.I): require(href in id_set,f'Broken internal anchor: #{href}')

# Legacy overlays remain inactive.
for legacy in ('site.js','day16.js'): require(not re.search(rf'<script[^>]+src=["\'][^"\']*{re.escape(legacy)}["\']',html,re.I),f'Legacy runtime overlay {legacy} must not be loaded by index.html')

# Closing/footer and structural sanity.
require('class="closing-saga"' in html,'Approved closing-saga section is missing')
require('DAY 25 · 99 VIKINGS · 46,318,030 STEPS · ONE LIVING SAGA' in html,'Closing Day 25 voyage summary is missing or stale')
require('<footer>' in html and 'NORDIC VIKING HERITAGE' in html and 'Back to top' in html,'Approved footer structure is missing')
duplicates=sorted({value for value in ids if ids.count(value)>1}); require(not duplicates,'Duplicate HTML ids found: '+', '.join(duplicates))
require(html.count('<main>')==1 and html.count('</main>')==1,'index.html must contain exactly one <main> block')
require(html.count('<footer>')==1 and html.count('</footer>')==1,'index.html must contain exactly one footer')
if errors:
    print('SITE STRUCTURE VALIDATION FAILED')
    for err in errors: print(f' - {err}')
    sys.exit(1)
print('SITE STRUCTURE VALIDATION PASSED')
print('Day 25 current content, Ship\'s Roll, archives, local assets, internal links and permanent modules are intact.')