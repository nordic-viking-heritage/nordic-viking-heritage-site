from pathlib import Path
import re
import sys

ROOT = Path('.')
INDEX = ROOT / 'index.html'
CSS = ROOT / 'styles.css'
errors = []


def fail(message):
    errors.append(message)


def require(condition, message):
    if not condition:
        fail(message)


def section(text, section_id):
    pattern = re.compile(
        r'<section\b(?=[^>]*\bid=["\']' + re.escape(section_id) + r'["\'])[^>]*>.*?</section>',
        re.S | re.I,
    )
    matches = pattern.findall(text)
    if len(matches) != 1:
        fail(f'Section {section_id!r} must occur exactly once; found {len(matches)}')
        return ''
    return matches[0]


require(INDEX.exists(), 'index.html is missing')
require(CSS.exists(), 'styles.css is missing')
if errors:
    print('\n'.join(f'ERROR: {e}' for e in errors))
    sys.exit(1)

html = INDEX.read_text(encoding='utf-8')
css = CSS.read_text(encoding='utf-8')

required_sections = [
    'voyage', 'dispatch', 'voyage-map', 'saga', 'ship-roll', 'honors',
    'crew-honors-archive', 'chapter-one-complete', 'chapter-two-complete',
    'keepers-chamber', 'voyage-archive', 'sources',
]
sections = {sid: section(html, sid) for sid in required_sections}

# Locked chapters.
require('CHAPTER I' in sections.get('chapter-one-complete', '').upper(), 'Chapter I identity is missing')
require('CHAPTER II' in sections.get('chapter-two-complete', '').upper(), 'Chapter II identity is missing')
require('NEWFOUNDLAND' in sections.get('chapter-two-complete', '').upper(), 'Chapter II destination marker is missing')

# Ship's Roll integrity.
ship = sections.get('ship-roll', '')
require('THE CAPTAIN' in ship and 'HÁKON' in ship, 'Captain role card is missing from Ship\'s Roll')
require('KEEPER OF THE SAGA' in ship and 'ÞÓRA' in ship, 'Keeper role card is missing from Ship\'s Roll')
roll_cards = re.findall(r'<div class="roll-grid">(.*?)</div>', ship, re.S | re.I)
if roll_cards:
    entries = re.findall(r'<article\b', roll_cards[0], re.I)
    require(len(entries) >= 59, f'Ship\'s Roll appears truncated: only {len(entries)} ordinary entries found')
else:
    fail('Ship\'s Roll ordinary registry grid is missing')
for pacer, viking in [('Fred', 'Auðun'), ('Jagadish', 'Einar'), ('Ana', 'Ragna')]:
    require(f'<span>{pacer}</span>' in ship and f'<strong>{viking}</strong>' in ship,
            f'Day 21 Ship\'s Roll pairing missing: {pacer} → {viking}')
for pacer, viking in [('Jefferycallen', 'Finn'), ('🔥 ОЛЬГА 🔥 (Olga)', 'Unn'), ('Miamimason', 'Aud')]:
    require(f'<span>{pacer}</span>' in ship and f'<strong>{viking}</strong>' in ship,
            f'Day 22 Ship\'s Roll pairing missing: {pacer} → {viking}')
for pacer, viking in [('YOUNIS A. / ABO RAZI', 'Gisli'), ('ОЛЕСЯ (Olesya)', 'Gudrid'), ('ROBEDSON', 'Birger')]:
    require(f'<span>{pacer}</span>' in ship and f'<strong>{viking}</strong>' in ship,
            f'Day 23 Ship\'s Roll pairing missing: {pacer} → {viking}')

# Current Crew Honors must REPLACE the previous current day, never stack above it.
honors = sections.get('honors', '')
require('CREW HONORS — DAY 23' in honors, 'Current Crew Honors is not Day 23')
require('day-23-crew-honors.jpg' in honors, 'Current Crew Honors is not using Day 23 artwork')
for token in ('YOUNIS A. / ABO RAZI', 'GISLI', 'ОЛЕСЯ', 'GUDRID', 'ROBEDSON', 'BIRGER'):
    require(token in honors, f'Current Crew Honors is missing {token}')
require('CREW HONORS — DAY 22' not in honors, 'Day 22 is still present in current Crew Honors')
require('id="honors-day-23"' not in html, 'Duplicate standalone Day 23 Crew Honors section exists')
require(len(re.findall(r'<section\b(?=[^>]*\bid=["\']honors["\'])', html, re.I)) == 1,
        'There must be exactly one canonical current Crew Honors section')

# Crew Honors archive must preserve prior days and include the current one.
honors_archive = sections.get('crew-honors-archive', '')
require('DAY 23 · GISLI · GUDRID · BIRGER' in honors_archive, 'Day 23 missing from Crew Honors Archive')
require('DAY 22 · FINN · UNN · AUD' in honors_archive, 'Day 22 missing from Crew Honors Archive')
require('DAY 21 · AUÐUN · EINAR · RAGNA' in honors_archive, 'Day 21 missing from Crew Honors Archive')
require('DAY 20 · RUNA · EGIL · HILD' in honors_archive, 'Day 20 missing from Crew Honors Archive')
require(honors_archive.count('day-23-crew-honors.jpg') == 1, 'Day 23 Crew Honors archive entry must occur exactly once')
require(honors_archive.count('day-22-crew-honors.jpg') == 1, 'Day 22 Crew Honors archive entry must occur exactly once')
require(honors_archive.count('day-21-crew-honors.jpg') == 1, 'Day 21 Crew Honors archive entry must occur exactly once')

# Approved visual spacing.
normalized_css = re.sub(r'\s+', '', css)
require('#honors.framed+.naming-list{margin-top:32px}' in normalized_css,
        'Approved Crew Honors spacing rule is missing')

# Keeper's Chamber.
keeper = sections.get('keepers-chamber', '')
for label in ('CREW VOICES', 'TALES FROM THE CREW', 'QUESTIONS &amp; IDEAS'):
    require(label in keeper, f'Keeper\'s Chamber card missing: {label}')
require('.keeper-grid' in css and '.keeper-card' in css, 'Keeper\'s Chamber permanent card styling is missing')

# Sources.
sources = sections.get('sources', '')
source_links = re.findall(r'<a\b[^>]+href=["\']https?://', sources, re.I)
require(len(source_links) >= 8, f'Sources appears truncated: only {len(source_links)} external references found')

# Voyage Archive continuity through Day 23.
archive = sections.get('voyage-archive', '')
for day in range(1, 24):
    require(f'archive/day-{day}.html' in archive, f'Voyage Archive link missing for Day {day}')
    require((ROOT / f'archive/day-{day}.html').exists(), f'Archive file missing for Day {day}')

approved_archive_images = {
    23: 'day-23-viking-dispatch.jpg', 22: 'day-22-viking-dispatch.jpg',
    21: 'day-21-viking-dispatch.jpg', 20: 'day-20-viking-dispatch.jpg',
    19: 'day-19-viking-dispatch.jpg', 18: 'day-18-viking-dispatch.png',
    17: 'day-17-viking-dispatch.png', 16: 'day-16-dispatch.png',
    15: 'day-15-dispatch.jpg', 14: 'day-14-dispatch.jpg',
    13: 'day-13-dispatch.jpg', 12: 'day-12-dispatch.jpg',
    11: '3603CAC6-D075-49DC-A4AC-C0DA57129282.png',
    10: 'day-10-dispatch.jpg', 9: 'day-9-dispatch.jpg',
    8: 'day-8-dispatch.jpg', 7: 'day-7-dispatch.jpg',
    6: 'viking-dispatch-day-6.png',
}
for day, image in approved_archive_images.items():
    require((ROOT / image).exists(), f'Approved archive artwork file missing: {image}')
    card_pattern = re.compile(
        rf'<a class="archive-day" href="archive/day-{day}\.html">.*?<img src="{re.escape(image)}"',
        re.S | re.I,
    )
    require(bool(card_pattern.search(archive)), f'Voyage Archive Day {day} is not using approved Dispatch artwork')
for day in range(1, 6):
    require(
        bool(re.search(rf'<a class="archive-day" href="archive/day-{day}\.html">.*?<img src="archive-prologue-day1-5\.jpg"', archive, re.S | re.I)),
        f'Voyage Archive Day {day} must retain the shared prologue artwork',
    )

# Local image references on the current page must resolve to files in the repository.
for src in re.findall(r'<img\b[^>]+src=["\']([^"\']+)["\']', html, re.I):
    if src.startswith(('http://', 'https://', 'data:')):
        continue
    require((ROOT / src).exists(), f'Local image referenced by index.html is missing: {src}')

# Internal anchor links must point to IDs that exist.
ids = re.findall(r'\bid=["\']([^"\']+)["\']', html, re.I)
id_set = set(ids)
for href in re.findall(r'<a\b[^>]+href=["\']#([^"\']+)["\']', html, re.I):
    require(href in id_set, f'Broken internal anchor: #{href}')

# Legacy overlays must remain inactive.
for legacy in ('site.js', 'day16.js'):
    require(not re.search(rf'<script[^>]+src=["\'][^"\']*{re.escape(legacy)}["\']', html, re.I),
            f'Legacy runtime overlay {legacy} must not be loaded by index.html')

# Closing/footer and structural sanity.
require('class="closing-saga"' in html, 'Approved closing-saga section is missing')
require('DAY 23 · 98 VIKINGS · 42,625,195 STEPS · ONE LIVING SAGA' in html,
        'Closing Day 23 voyage summary is missing or stale')
require('<footer>' in html and 'NORDIC VIKING HERITAGE' in html and 'Back to top' in html,
        'Approved footer structure is missing')
duplicates = sorted({value for value in ids if ids.count(value) > 1})
require(not duplicates, 'Duplicate HTML ids found: ' + ', '.join(duplicates))
require(html.count('<main>') == 1 and html.count('</main>') == 1, 'index.html must contain exactly one <main> block')
require(html.count('<footer>') == 1 and html.count('</footer>') == 1, 'index.html must contain exactly one footer')

if errors:
    print('SITE STRUCTURE VALIDATION FAILED')
    for err in errors:
        print(f' - {err}')
    sys.exit(1)

print('SITE STRUCTURE VALIDATION PASSED')
print('Current Crew Honors, Ship\'s Roll, archives, local assets, internal links and permanent modules are intact.')
