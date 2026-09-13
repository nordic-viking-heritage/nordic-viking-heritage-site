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

# Permanent modules that must remain present and unique.
required_sections = [
    'voyage',
    'dispatch',
    'voyage-map',
    'saga',
    'ship-roll',
    'honors',
    'crew-honors-archive',
    'chapter-one-complete',
    'chapter-two-complete',
    'keepers-chamber',
    'voyage-archive',
    'sources',
]
sections = {sid: section(html, sid) for sid in required_sections}

# Locked chapter milestones must never disappear or silently change destination identity.
require('CHAPTER I' in sections.get('chapter-one-complete', '').upper(), 'Chapter I identity is missing')
require('CHAPTER II' in sections.get('chapter-two-complete', '').upper(), 'Chapter II identity is missing')
require('NEWFOUNDLAND' in sections.get('chapter-two-complete', '').upper(), 'Chapter II destination marker is missing')

# Ship's Roll guardrails: Captain and Keeper stay first-class roles and the registry never collapses.
ship = sections.get('ship-roll', '')
require('THE CAPTAIN' in ship and 'HÁKON' in ship, 'Captain role card is missing from Ship\'s Roll')
require('KEEPER OF THE SAGA' in ship and 'ÞÓRA' in ship, 'Keeper role card is missing from Ship\'s Roll')
roll_cards = re.findall(r'<div class="roll-grid">(.*?)</div>', ship, re.S | re.I)
if roll_cards:
    entries = re.findall(r'<article\b', roll_cards[0], re.I)
    require(len(entries) >= 50, f'Ship\'s Roll appears truncated: only {len(entries)} ordinary entries found')
else:
    fail('Ship\'s Roll ordinary registry grid is missing')

# Crew Honors visual spacing approved by Stefan.
require('#honors .framed + .naming-list{margin-top:32px}' in css.replace(' ', ''),
        'Approved Crew Honors spacing rule is missing')

# Keeper's Chamber is a permanent workspace, not a disposable daily block.
keeper = sections.get('keepers-chamber', '')
for label in ('CREW VOICES', 'TALES FROM THE CREW', 'QUESTIONS &amp; IDEAS'):
    require(label in keeper, f'Keeper\'s Chamber card missing: {label}')
require('.keeper-grid' in css and '.keeper-card' in css, 'Keeper\'s Chamber permanent card styling is missing')

# Sources are append-only in practice: at minimum the recovered historical set must remain intact.
sources = sections.get('sources', '')
source_links = re.findall(r'<a\b[^>]+href=["\']https?://', sources, re.I)
require(len(source_links) >= 8, f'Sources appears truncated: only {len(source_links)} external references found')

# Voyage Archive must remain complete for all published days through Day 20.
archive = sections.get('voyage-archive', '')
for day in range(1, 21):
    require(f'archive/day-{day}.html' in archive, f'Voyage Archive link missing for Day {day}')
    require((ROOT / f'archive/day-{day}.html').exists(), f'Archive file missing for Day {day}')

# The agreed artwork convention: Day 6 onward uses its Viking Dispatch visual; Days 1-5 use prologue artwork.
approved_archive_images = {
    20: 'day-20-viking-dispatch.jpg',
    19: 'day-19-viking-dispatch.jpg',
    18: 'day-18-viking-dispatch.png',
    17: 'day-17-viking-dispatch.png',
    16: 'day-16-dispatch.png',
    15: 'day-15-dispatch.jpg',
    14: 'day-14-dispatch.jpg',
    13: 'day-13-dispatch.jpg',
    12: 'day-12-dispatch.jpg',
    11: '3603CAC6-D075-49DC-A4AC-C0DA57129282.png',
    10: 'day-10-dispatch.jpg',
    9: 'day-9-dispatch.jpg',
    8: 'day-8-dispatch.jpg',
    7: 'day-7-dispatch.jpg',
    6: 'viking-dispatch-day-6.png',
}
for day, image in approved_archive_images.items():
    require(Path(image).exists(), f'Approved archive artwork file missing: {image}')
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

# Daily production page must not load legacy transformation overlays. Those files may remain as historical code only.
for legacy in ('site.js', 'day16.js'):
    require(not re.search(rf'<script[^>]+src=["\'][^"\']*{re.escape(legacy)}["\']', html, re.I),
            f'Legacy runtime overlay {legacy} must not be loaded by index.html')

# Closing/footer are permanent approved structure.
require('class="closing-saga"' in html, 'Approved closing-saga section is missing')
require('<footer>' in html and 'NORDIC VIKING HERITAGE' in html and 'Back to top' in html,
        'Approved footer structure is missing')

# Basic structural sanity checks.
ids = re.findall(r'\bid=["\']([^"\']+)["\']', html, re.I)
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
print('Permanent modules, archive continuity, approved artwork, sources, roles and footer are intact.')
