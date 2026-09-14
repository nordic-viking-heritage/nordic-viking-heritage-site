from pathlib import Path
import re

ROOT=Path('.')
index=ROOT/'index.html'
html=index.read_text(encoding='utf-8')
required=['day-22-viking-dispatch.jpg','day-22-voyage-map.jpg','day-22-crew-honors.jpg']
for f in required:
    if not (ROOT/f).exists(): raise SystemExit('Missing '+f)
if 'VIKING DISPATCH — DAY 22' in html:
    raise SystemExit('Day 22 already applied')

html=html.replace('Nordic Viking Heritage — Viking Voyage II, Day 21. Chapter III: Newfoundland to Nova Scotia.','Nordic Viking Heritage — Viking Voyage II, Day 22. Chapter III: Newfoundland to Nova Scotia.',1)
html=html.replace('Nordic Viking Heritage — Viking Voyage II — Day 21</title>','Nordic Viking Heritage — Viking Voyage II — Day 22</title>',1)

status='''<section class="status parchment" id="voyage"><div class="wrap"><div class="status-head"><div><div class="kicker red">THE SHIP'S LOG — DAY 22</div><h1>FORTY MILLION STEPS</h1><p>The fleet has passed forty million steps. Chapter III continues from Newfoundland toward Nova Scotia — and the crew is now only three Vikings away from 100.</p></div><img class="seal" src="assets/one-crew-one-saga.png" alt="One Crew, One Saga"></div><div class="stats"><article><strong>97</strong><small>SAILORS ABOARD</small><em>Three more to 100</em></article><article><strong>40,120,041</strong><small>TOTAL STEPS</small><em>Steps toward Florida</em></article><article><strong>≈ 26,078.0 KM</strong><small>DISTANCE COVERED</small><em>At 0.65 m per step</em></article><article><strong>53.49%</strong><small>OF OUR GOAL</small><em>75,000,000 steps</em></article></div></div></section>'''
html,n=re.subn(r'<section class="status parchment" id="voyage">.*?</section>',status,html,count=1,flags=re.S); assert n==1

dispatch='''<section class="dark-section" id="dispatch"><div class="wrap"><div class="copy"><div class="kicker gold">VIKING DISPATCH — DAY 22</div><h2>40 MILLION STEPS</h2><p><strong>97 Vikings. 40,120,041 steps. ≈26,078.0 km.</strong></p><p>The fleet has crossed forty million steps and reached <strong>53.49%</strong> of the 75,000,000-step goal.</p><p>Only <strong>3 more Vikings</strong> are needed to bring the fleet to 100 sailors.</p><p><strong>FURTHER TOGETHER.</strong></p><figure class="framed"><img class="zoomable" src="day-22-viking-dispatch.jpg" alt="Viking Dispatch Day 22 — 40 Million Steps"><figcaption>VIKING DISPATCH — DAY 22 · 40 MILLION STEPS</figcaption></figure></div></div></section>'''
html,n=re.subn(r'<section class="dark-section" id="dispatch">.*?</section>',dispatch,html,count=1,flags=re.S); assert n==1

map22='''<section class="map-section" id="voyage-map"><div class="wrap"><div class="kicker gold">THE VOYAGE MAP — CHAPTER III</div><h2>NEWFOUNDLAND → NOVA SCOTIA</h2><p class="intro">The fleet continues south through Chapter III. Day 22 brings the voyage to <strong>40,120,041 steps</strong> — approximately <strong>26,078.0 km</strong> since Greenland.</p><div class="tags"><span>DAY 22</span><span>97 SAILORS</span><span>40,120,041 STEPS</span><span>≈ 26,078.0 KM</span><span>53.49% COMPLETE</span></div><figure class="framed"><img class="zoomable" src="day-22-voyage-map.jpg" alt="Viking Voyage II Day 22 map — Newfoundland to Nova Scotia"><figcaption>THE VOYAGE MAP — DAY 22 · CHAPTER III</figcaption></figure></div></section>'''
html,n=re.subn(r'<section class="map-section" id="voyage-map">.*?</section>',map22,html,count=1,flags=re.S); assert n==1

m=re.search(r'(<section class="ship-roll" id="ship-roll">.*?<div class="roll-grid">)(.*?)(</div>.*?</section>)',html,re.S); assert m
body=m.group(2)
for token in ['Jefferycallen','🔥 ОЛЬГА 🔥 (Olga)','Miamimason']:
    if token in body: raise SystemExit('Duplicate Ship Roll sailor: '+token)
new_entries='<article><span>Jefferycallen</span><strong>Finn</strong><small class="old-norse">Finnr</small><small class="runes">ᚠᛁᚾᛦ</small></article><article><span>🔥 ОЛЬГА 🔥 (Olga)</span><strong>Unn</strong><small class="old-norse">Unnr</small><small class="runes">ᚢᚾᛦ</small></article><article><span>Miamimason</span><strong>Aud</strong><small class="old-norse">Auðr</small><small class="runes">ᛅᚢᚦᛦ</small></article>'
html=html[:m.start(2)]+body+new_entries+html[m.end(2):]

honors='''<section class="parchment honors" id="honors"><div class="wrap"><div class="kicker red">CREW HONORS — DAY 22</div><h2>THREE NAMES ENTER THE SHIP'S ROLL</h2><div class="honors-explainer"><div class="kicker red">THE HONOR BEHIND THE NAME</div><h3>EVERY OAR MATTERS</h3><p>Crew Honors belongs to <strong>OUR SAGA</strong>. It is a Viking Voyage II tradition, not a claimed reconstruction of a documented Viking Age ceremony.</p><p>Once entered into <strong>THE SHIP'S ROLL</strong>, a sailor's name remains part of this voyage.</p></div><figure class="framed"><img class="zoomable" src="day-22-crew-honors.jpg" alt="Crew Honors Day 22 — Finn, Unn and Aud"><figcaption>CREW HONORS — DAY 22 · FINN · UNN · AUD</figcaption></figure><div class="naming-list"><article><span>JEFFERYCALLEN</span><strong>FINN <em>(Finnr)</em></strong><small>ᚠᛁᚾᛦ</small></article><article><span>🔥 ОЛЬГА 🔥 (Olga)</span><strong>UNN <em>(Unnr)</em></strong><small>ᚢᚾᛦ</small></article><article><span>MIAMIMASON</span><strong>AUD <em>(Auðr)</em></strong><small>ᛅᚢᚦᛦ</small></article></div></div></section>'''
html,n=re.subn(r'<section class="parchment honors" id="honors">.*?</section>',honors,html,count=1,flags=re.S); assert n==1

archive_fig='<figure><img class="zoomable" src="day-22-crew-honors.jpg" alt="Day 22 Crew Honors"><figcaption>DAY 22 · FINN · UNN · AUD</figcaption></figure>'
html=html.replace('<div class="crew-honors-archive-grid">','<div class="crew-honors-archive-grid">'+archive_fig,1)

card='<a class="archive-day" href="archive/day-22.html"><div class="archive-day-image"><img src="day-22-viking-dispatch.jpg" alt="Day 22 voyage archive"></div><div class="archive-day-copy"><span>DAY 22</span><strong>40 Million Steps</strong><small>Open the permanent voyage record.</small></div></a>'
html=html.replace('<div class="archive-days">','<div class="archive-days">'+card,1)
html=html.replace('DAY 21 · 95 VIKINGS · 37,954,948 STEPS · ONE LIVING SAGA','DAY 22 · 97 VIKINGS · 40,120,041 STEPS · ONE LIVING SAGA',1)
index.write_text(html,encoding='utf-8')

archive22='''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="Viking Voyage II — Captain's Log, Day 22"><title>Captain's Log — Day 22 — Viking Voyage II</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"><link rel="stylesheet" href="../styles.css"><link rel="stylesheet" href="archive-nav.css?v=3"></head><body>
<nav class="floating-nav"><a href="../index.html">HOME</a><a href="../index.html#voyage-archive">ARCHIVE</a></nav><nav class="archive-page-nav archive-page-nav-top"><a href="day-21.html">← DAY 21</a><a href="../index.html#voyage-archive">THE VOYAGE ARCHIVE</a><a href="../index.html">CURRENT VOYAGE →</a></nav>
<main><section class="archive-log dark-section"><div class="wrap"><div class="kicker gold">THE VOYAGE ARCHIVE · THE CAPTAIN'S LOG</div><h1>DAY 22</h1><p class="archive-intro">The fleet passed forty million steps in Chapter III and moved closer to Nova Scotia.</p><div class="stats"><article><small>ACTIVE VIKINGS</small><strong>97</strong></article><article><small>STEPS TAKEN</small><strong>40,120,041</strong></article><article><small>DAY 22 GAIN</small><strong>2,165,093</strong></article><article><small>OF GOAL</small><strong>53.49%</strong></article></div><figure class="archive-map"><a href="../day-22-viking-dispatch.jpg" target="_blank" rel="noopener"><img src="../day-22-viking-dispatch.jpg" alt="Viking Dispatch Day 22 — 40 Million Steps" loading="lazy" decoding="async"></a><figcaption>Day 22 · 97 Vikings · 40,120,041 steps · Tap to enlarge</figcaption></figure><article class="captains-parchment"><div class="log-mark">CAPTAIN'S LOG · DAY 22</div><h2>40 MILLION STEPS</h2><p><strong>97 Vikings</strong> carried the voyage to <strong>40,120,041 steps</strong> — approximately <strong>26,078.0 km</strong>.</p><p>The fleet reached <strong>53.49%</strong> of the 75,000,000-step goal. Only three more Vikings remained before the crew reached 100.</p><blockquote>FURTHER TOGETHER.</blockquote><p class="signature">— Captain Hákon</p></article><section class="parchment" style="margin-top:2rem"><div class="wrap" style="padding-left:0;padding-right:0"><div class="kicker red">THE VOYAGE MAP — DAY 22</div><h2>NEWFOUNDLAND → NOVA SCOTIA</h2><figure class="archive-map"><a href="../day-22-voyage-map.jpg" target="_blank" rel="noopener"><img src="../day-22-voyage-map.jpg" alt="Day 22 Chapter III voyage map" loading="lazy" decoding="async"></a></figure></div></section><section class="dark-section" style="margin-top:2rem"><div class="wrap" style="padding-left:0;padding-right:0"><div class="kicker gold">CREW HONORS — DAY 22</div><h2>THEIR NAMES ENTER THE SHIP'S ROLL</h2><p><strong>Jefferycallen → Finn (Finnr)</strong> · ᚠᛁᚾᛦ</p><p><strong>🔥 ОЛЬГА 🔥 (Olga) → Unn (Unnr)</strong> · ᚢᚾᛦ</p><p><strong>Miamimason → Aud (Auðr)</strong> · ᛅᚢᚦᛦ</p><figure class="archive-map"><a href="../day-22-crew-honors.jpg" target="_blank" rel="noopener"><img src="../day-22-crew-honors.jpg" alt="Crew Honors Day 22" loading="lazy" decoding="async"></a></figure></div></section><nav class="archive-page-nav"><a href="day-21.html">← DAY 21</a><a href="../index.html#voyage-archive">THE VOYAGE ARCHIVE</a><a href="../index.html">CURRENT VOYAGE →</a></nav></div></section></main></body></html>'''
(ROOT/'archive/day-22.html').write_text(archive22,encoding='utf-8')

v=ROOT/'scripts/validate_site_structure.py'
s=v.read_text(encoding='utf-8')
s=s.replace("require(len(entries) >= 53, f'Ship\\'s Roll appears truncated: only {len(entries)} ordinary entries found')","require(len(entries) >= 56, f'Ship\\'s Roll appears truncated: only {len(entries)} ordinary entries found')")
marker="for pacer, viking in [('Fred', 'Auðun'), ('Jagadish', 'Einar'), ('Ana', 'Ragna')]:\n    require(f'<span>{pacer}</span>' in ship and f'<strong>{viking}</strong>' in ship,\n            f'Day 21 Ship\\'s Roll pairing missing: {pacer} → {viking}')"
replacement=marker+"\nfor pacer, viking in [('Jefferycallen', 'Finn'), ('🔥 ОЛЬГА 🔥 (Olga)', 'Unn'), ('Miamimason', 'Aud')]:\n    require(f'<span>{pacer}</span>' in ship and f'<strong>{viking}</strong>' in ship,\n            f'Day 22 Ship\\'s Roll pairing missing: {pacer} → {viking}')"
s=s.replace(marker,replacement)
s=s.replace("require('CREW HONORS — DAY 21' in honors, 'Current Crew Honors is not Day 21')","require('CREW HONORS — DAY 22' in honors, 'Current Crew Honors is not Day 22')")
s=s.replace("require('day-21-crew-honors.jpg' in honors, 'Current Crew Honors is not using Day 21 artwork')","require('day-22-crew-honors.jpg' in honors, 'Current Crew Honors is not using Day 22 artwork')")
s=s.replace("for token in ('FRED', 'AUÐUN', 'JAGADISH', 'EINAR', 'ANA', 'RAGNA'):","for token in ('JEFFERYCALLEN', 'FINN', 'ОЛЬГА', 'UNN', 'MIAMIMASON', 'AUD'):")
s=s.replace("require('CREW HONORS — DAY 20' not in honors, 'Day 20 is still present in current Crew Honors')","require('CREW HONORS — DAY 21' not in honors, 'Day 21 is still present in current Crew Honors')")
s=s.replace("require('id=\"honors-day-21\"' not in html, 'Duplicate standalone Day 21 Crew Honors section exists')","require('id=\"honors-day-22\"' not in html, 'Duplicate standalone Day 22 Crew Honors section exists')")
s=s.replace("require('DAY 21 · AUÐUN · EINAR · RAGNA' in honors_archive, 'Day 21 missing from Crew Honors Archive')","require('DAY 22 · FINN · UNN · AUD' in honors_archive, 'Day 22 missing from Crew Honors Archive')\nrequire('DAY 21 · AUÐUN · EINAR · RAGNA' in honors_archive, 'Day 21 missing from Crew Honors Archive')")
s=s.replace("require(honors_archive.count('day-21-crew-honors.jpg') == 1, 'Day 21 Crew Honors archive entry must occur exactly once')","require(honors_archive.count('day-22-crew-honors.jpg') == 1, 'Day 22 Crew Honors archive entry must occur exactly once')\nrequire(honors_archive.count('day-21-crew-honors.jpg') == 1, 'Day 21 Crew Honors archive entry must occur exactly once')")
s=s.replace('for day in range(1, 22):','for day in range(1, 23):')
s=s.replace("approved_archive_images = {\n    21:","approved_archive_images = {\n    22: 'day-22-viking-dispatch.jpg', 21:")
s=s.replace("require('DAY 21 · 95 VIKINGS · 37,954,948 STEPS · ONE LIVING SAGA' in html,\n        'Closing Day 21 voyage summary is missing or stale')","require('DAY 22 · 97 VIKINGS · 40,120,041 STEPS · ONE LIVING SAGA' in html,\n        'Closing Day 22 voyage summary is missing or stale')")
v.write_text(s,encoding='utf-8')
print('Day 22 applied and validator advanced safely.')
