from pathlib import Path
import re

p = Path('index.html')
text = p.read_text(encoding='utf-8')
original = text

def get_section(src, sid):
    m = re.search(r'<section\b(?=[^>]*\bid=["\']'+re.escape(sid)+r'["\'])[^>]*>.*?</section>', src, re.S|re.I)
    if not m: raise SystemExit(f'Missing section: {sid}')
    return m.group(0)

def replace_section(src, sid, new):
    pat = re.compile(r'<section\b(?=[^>]*\bid=["\']'+re.escape(sid)+r'["\'])[^>]*>.*?</section>', re.S|re.I)
    out,n = pat.subn(new, src, count=1)
    if n != 1: raise SystemExit(f'Expected exactly one section {sid}, got {n}')
    return out

# Hard locks: these must remain byte-for-byte identical.
protected_ids = ['chapter-one-complete','chapter-two-complete','keepers-chamber','sources']
protected_before = {sid:get_section(original,sid) for sid in protected_ids}
footer_before = original[original.index('</main>'):]

# Metadata and quick navigation only.
text,n = re.subn(r'<meta name="description" content="Nordic Viking Heritage — Viking Voyage II, Day 25\.[^"]*"><title>Nordic Viking Heritage — Viking Voyage II — Day 25</title>', '<meta name="description" content="Nordic Viking Heritage — Viking Voyage II, Day 26. Chapter III complete: Newfoundland to Nova Scotia."><title>Nordic Viking Heritage — Viking Voyage II — Day 26</title>', text, count=1)
if n != 1: raise SystemExit('Day 25 metadata marker not found exactly once')
text,n = re.subn(r'<nav class="floating-nav" aria-label="Voyage quick navigation">.*?</nav>', '<nav class="floating-nav" aria-label="Voyage quick navigation"><a href="#top">HOME</a><a href="#voyage">VOYAGE</a><a href="#history-day-26">HISTORY</a><a href="#our-saga-day-26">SAGA</a><a href="#ship-roll">CREW</a><a href="#voyage-archive">ARCHIVE</a></nav>', text, count=1)
if n != 1: raise SystemExit('Quick navigation not found exactly once')

text = replace_section(text,'voyage','''<section class="status parchment" id="voyage"><div class="wrap"><div class="status-head"><div><div class="kicker red">THE SHIP'S LOG — DAY 26</div><h1>CHAPTER III — COMPLETE</h1><p>The fleet has reached Nova Scotia. Chapter III is complete; Chapter IV begins when the fleet sails again.</p></div><img class="seal" src="assets/one-crew-one-saga.png" alt="One Crew, One Saga"></div><div class="stats"><article><strong>103</strong><small>SAILORS ABOARD</small><em>One crew</em></article><article><strong>50,647,198</strong><small>TOTAL STEPS</small><em>Steps toward Florida</em></article><article><strong>≈ 32,920.7 KM</strong><small>DISTANCE COVERED</small><em>At 0.65 m per step</em></article><article><strong>67.53%</strong><small>OF OUR GOAL</small><em>75,000,000 steps</em></article></div></div></section>''')
text = replace_section(text,'dispatch','''<section class="dark-section" id="dispatch"><div class="wrap"><div class="copy"><div class="kicker gold">⚔️ VIKING DISPATCH — DAY 26 ⚔️</div><h2>NOVA SCOTIA REACHED.</h2><p>103 Vikings have carried the fleet to the end of Chapter III.</p><p><strong>50,647,198 steps<br>≈ 32,920.7 km<br>67.53% completed</strong></p><p>The storm is behind us. Nova Scotia lies before the fleet.</p><p><strong>CHAPTER III — COMPLETE.</strong></p><figure class="framed"><img class="zoomable" src="day-26-saga-scene.jpg" alt="Viking Dispatch Day 26"><figcaption>VIKING DISPATCH — DAY 26</figcaption></figure></div></div></section>''')
text = replace_section(text,'voyage-map','''<section class="map-section" id="voyage-map"><div class="wrap"><div class="kicker gold">THE VOYAGE MAP — CHAPTER III</div><h2>NEWFOUNDLAND → NOVA SCOTIA</h2><p class="intro">The fleet has reached Nova Scotia. Day 26 closes Chapter III at <strong>50,647,198 steps</strong> — approximately <strong>32,920.7 km</strong> since Greenland.</p><p><strong>ONE FLEET. ONE SAGA. ONE GOAL.</strong></p><div class="tags"><span>DAY 26</span><span>103 SAILORS</span><span>50,647,198 STEPS</span><span>≈ 32,920.7 KM</span><span>67.53% COMPLETE</span></div><figure class="framed"><img class="zoomable" src="day-26-voyage-map.jpg" alt="Viking Voyage II Day 26 map — Chapter III complete"><figcaption>THE VOYAGE MAP — DAY 26 · CHAPTER III COMPLETE</figcaption></figure></div></section>''')
text = replace_section(text,'saga','''<section class="layers parchment" id="saga"><div class="wrap"><div class="kicker red">THREE LAYERS — ONE EXPERIENCE</div><h2>THE VOYAGE BECOMES A LIVING SAGA</h2><div class="layer-grid"><a class="layer-link" href="#history-day-26"><article><span>01</span><h3>HISTORY</h3><p>Verified history and archaeology remain separate from the saga.</p></article></a><a class="layer-link" href="#myth-day-26"><article><span>02</span><h3>MYTH &amp; SAGA</h3><p>The warning beneath the waves follows the fleet beyond the storm.</p></article></a><a class="layer-link" href="#our-saga-day-26"><article><span>03</span><h3>OUR SAGA</h3><p>The crew's real steps shape the living story we create together.</p></article></a></div></div></section>''')
text = replace_section(text,'our-saga-day-25','''<section class="dark-section" id="our-saga-day-26"><div class="wrap"><div class="copy"><div class="kicker gold">⚔️ OUR SAGA — DAY 26 ⚔️</div><h2>FURTHER TOGETHER.</h2><p>The fleet has reached Nova Scotia. The storm is behind us, and Chapter III closes with 103 Vikings aboard.</p><p>No single oar carried us here. No single ship made the voyage alone.</p><p><strong>FURTHER TOGETHER.</strong></p><figure class="framed"><img class="zoomable" src="day-26-our-saga.jpg" alt="Our Saga Day 26"><figcaption>OUR SAGA — DAY 26 · FURTHER TOGETHER</figcaption></figure></div></div></section>''')
text = replace_section(text,'history-day-25','''<section class="parchment history-section" id="history-day-26"><div class="wrap"><div class="copy"><div class="kicker red">HISTORY — DAY 26</div><h2>THE SAGAS CONTINUE. THE EVIDENCE DOES NOT.</h2><p>L’Anse aux Meadows is the confirmed Norse site in Newfoundland. Nova Scotia has no confirmed Norse archaeological site.</p><p><strong>THE SAGA MAY BE WILD. HISTORY MUST BE TRUE.</strong></p><figure class="framed"><img class="zoomable" src="day-26-history.jpg" alt="History Day 26"><figcaption>HISTORY — DAY 26</figcaption></figure></div></div></section>''')
text = replace_section(text,'myth-day-25','''<section class="parchment" id="myth-day-26"><div class="wrap"><div class="copy"><div class="kicker red">⚡ MYTH &amp; SAGA — DAY 26 ⚡</div><h2>THE WARNING BENEATH THE WAVES</h2><p>The storm is behind us. The warning is not.</p><figure class="framed"><img class="zoomable" src="day-26-myth-saga.jpg" alt="Myth and Saga Day 26 — The Warning Beneath the Waves"><figcaption>MYTH &amp; SAGA — DAY 26 · THE WARNING BENEATH THE WAVES</figcaption></figure></div></div></section>''')
text = replace_section(text,'night-watch-day-20','''<section class="dark-section" id="night-watch-day-26"><div class="wrap"><div class="copy"><div class="kicker gold">NIGHT WATCH — DAY 26</div><h2>103 VIKINGS. ONE FLEET.</h2><figure class="framed"><img class="zoomable" src="day-26-night-watch.jpg" alt="Night Watch Day 26"><figcaption>NIGHT WATCH — DAY 26</figcaption></figure></div></div></section>''')
text = replace_section(text,'honors','''<section class="parchment honors" id="honors"><div class="wrap"><div class="kicker red">CREW HONORS — DAY 26</div><h2>THREE MORE NAMES ENTER THE SHIP'S ROLL</h2><div class="honors-explainer"><div class="kicker red">THE HONOR BEHIND THE NAME</div><h3>EVERY OAR MATTERS</h3><p>Crew Honors belongs to <strong>OUR SAGA</strong>. It is a Viking Voyage II tradition, not a claimed reconstruction of a documented Viking Age ceremony.</p><p>Once entered into <strong>THE SHIP'S ROLL</strong>, a sailor's name remains part of this voyage.</p></div><figure class="framed"><img class="zoomable" src="day-26-crew-honors.jpg" alt="Crew Honors Day 26 — Hjalmar, Starkad and Alfhild"><figcaption>CREW HONORS — DAY 26 · HJALMAR · STARKAD · ALFHILD</figcaption></figure><div class="naming-list"><article><span>Pat</span><strong>HJALMAR <em>(Hjalmarr)</em></strong><small>ᚼᛁᛅᛚᛘᛅᚱ</small></article><article><span>Mark</span><strong>STARKAD <em>(Starkaðr)</em></strong><small>ᛋᛏᛅᚱᚴᛅᚦᚱ</small></article><article><span>fateme.berenji</span><strong>ALFHILD <em>(Alfhildr)</em></strong><small>ᛅᛚᚠᚼᛁᛚᛏᚱ</small></article></div></div></section>''')

# Append only to Ship's Roll.
ship = get_section(text,'ship-roll')
addition = '<article><span>Pat</span><strong>Hjalmar</strong><small class="old-norse">Hjalmarr</small><small class="runes">ᚼᛁᛅᛚᛘᛅᚱ</small></article><article><span>Mark</span><strong>Starkad</strong><small class="old-norse">Starkaðr</small><small class="runes">ᛋᛏᛅᚱᚴᛅᚦᚱ</small></article><article><span>fateme.berenji</span><strong>Alfhild</strong><small class="old-norse">Alfhildr</small><small class="runes">ᛅᛚᚠᚼᛁᛚᛏᚱ</small></article>'
if '<span>Pat</span><strong>Hjalmar</strong>' in ship: raise SystemExit('Day 26 names already in Ship Roll')
pos = ship.rfind('</div></div></section>')
if pos < 0: raise SystemExit('Ship Roll closing marker missing')
text = text.replace(ship, ship[:pos]+addition+ship[pos:], 1)

# Crew Honors Archive: prepend Day 26, preserve every prior entry.
cha = get_section(text,'crew-honors-archive')
marker = '<div class="crew-honors-archive-grid">'
entry = '<figure><img class="zoomable" src="day-26-crew-honors.jpg" alt="Day 26 Crew Honors"><figcaption>DAY 26 · HJALMAR · STARKAD · ALFHILD</figcaption></figure>'
if marker not in cha: raise SystemExit('Crew Honors archive grid missing')
text = text.replace(cha, cha.replace(marker, marker+entry, 1), 1)

# Voyage Archive: prepend Day 26, preserve every prior day.
va = get_section(text,'voyage-archive')
marker = '<div class="archive-days">'
entry = '<a class="archive-day" href="archive/day-26.html"><div class="archive-day-image"><img src="day-26-saga-scene.jpg" alt="Day 26 voyage archive"></div><div class="archive-day-copy"><span>DAY 26</span><strong>Nova Scotia reached — Chapter III complete</strong><small>Open the permanent voyage record.</small></div></a>'
if marker not in va: raise SystemExit('Voyage archive grid missing')
text = text.replace(va, va.replace(marker, marker+entry, 1), 1)

# Closing summary only.
text,n = re.subn(r'DAY 25 · 99 VIKINGS · 46,318,030 STEPS · ONE LIVING SAGA', 'DAY 26 · 103 VIKINGS · 50,647,198 STEPS · ONE LIVING SAGA', text, count=1)
if n != 1: raise SystemExit('Closing Day 25 summary not found')

# Verify protected modules and footer/runtime are untouched.
for sid,before in protected_before.items():
    if get_section(text,sid) != before: raise SystemExit(f'PROTECTED SECTION CHANGED: {sid}')
if text[text.index('</main>'):] != footer_before: raise SystemExit('PROTECTED FOOTER/RUNTIME CHANGED')
for f in ['day-26-voyage-map.jpg','day-26-history.jpg','day-26-myth-saga.jpg','day-26-our-saga.jpg','day-26-saga-scene.jpg','day-26-crew-honors.jpg','day-26-night-watch.jpg']:
    if not Path(f).exists(): raise SystemExit(f'Missing Day 26 asset: {f}')
if text.count('id="keepers-chamber"') != 1 or text.count('id="honors"') != 1: raise SystemExit('Canonical section count changed')

p.write_text(text, encoding='utf-8')
print('Day 26 prepared. Locked chapters, Keeper’s Chamber, Sources and footer/runtime are byte-identical.')
