from pathlib import Path
import re

ROOT=Path('.')
INDEX=ROOT/'index.html'
VALIDATOR=ROOT/'scripts/validate_site_structure.py'
html=INDEX.read_text(encoding='utf-8')


def replace_section(text, sid, new):
    pat=re.compile(r'<section\b(?=[^>]*\bid=["\']'+re.escape(sid)+r'["\'])[^>]*>.*?</section>',re.S|re.I)
    out,n=pat.subn(new,text,count=1)
    if n!=1: raise SystemExit(f'Expected one section {sid}, replaced {n}')
    return out

# Metadata and current navigation.
html=html.replace('Viking Voyage II, Day 24. Chapter III: Newfoundland to Nova Scotia.','Viking Voyage II, Day 25. Chapter III: Newfoundland to Nova Scotia.')
html=html.replace('Nordic Viking Heritage — Viking Voyage II — Day 24','Nordic Viking Heritage — Viking Voyage II — Day 25')
html=html.replace('href="#history-day-24">HISTORY</a>','href="#history-day-25">HISTORY</a>')
html=html.replace('href="#our-saga-day-24">SAGA</a>','href="#our-saga-day-25">SAGA</a>')

status='''<section class="status parchment" id="voyage"><div class="wrap"><div class="status-head"><div><div class="kicker red">THE SHIP'S LOG — DAY 25</div><h1>THE STORM HAS FOUND US.</h1><p>The fleet continues south through Chapter III toward Nova Scotia. The sea has changed — but the course has not.</p></div><img class="seal" src="assets/one-crew-one-saga.png" alt="One Crew, One Saga"></div><div class="stats"><article><strong>99</strong><small>SAILORS ABOARD</small><em>One crew</em></article><article><strong>46,318,030</strong><small>TOTAL STEPS</small><em>Steps toward Florida</em></article><article><strong>≈ 30,106.7 KM</strong><small>DISTANCE COVERED</small><em>At 0.65 m per step</em></article><article><strong>61.76%</strong><small>OF OUR GOAL</small><em>75,000,000 steps</em></article></div></div></section>'''
html=replace_section(html,'voyage',status)

dispatch='''<section class="dark-section" id="dispatch"><div class="wrap"><div class="copy"><div class="kicker gold">⚔️ VIKING DISPATCH — DAY 25 ⚔️</div><h2>THE STORM HAS FOUND US.</h2><p>99 Vikings remain at sea, still driving south toward Nova Scotia.</p><p>During the last day the fleet advanced another <strong>1,848,491 steps</strong> — approximately <strong>1,201.5 km</strong>.</p><p><strong>46,318,030 steps<br>≈ 30,106.7 km<br>61.76% completed</strong></p><p>The warning has reached Captain Hákon. The fleet holds together beneath the red-and-white sails.</p><p><strong>“The storm has found us. Now it will learn who we are.”</strong></p><p><strong>— Hákon ⚔️🛡️</strong></p><figure class="framed"><img class="zoomable" src="day-25-viking-dispatch.jpg" alt="Viking Dispatch Day 25"><figcaption>VIKING DISPATCH — DAY 25</figcaption></figure></div></div></section>'''
html=replace_section(html,'dispatch',dispatch)

voyage_map='''<section class="map-section" id="voyage-map"><div class="wrap"><div class="kicker gold">THE VOYAGE MAP — CHAPTER III</div><h2>NEWFOUNDLAND → NOVA SCOTIA</h2><p class="intro">The fleet remains at sea. Day 25 brings the voyage to <strong>46,318,030 steps</strong> — approximately <strong>30,106.7 km</strong> since Greenland. A storm now blocks the southern horizon.</p><div class="tags"><span>DAY 25</span><span>99 SAILORS</span><span>46,318,030 STEPS</span><span>≈ 30,106.7 KM</span><span>61.76% COMPLETE</span></div><figure class="framed"><img class="zoomable" src="day-25-voyage-map.jpg" alt="Viking Voyage II Day 25 map — Newfoundland to Nova Scotia"><figcaption>THE VOYAGE MAP — DAY 25 · CHAPTER III</figcaption></figure><p><strong>ONE FLEET. ONE SAGA. ONE GOAL. ROW ON. ⚔️</strong></p></div></section>'''
html=replace_section(html,'voyage-map',voyage_map)

# Rolling layer links.
html=html.replace('href="#history-day-24"','href="#history-day-25"').replace('href="#myth-day-24"','href="#myth-day-25"').replace('href="#our-saga-day-24"','href="#our-saga-day-25"')

our_saga='''<section class="dark-section" id="our-saga-day-25"><div class="wrap"><div class="copy"><div class="kicker gold">⚔️ OUR SAGA — DAY 25 ⚔️</div><h2>THE SERPENTS FROM THE DEEP</h2><p>The warning was no longer somewhere beyond the horizon.</p><p>The sea broke around the fleet as the serpents rose from the deep.</p><p>Captain Hákon called the crews together. Shields came up. Oars kept the ships moving. Hugin and Munin carried word across the storm.</p><p>No single ship could face what had found them.</p><p>But this was never a voyage of one ship.</p><p><strong>NO SHIP FIGHTS ALONE.</strong></p><figure class="framed"><img class="zoomable" src="day-25-our-saga.jpg" alt="Our Saga Day 25 — The Serpents from the Deep"><figcaption>OUR SAGA — DAY 25 · THE SERPENTS FROM THE DEEP</figcaption></figure></div></div></section>'''
html=replace_section(html,'our-saga-day-24',our_saga)

# Append Day 25 names to the permanent Ship's Roll without altering earlier entries.
ship_pat=re.compile(r'<section\b(?=[^>]*\bid=["\']ship-roll["\'])[^>]*>.*?</section>',re.S|re.I)
m=ship_pat.search(html)
if not m: raise SystemExit('Ship roll missing')
ship=m.group(0)
new_entries='''<article><span>COPY157</span><strong>Tryggve</strong><small class="old-norse">Tryggvi</small><small class="runes">ᛏᚱᚢᚴᚢᛁ</small></article><article><span>iphv</span><strong>Gudny</strong><small class="old-norse">Guðný</small><small class="runes">ᚴᚢᚦᚾᚢ</small></article><article><span>JASSI</span><strong>Gunni</strong><small class="old-norse">Gunni</small><small class="runes">ᚴᚢᚾᛁ</small></article>'''
if '<span>COPY157</span>' not in ship:
    ship=ship.replace('</div></div></section>',new_entries+'</div></div></section>',1)
html=html[:m.start()]+ship+html[m.end():]

honors='''<section class="parchment honors" id="honors"><div class="wrap"><div class="kicker red">CREW HONORS — DAY 25</div><h2>THREE NAMES ENTER THE SHIP'S ROLL</h2><div class="honors-explainer"><div class="kicker red">THE HONOR BEHIND THE NAME</div><h3>EVERY OAR MATTERS</h3><p>Crew Honors belongs to <strong>OUR SAGA</strong>. It is a Viking Voyage II tradition, not a claimed reconstruction of a documented Viking Age ceremony.</p><p>Once entered into <strong>THE SHIP'S ROLL</strong>, a sailor's name remains part of this voyage.</p></div><figure class="framed"><img class="zoomable" src="day-25-crew-honors.jpg" alt="Crew Honors Day 25 — Tryggve, Gudny and Gunni"><figcaption>CREW HONORS — DAY 25 · TRYGGVE · GUDNY · GUNNI</figcaption></figure><div class="naming-list"><article><span>COPY157</span><strong>TRYGGVE <em>(Tryggvi)</em></strong><small>ᛏᚱᚢᚴᚢᛁ</small></article><article><span>iphv</span><strong>GUDNY <em>(Guðný)</em></strong><small>ᚴᚢᚦᚾᚢ</small></article><article><span>JASSI</span><strong>GUNNI <em>(Gunni)</em></strong><small>ᚴᚢᚾᛁ</small></article></div></div></section>'''
html=replace_section(html,'honors',honors)

# Prepend Day 25 to Crew Honors Archive.
ha_pat=re.compile(r'<section\b(?=[^>]*\bid=["\']crew-honors-archive["\'])[^>]*>.*?</section>',re.S|re.I)
m=ha_pat.search(html)
ha=m.group(0)
card='<figure><img class="zoomable" src="day-25-crew-honors.jpg" alt="Day 25 Crew Honors"><figcaption>DAY 25 · TRYGGVE · GUDNY · GUNNI</figcaption></figure>'
if 'DAY 25 · TRYGGVE · GUDNY · GUNNI' not in ha:
    ha=ha.replace('<div class="crew-honors-archive-grid">','<div class="crew-honors-archive-grid">'+card,1)
html=html[:m.start()]+ha+html[m.end():]

history='''<section class="dark-section" id="history-day-25"><div class="wrap"><div class="copy"><div class="kicker gold">⚔️ HISTORY — DAY 25 ⚔️</div><h2>THE FISH BEHIND THE MONSTER</h2><p><em>Regalecus glesne</em> — the giant oarfish — is real.</p><p>NOAA describes a long, ribbon-like deep-sea fish whose body can grow well beyond 20 feet. Its extraordinary shape has often been connected with the old human idea of sea serpents.</p><p>That does <strong>not</strong> prove that any particular Norse sea-monster story began with an oarfish. It shows something more careful — and more interesting: rare real animals can help explain why sea-serpent stories felt believable to people who encountered unfamiliar creatures at sea.</p><p>In <strong>OUR SAGA</strong>, the real fish becomes the visual seed for the monsters now surrounding our fleet.</p><p><strong>REAL CREATURE. ANCIENT FEAR. A NEW LEGEND.</strong></p><p><strong>THE SAGA MAY BE WILD.<br>HISTORY MUST BE TRUE. ⚔️</strong></p><figure class="framed"><img class="zoomable" src="day-25-history.jpg" alt="History Day 25 — The Fish Behind the Monster"><figcaption>HISTORY — DAY 25 · THE FISH BEHIND THE MONSTER</figcaption></figure></div></div></section>'''
html=replace_section(html,'history-day-24',history)

myth='''<section class="parchment" id="myth-day-25"><div class="wrap"><div class="copy"><div class="kicker red">⚡ MYTH &amp; SAGA — DAY 25 ⚡</div><h2>THE SHADOW OF JÖRMUNGANDR</h2><p>In Norse myth, Jörmungandr — the Midgard Serpent — lies in the ocean around the world, so vast that it encircles the earth and takes its own tail in its mouth.</p><p>Thor is its great enemy. Their struggle belongs to the mythic world, and at Ragnarök the two are destined to meet again.</p><p>Our serpents are not Jörmungandr.</p><p>But beneath the storm, as long shapes move below the fleet, the old story casts a shadow across our own.</p><p><strong>THE SEA REMEMBERS.</strong></p><figure class="framed"><img class="zoomable" src="day-25-myth-and-saga.jpg" alt="Myth and Saga Day 25 — The Shadow of Jörmungandr"><figcaption>MYTH &amp; SAGA — DAY 25 · THE SHADOW OF JÖRMUNGANDR</figcaption></figure></div></div></section>'''
html=replace_section(html,'myth-day-24',myth)

# Prepend Day 25 to the Voyage Archive.
va_pat=re.compile(r'<section\b(?=[^>]*\bid=["\']voyage-archive["\'])[^>]*>.*?</section>',re.S|re.I)
m=va_pat.search(html)
va=m.group(0)
va_card='<a class="archive-day" href="archive/day-25.html"><div class="archive-day-image"><img src="day-25-viking-dispatch.jpg" alt="Day 25 voyage archive"></div><div class="archive-day-copy"><span>DAY 25</span><strong>The storm has found us</strong><small>Open the permanent voyage record.</small></div></a>'
if 'archive/day-25.html' not in va:
    va=va.replace('<div class="archive-days">','<div class="archive-days">'+va_card,1)
html=html[:m.start()]+va+html[m.end():]

# Add the Day 25 factual source without removing any earlier source.
src_pat=re.compile(r'<section\b(?=[^>]*\bid=["\']sources["\'])[^>]*>.*?</section>',re.S|re.I)
m=src_pat.search(html)
src=m.group(0)
noaa='<a href="https://www.fisheries.noaa.gov/podcast/giant-oarfish" rel="noopener noreferrer">NOAA FISHERIES — THE GIANT OARFISH</a>'
if 'NOAA FISHERIES — THE GIANT OARFISH' not in src:
    src=src.replace('</div></div></section>',noaa+'</div></div></section>',1)
html=html[:m.start()]+src+html[m.end():]

html=re.sub(r'<section class="closing-saga">.*?</section>','<section class="closing-saga"><div class="wrap"><p>“Every step counts.<br>Every Viking matters.”</p><span>DAY 25 · 99 VIKINGS · 46,318,030 STEPS · ONE LIVING SAGA</span></div></section>',html,count=1,flags=re.S)
INDEX.write_text(html,encoding='utf-8')

# Permanent Day 25 archive page.
archive25='''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="Viking Voyage II — Captain's Log, Day 25"><title>Captain's Log — Day 25 — Viking Voyage II</title><link rel="stylesheet" href="../styles.css"><link rel="stylesheet" href="archive-nav.css?v=3"></head><body>
<nav class="floating-nav"><a href="../index.html">HOME</a><a href="../index.html#voyage-archive">ARCHIVE</a></nav><nav class="archive-page-nav archive-page-nav-top"><a href="day-24.html">← DAY 24</a><a href="../index.html#voyage-archive">THE VOYAGE ARCHIVE</a><a href="../index.html">CURRENT VOYAGE →</a></nav>
<main><section class="archive-log dark-section"><div class="wrap"><div class="kicker gold">THE VOYAGE ARCHIVE · THE CAPTAIN'S LOG</div><h1>DAY 25</h1><p class="archive-intro">The storm has found us.</p><div class="stats"><article><small>ACTIVE VIKINGS</small><strong>99</strong></article><article><small>STEPS TAKEN</small><strong>46,318,030</strong></article><article><small>DAY 25 GAIN</small><strong>1,848,491</strong></article><article><small>OF GOAL</small><strong>61.76%</strong></article></div><figure class="archive-map"><img src="../day-25-viking-dispatch.jpg" alt="Viking Dispatch Day 25"></figure><article class="captains-parchment"><div class="log-mark">CAPTAIN'S LOG · DAY 25</div><h2>THE STORM HAS FOUND US.</h2><p><strong>99 VIKINGS · 46,318,030 STEPS · ≈30,106.7 KM</strong></p><blockquote>THE STORM HAS FOUND US.<br>NOW IT WILL LEARN WHO WE ARE.<br>— HÁKON</blockquote></article><section class="dark-section" style="margin-top:2rem"><div class="wrap" style="padding-left:0;padding-right:0"><div class="kicker gold">CREW HONORS — DAY 25</div><h2>THREE NAMES ENTER THE SHIP'S ROLL</h2><figure class="archive-map"><img src="../day-25-crew-honors.jpg" alt="Crew Honors Day 25"></figure></div></section><nav class="archive-page-nav"><a href="day-24.html">← DAY 24</a><a href="../index.html#voyage-archive">THE VOYAGE ARCHIVE</a><a href="../index.html">CURRENT VOYAGE →</a></nav></div></section></main></body></html>'''
(ROOT/'archive/day-25.html').write_text(archive25,encoding='utf-8')

# Advance the permanent validator atomically to Day 25.
v=VALIDATOR.read_text(encoding='utf-8')
v=v.replace("require(len(entries)>=62, f'Ship\\'s Roll appears truncated: only {len(entries)} ordinary entries found')","require(len(entries)>=65, f'Ship\\'s Roll appears truncated: only {len(entries)} ordinary entries found')")
needle="for pacer,viking in [('Robert Drope','Eyvind'),('Khalil Saudi Arabia','Hjalti'),('Litus','Dag')]: require(f'<span>{pacer}</span>' in ship and f'<strong>{viking}</strong>' in ship,f'Day 24 Ship\\'s Roll pairing missing: {pacer} → {viking}')"
add=needle+"\nfor pacer,viking in [('COPY157','Tryggve'),('iphv','Gudny'),('JASSI','Gunni')]: require(f'<span>{pacer}</span>' in ship and f'<strong>{viking}</strong>' in ship,f'Day 25 Ship\\'s Roll pairing missing: {pacer} → {viking}')"
v=v.replace(needle,add)
start=v.index('# Current Crew Honors must replace the previous day.')
end=v.index('# Approved visual spacing.')
new_block='''# Current Crew Honors must replace the previous day.
honors=sections.get('honors','')
require('CREW HONORS — DAY 25' in honors,'Current Crew Honors is not Day 25')
require('day-25-crew-honors.jpg' in honors,'Current Crew Honors is not using Day 25 artwork')
for token in ('COPY157','TRYGGVE','iphv','GUDNY','JASSI','GUNNI'): require(token in honors,f'Current Crew Honors is missing {token}')
require('CREW HONORS — DAY 24' not in honors,'Day 24 is still present in current Crew Honors')
require('id="honors-day-25"' not in html,'Duplicate standalone Day 25 Crew Honors section exists')
require(len(re.findall(r'<section\\b(?=[^>]*\\bid=["\\\']honors["\\\'])',html,re.I))==1,'There must be exactly one canonical current Crew Honors section')

# Crew Honors archive remains append-only.
honors_archive=sections.get('crew-honors-archive','')
require('DAY 25 · TRYGGVE · GUDNY · GUNNI' in honors_archive,'Day 25 missing from Crew Honors Archive')
require('DAY 24 · EYVIND · HJALTI · DAG' in honors_archive,'Day 24 missing from Crew Honors Archive')
require('DAY 23 · GISLI · GUDRID · BIRGER' in honors_archive,'Day 23 missing from Crew Honors Archive')
require('DAY 22 · FINN · UNN · AUD' in honors_archive,'Day 22 missing from Crew Honors Archive')
require('DAY 21 · AUÐUN · EINAR · RAGNA' in honors_archive,'Day 21 missing from Crew Honors Archive')
require('DAY 20 · RUNA · EGIL · HILD' in honors_archive,'Day 20 missing from Crew Honors Archive')
for image in ('day-25-crew-honors.jpg','day-24-crew-honors.jpg','day-23-crew-honors.jpg','day-22-crew-honors.jpg','day-21-crew-honors.jpg'): require(honors_archive.count(image)==1,f'{image} archive entry must occur exactly once')

'''
v=v[:start]+new_block+v[end:]
v=v.replace("require(len(source_links)>=9,f'Sources appears truncated: only {len(source_links)} external references found')","require(len(source_links)>=10,f'Sources appears truncated: only {len(source_links)} external references found')")
v=v.replace("require('INSTRUMENT NAVIGATION IN THE VIKING AGE' in sources,'Day 24 navigation source is missing')","require('INSTRUMENT NAVIGATION IN THE VIKING AGE' in sources,'Day 24 navigation source is missing')\nrequire('NOAA FISHERIES — THE GIANT OARFISH' in sources,'Day 25 oarfish source is missing')")
v=v.replace('# Voyage Archive continuity through Day 24.','# Voyage Archive continuity through Day 25.')
v=v.replace('for day in range(1,25):','for day in range(1,26):')
v=v.replace("approved_archive_images={24:'day-24-viking-dispatch.jpg'","approved_archive_images={25:'day-25-viking-dispatch.jpg',24:'day-24-viking-dispatch.jpg'")
start=v.index('# Day 24 rolling sections.')
end=v.index('# Local image references on the current page must resolve.')
rolling='''# Day 25 rolling sections.
require('THE SHIP\\'S LOG — DAY 25' in sections.get('voyage',''),'Current Ship Log is not Day 25')
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

'''
v=v[:start]+rolling+v[end:]
v=v.replace("require('DAY 24 · 99 VIKINGS · 44,469,539 STEPS · ONE LIVING SAGA' in html,'Closing Day 24 voyage summary is missing or stale')","require('DAY 25 · 99 VIKINGS · 46,318,030 STEPS · ONE LIVING SAGA' in html,'Closing Day 25 voyage summary is missing or stale')")
v=v.replace("print('Day 24 current content, Ship\\'s Roll, archives, local assets, internal links and permanent modules are intact.')","print('Day 25 current content, Ship\\'s Roll, archives, local assets, internal links and permanent modules are intact.')")
VALIDATOR.write_text(v,encoding='utf-8')
print('DAY 25 PATCH PREPARED')