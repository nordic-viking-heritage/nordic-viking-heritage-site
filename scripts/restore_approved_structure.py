from pathlib import Path
import re, subprocess, html, glob
from urllib.parse import urlparse

index_path = Path('index.html')
css_path = Path('styles.css')
index = index_path.read_text(encoding='utf-8')
css = css_path.read_text(encoding='utf-8')


def section_pattern(section_id):
    return re.compile(r'<section\b(?=[^>]*\bid=["\']' + re.escape(section_id) + r'["\'])[^>]*>.*?</section>', re.S | re.I)


def get_section(text, section_id):
    m = section_pattern(section_id).search(text)
    if not m:
        raise SystemExit(f'Missing required section: {section_id}')
    return m.group(0)


def replace_section(text, section_id, replacement):
    pattern = section_pattern(section_id)
    new_text, count = pattern.subn(replacement, text, count=1)
    if count != 1:
        raise SystemExit(f'Expected exactly one {section_id} section, found {count}')
    return new_text


# APPROVED CONTENT IS LOCKED: only targeted sections below may change.
required_locked = [
    'ship-roll', 'crew-honors-archive', 'chapter-one-complete',
    'history-day-20', 'myth-day-20', 'night-watch-day-20'
]
locked_before = {sid: get_section(index, sid) for sid in required_locked}

# Add the missing frozen Chapter II summary directly after Chapter I.
if 'id="chapter-two-complete"' not in index:
    chapter_one = get_section(index, 'chapter-one-complete')
    chapter_two = '''
<section class="dark-section" id="chapter-two-complete"><div class="wrap"><div class="copy"><div class="kicker gold">VIKING VOYAGE II — CHAPTER II</div><h2>NEWFOUNDLAND REACHED</h2><p>From the North American mainland, the fleet turned east toward Newfoundland.</p><p>On Day 18, <strong>89 Vikings</strong> carried the voyage to <strong>30,701,056 steps</strong> — approximately <strong>19,955.7 km</strong> since Greenland.</p><p>The fleet reached Newfoundland. Chapter II was complete and the chapter was frozen into the voyage record.</p><p><strong>CHAPTER II IS COMPLETE.<br>CHAPTER III AWAITS.</strong></p></div></div></section>'''
    index = index.replace(chapter_one, chapter_one + chapter_two, 1)

# Keeper's Chamber HTML is already correct. Preserve it exactly; CSS below restores the workspace.
get_section(index, 'keepers-chamber')

# Voyage Archive: keep every Day 1-20 link and restore image-based archive cards.
known_titles = {
    20: 'Chapter III begins', 19: 'The fleet stays ashore', 18: 'Newfoundland reached',
    17: 'The helms turn', 16: 'Chapter II', 15: 'Chapter I complete'
}


def clean_text(s):
    s = re.sub(r'<[^>]+>', ' ', s)
    return html.unescape(re.sub(r'\s+', ' ', s)).strip()


def archive_image(day, text):
    for src in re.findall(r'<img[^>]+src=["\']([^"\']+)["\']', text, flags=re.I):
        src = src.replace('../', '')
        if Path(src).exists():
            return src
    for ext in ('jpg', 'jpeg', 'png', 'webp'):
        p = Path(f'day-{day}-viking-dispatch.{ext}')
        if p.exists():
            return p.as_posix()
    matches = []
    for ext in ('jpg', 'jpeg', 'png', 'webp'):
        matches += glob.glob(f'day-{day}-*.{ext}')
    return sorted(matches)[0] if matches else 'archive-prologue-day1-5.jpg'


cards = []
for day in range(20, 0, -1):
    archive_file = Path(f'archive/day-{day}.html')
    if not archive_file.exists():
        raise SystemExit(f'Missing archive/day-{day}.html; refusing to publish incomplete archive')
    text = archive_file.read_text(encoding='utf-8')
    title = known_titles.get(day)
    if not title:
        h2 = re.search(r'<h2[^>]*>(.*?)</h2>', text, flags=re.S | re.I)
        h1 = re.search(r'<h1[^>]*>(.*?)</h1>', text, flags=re.S | re.I)
        title = clean_text((h2 or h1).group(1)) if (h2 or h1) else f'Day {day} voyage record'
    image = archive_image(day, text)
    cards.append(
        f'<a class="archive-day" href="archive/day-{day}.html">'
        f'<div class="archive-day-image"><img src="{html.escape(image)}" alt="Day {day} voyage archive"></div>'
        f'<div class="archive-day-copy"><span>DAY {day}</span><strong>{html.escape(title)}</strong>'
        f'<small>Open the permanent voyage record.</small></div></a>'
    )

archive_section = '<section class="voyage-archive dark-section" id="voyage-archive"><div class="wrap"><div class="kicker gold">THE VOYAGE ARCHIVE</div><h2>THE JOURNEY SO FAR</h2><p class="archive-intro">Every completed day remains part of the permanent voyage record. New days are added; earlier days remain frozen.</p><div class="archive-days">' + ''.join(cards) + '</div></div></section>'
index = replace_section(index, 'voyage-archive', archive_section)

# Sources / References: reconstruct append-only list from all historical Sources sections.
references = []
seen = set()
excluded_hosts = {
    'fonts.googleapis.com', 'fonts.gstatic.com', 'www.mypacer.com', 'mypacer.com',
    'github.com', 'www.github.com', 'vercel.app', 'www.vercel.app'
}


def add_reference(url, label=''):
    url = html.unescape(url).strip()
    if not url.startswith(('http://', 'https://')):
        return
    host = urlparse(url).netloc.lower()
    if host in excluded_hosts or url in seen:
        return
    seen.add(url)
    label = clean_text(label) or host or url
    references.append((url, label))


commits = subprocess.check_output(
    ['git', 'log', '--reverse', '--format=%H', '--all', '--', 'index.html'], text=True
).splitlines()
for commit in commits:
    try:
        old = subprocess.check_output(['git', 'show', f'{commit}:index.html'], text=True, stderr=subprocess.DEVNULL)
    except subprocess.CalledProcessError:
        continue
    m = section_pattern('sources').search(old)
    if not m:
        continue
    sec = m.group(0)
    for href, label in re.findall(r'<a[^>]+href=["\']([^"\']+)["\'][^>]*>(.*?)</a>', sec, flags=re.S | re.I):
        add_reference(href, label)

for archive_file in sorted(Path('archive').glob('day-*.html')):
    text = archive_file.read_text(encoding='utf-8')
    for href, label in re.findall(r'<a[^>]+href=["\']([^"\']+)["\'][^>]*>(.*?)</a>', text, flags=re.S | re.I):
        add_reference(href, label)

if len(references) < 3:
    raise SystemExit('Reference recovery returned too few sources; refusing to replace Sources section')

source_links = ''.join(
    f'<a href="{html.escape(url, quote=True)}" rel="noopener noreferrer">{html.escape(label)}</a>'
    for url, label in references
)
sources_section = '<section class="dark-section sources" id="sources"><div class="wrap"><div class="kicker gold">SOURCES &amp; HISTORICAL NOTES</div><h2>THE HISTORY MUST BE TRUE</h2><p>This is the permanent reference record for Nordic Viking Heritage. Sources used from the beginning of the voyage are retained here. When new verified references are used, they are added — existing references are never removed.</p><div class="source-list">' + source_links + '</div></div></section>'

if section_pattern('sources').search(index):
    index = replace_section(index, 'sources', sources_section)
else:
    index = index.replace('</main>', sources_section + '\n</main>', 1)

# Restore the visual closing and approved footer structure.
closing = '<section class="closing-saga"><div class="wrap"><p>“Every step counts.<br>Every Viking matters.”</p><span>DAY 20 · 94 VIKINGS · 35,729,859 STEPS · ONE LIVING SAGA</span></div></section>'
if 'class="closing-saga"' not in index:
    index = index.replace(sources_section + '\n</main>', sources_section + '\n' + closing + '\n</main>', 1)

footer = '<footer><div class="wrap footer"><strong>NORDIC VIKING HERITAGE</strong><span>Viking Voyage II · From Ice to Sun</span><a href="#top">Back to top ↑</a></div></footer>'
index, footer_count = re.subn(r'<footer>.*?</footer>', footer, index, count=1, flags=re.S | re.I)
if footer_count != 1:
    raise SystemExit(f'Expected one footer, found {footer_count}')

# Restore approved spacing and permanent-workspace styling only.
marker = '/* APPROVED STABLE STRUCTURE — 2026-09-12 */'
if marker not in css:
    css += '''

/* APPROVED STABLE STRUCTURE — 2026-09-12 */
/* Approved sections are locked. Daily updates must not restructure these permanent modules. */
#myth-day-20{padding:76px 0}
#keepers-chamber{padding:92px 0;border-top:1px solid rgba(201,163,91,.22);border-bottom:1px solid rgba(201,163,91,.22)}
#keepers-chamber .keeper-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin:32px 0}
#keepers-chamber .keeper-card{border:1px solid rgba(199,164,92,.42);background:#10191c;padding:24px;color:#ece8df;min-width:0}
#keepers-chamber .keeper-card span,#keepers-chamber .keeper-card strong{display:block}
#keepers-chamber .keeper-card span{font-family:Cinzel,serif;color:#c7a45c;font-size:.78rem;font-weight:800;letter-spacing:.12em;margin-bottom:10px}
#keepers-chamber .keeper-card strong{font-family:Cinzel,serif;color:#f0e8d8;font-size:1.2rem;line-height:1.35;margin-bottom:12px}
#keepers-chamber .keeper-card p{margin:0;color:#d8d0c2;line-height:1.7}
#keepers-chamber blockquote{margin:34px 0 20px;padding:22px 24px;border-left:4px solid #c7a45c;background:#10191c;font-family:Cinzel,serif;color:#f0e8d8}
.sources .source-list{display:grid;gap:12px;margin-top:30px}
.sources .source-list a{display:block;padding:15px 18px;border:1px solid rgba(199,164,92,.35);background:#10191c;color:#d8bd7b;text-decoration:none;overflow-wrap:anywhere}
.sources .source-list a:hover,.sources .source-list a:focus{border-color:rgba(215,190,140,.75);color:#fff}
@media(max-width:800px){#keepers-chamber .keeper-grid{grid-template-columns:1fr}}
@media(max-width:520px){#myth-day-20{padding:54px 0}#keepers-chamber{padding:64px 0}#keepers-chamber .keeper-grid{gap:12px;margin:24px 0}#keepers-chamber .keeper-card{padding:20px}}
'''

# Safety audit: explicitly approved locked sections must be byte-identical.
for sid, before in locked_before.items():
    after = get_section(index, sid)
    if before != after:
        raise SystemExit(f'LOCK VIOLATION: approved section {sid} changed unexpectedly')

for sid in ['chapter-two-complete', 'keepers-chamber', 'voyage-archive', 'sources']:
    get_section(index, sid)
for day in range(1, 21):
    if f'archive/day-{day}.html' not in index:
        raise SystemExit(f'Archive link missing after repair: Day {day}')

index_path.write_text(index, encoding='utf-8')
css_path.write_text(css, encoding='utf-8')
