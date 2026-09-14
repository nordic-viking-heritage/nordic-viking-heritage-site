from pathlib import Path
import re

p = Path('index.html')
h = p.read_text(encoding='utf-8')
if 'day-21-viking-dispatch.jpg' in h:
    raise SystemExit('Day 21 already applied')
for f in ['day-21-viking-dispatch.jpg','day-21-our-saga.jpg','day-21-crew-honors.jpg']:
    if not Path(f).exists(): raise SystemExit('Missing '+f)

h=h.replace('Nordic Viking Heritage — Viking Voyage II, Day 20. Chapter III: Newfoundland to Nova Scotia.','Nordic Viking Heritage — Viking Voyage II, Day 21. Chapter III: Newfoundland to Nova Scotia.',1)
h=h.replace('Nordic Viking Heritage — Viking Voyage II — Day 20</title>','Nordic Viking Heritage — Viking Voyage II — Day 21</title>',1)
h=h.replace('href="#our-saga-day-20">SAGA</a>','href="#our-saga-day-21">SAGA</a>',1)

status='''<section class="status parchment" id="voyage"><div class="wrap"><div class="status-head"><div><div class="kicker red">THE SHIP'S LOG — DAY 21</div><h1>HALFWAY — BUT SOMETHING STIRS</h1><p>The fleet has crossed the halfway mark. Chapter III continues toward Nova Scotia, but the horizon no longer feels empty.</p></div><img class="seal" src="assets/one-crew-one-saga.png" alt="One Crew, One Saga"></div><div class="stats"><article><strong>95</strong><small>SAILORS ABOARD</small><em>One crew</em></article><article><strong>37,954,948</strong><small>TOTAL STEPS</small><em>Steps toward Florida</em></article><article><strong>≈ 24,670.7 KM</strong><small>DISTANCE COVERED</small><em>At 0.65 m per step</em></article><article><strong>50.61%</strong><small>OF OUR GOAL</small><em>75,000,000 steps</em></article></div></div></section>'''
h,n=re.subn(r'<section class="status parchment" id="voyage">.*?</section>',status,h,count=1,flags=re.S); assert n==1

dispatch='''<section class="dark-section" id="dispatch"><div class="wrap"><div class="copy"><div class="kicker gold">VIKING DISPATCH — DAY 21</div><h2>HALFWAY — BUT SOMETHING STIRS</h2><p><strong>95 Vikings. 37,954,948 steps. ≈24,670.7 km.</strong></p><p>For the first time, the fleet has crossed the halfway line: <strong>50.61% of our 75,000,000-step goal.</strong></p><p>A raven has reached the Captain, and Þóra senses that something beyond the horizon has changed.</p><p>No enemy has been seen. Still, the fleet is alert and the oars keep moving.</p><p>Hákon watches the dark water ahead.</p><p><strong>ROW ON. STAY READY.</strong> 🐦</p><figure class="framed"><img class="zoomable" src="day-21-viking-dispatch.jpg" alt="Viking Dispatch Day 21"><figcaption>VIKING DISPATCH — DAY 21</figcaption></figure></div></div></section>'''
h,n=re.subn(r'<section class="dark-section" id="dispatch">.*?</section>',dispatch,h,count=1,flags=re.S); assert n==1

map21='''<section class="map-section" id="voyage-map"><div class="wrap"><div class="kicker gold">THE VOYAGE MAP — CHAPTER III</div><h2>NEWFOUNDLAND → NOVA SCOTIA</h2><p class="intro">The fleet continues south through the waters of Chapter III. <strong>The new chart remains rolled up for now.</strong></p><p class="intro">Day 21 brings the voyage to <strong>37,954,948 steps</strong> — approximately <strong>24,670.7 km</strong> since Greenland.</p><div class="tags"><span>DAY 21</span><span>95 SAILORS</span><span>37,954,948 STEPS</span><span>≈ 24,670.7 KM</span><span>50.61% COMPLETE</span></div></div></section>'''
h,n=re.subn(r'<section class="map-section" id="voyage-map">.*?</section>',map21,h,count=1,flags=re.S); assert n==1
h=h.replace('href="#our-saga-day-20"><article><span>03</span>','href="#our-saga-day-21"><article><span>03</span>',1)

saga='''<section class="dark-section" id="our-saga-day-21"><div class="wrap"><div class="copy"><div class="kicker gold">OUR SAGA — DAY 21</div><h2>THE WARNING SPREADS</h2><p>Þóra came to Hákon with a warning she could not ignore.</p><p>The ravens had sensed it first: somewhere beyond the horizon, something had changed.</p><p>Was the danger man, monster, wind or water? No one could yet say.</p><p>Hugin stayed with the Captain to carry the warning through the fleet. Munin remained with Þóra and the runestones.</p><p>Hákon trusted the Keeper. The crews prepared, but the oars did not stop.</p><p><strong>WE ARE MANY. WE ARE MIGHTY. WE ARE VIKINGS.</strong></p><p><strong>KEEP THE OARS MOVING.</strong></p><figure class="framed"><img class="zoomable" src="day-21-our-saga.jpg" alt="Our Saga Day 21 — The Warning Spreads"><figcaption>OUR SAGA — DAY 21 · THE WARNING SPREADS</figcaption></figure></div></div></section>'''
marker='<section class="dark-section" id="our-saga-day-20">'; assert marker in h
h=h.replace(marker,saga+'\n'+marker,1)

m=re.search(r'(<section class="ship-roll" id="ship-roll">.*?<div class="roll-grid">)(.*?)(</div>.*?</section>)',h,re.S); assert m
body=m.group(2)
for name in ['Fred','Jagadish','Ana']:
    assert f'<span>{name}</span>' not in body
names='<article><span>Fred</span><strong>Auðun</strong><small class="old-norse">Auðunn</small><small class="runes">ᛅᚢᚦᚢᚾ</small></article><article><span>Jagadish</span><strong>Einar</strong><small class="old-norse">Einarr</small><small class="runes">ᛅᛁᚾᛅᚱ</small></article><article><span>Ana</span><strong>Ragna</strong><small class="old-norse">Ragna</small><small class="runes">ᚱᛅᚴᚾᛅ</small></article>'
h=h[:m.start(2)]+body+names+h[m.end(2):]

honors='''<section class="parchment" id="honors-day-21"><div class="wrap"><div class="kicker red">CREW HONORS — DAY 21</div><h2>THREE NAMES ENTER THE SHIP'S ROLL</h2><figure class="framed"><img class="zoomable" src="day-21-crew-honors.jpg" alt="Crew Honors Day 21"><figcaption>CREW HONORS — DAY 21</figcaption></figure><div class="naming-list"><article><span>FRED</span><strong>AUÐUN</strong><small>Auðunn · ᛅᚢᚦᚢᚾ · 366,088</small></article><article><span>JAGADISH</span><strong>EINAR</strong><small>Einarr · ᛅᛁᚾᛅᚱ · 166,475</small></article><article><span>ANA</span><strong>RAGNA</strong><small>Ragna · ᚱᛅᚴᚾᛅ · 186,537</small></article></div></div></section>'''
old=re.search(r'<section\b(?=[^>]*\bid="honors")[^>]*>',h); assert old
h=h[:old.start()]+honors+'\n'+h[old.start():]

card='<a class="archive-day" href="archive/day-21.html"><div class="archive-day-image"><img src="day-21-viking-dispatch.jpg" alt="Day 21 voyage archive"></div><div class="archive-day-copy"><span>DAY 21</span><strong>Halfway — but something stirs</strong><small>Open the permanent voyage record.</small></div></a>'
assert '<div class="archive-days">' in h
h=h.replace('<div class="archive-days">','<div class="archive-days">'+card,1)
h=h.replace('DAY 20 · 94 VIKINGS · 35,729,859 STEPS · ONE LIVING SAGA','DAY 21 · 95 VIKINGS · 37,954,948 STEPS · ONE LIVING SAGA',1)
p.write_text(h,encoding='utf-8')
print('Day 21 current page staged')
