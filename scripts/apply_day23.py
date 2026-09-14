from pathlib import Path
import re

p=Path('index.html')
h=p.read_text(encoding='utf-8')
h=h.replace('Day 22. Chapter III','Day 23. Chapter III').replace('— Day 22</title>','— Day 23</title>')
status='''<section class="status parchment" id="voyage"><div class="wrap"><div class="status-head"><div><div class="kicker red">THE SHIP'S LOG — DAY 23</div><h1>WHAT WAITS BEYOND THE HORIZON?</h1><p>The fleet continues through Chapter III toward Nova Scotia.</p></div><img class="seal" src="assets/one-crew-one-saga.png" alt="One Crew, One Saga"></div><div class="stats"><article><strong>98</strong><small>SAILORS ABOARD</small><em>One crew</em></article><article><strong>42,625,195</strong><small>TOTAL STEPS</small><em>Steps toward Florida</em></article><article><strong>≈ 27,706.4 KM</strong><small>DISTANCE COVERED</small><em>At 0.65 m per step</em></article><article><strong>56.83%</strong><small>OF OUR GOAL</small><em>75,000,000 steps</em></article></div></div></section>'''
h,n=re.subn(r'<section class="status parchment" id="voyage">.*?</section>',status,h,count=1,flags=re.S); assert n==1

dispatch='''<section class="dark-section" id="dispatch"><div class="wrap"><div class="copy"><div class="kicker gold">VIKING DISPATCH — DAY 23</div><h2>WHAT WAITS BEYOND THE HORIZON?</h2><p><strong>98 VIKINGS · 42,625,195 STEPS · ≈27,706.4 KM</strong></p><p><strong>SAME WATERS. A BRIGHTER TOMORROW.</strong></p><figure class="framed"><img class="zoomable" src="day-23-viking-dispatch.jpg" alt="Viking Dispatch Day 23"><figcaption>VIKING DISPATCH — DAY 23</figcaption></figure></div></div></section>'''
h,n=re.subn(r'<section class="dark-section" id="dispatch">.*?</section>',dispatch,h,count=1,flags=re.S); assert n==1

ship=re.search(r'<section class="ship-roll" id="ship-roll">.*?</section>',h,re.S); assert ship
s=ship.group(0)
if 'Younis A. / Abo Razi' not in s:
    add='<article><span>Younis A. / Abo Razi</span><strong>Gisli</strong><small class="old-norse">Gísli</small><small class="runes">ᚴᛁᛋᛚᛁ</small></article><article><span>Олеся (Olesya)</span><strong>Gudrid</strong><small class="old-norse">Guðríðr</small><small class="runes">ᚴᚢᚦᚱᛁᚦᛦ</small></article><article><span>Robedson</span><strong>Birger</strong><small class="old-norse">Birgir</small><small class="runes">ᛒᛁᚱᚴᛁᛦ</small></article>'
    s=s.replace('</div></div></section>',add+'</div></div></section>',1)
    h=h[:ship.start()]+s+h[ship.end():]

hon='''<section class="parchment honors" id="honors"><div class="wrap"><div class="kicker red">CREW HONORS — DAY 23</div><h2>THREE NAMES ENTER THE SHIP'S ROLL</h2><div class="honors-explainer"><div class="kicker red">THE HONOR BEHIND THE NAME</div><h3>EVERY OAR MATTERS</h3><p>Crew Honors belongs to <strong>OUR SAGA</strong>. It is a Viking Voyage II tradition, not a claimed reconstruction of a documented Viking Age ceremony.</p><p>Once entered into <strong>THE SHIP'S ROLL</strong>, a sailor's name remains part of this voyage.</p></div><figure class="framed"><img class="zoomable" src="day-23-crew-honors.jpg" alt="Crew Honors Day 23 — Gisli, Gudrid and Birger"><figcaption>CREW HONORS — DAY 23 · GISLI · GUDRID · BIRGER</figcaption></figure><div class="naming-list"><article><span>YOUNIS A. / ABO RAZI</span><strong>GISLI <em>(Gísli)</em></strong><small>ᚴᛁᛋᛚᛁ</small></article><article><span>ОЛЕСЯ (Olesya)</span><strong>GUDRID <em>(Guðríðr)</em></strong><small>ᚴᚢᚦᚱᛁᚦᛦ</small></article><article><span>ROBEDSON</span><strong>BIRGER <em>(Birgir)</em></strong><small>ᛒᛁᚱᚴᛁᛦ</small></article></div></div></section>'''
h,n=re.subn(r'<section class="parchment honors" id="honors">.*?</section>',hon,h,count=1,flags=re.S); assert n==1

m='<div class="crew-honors-archive-grid">'
c='<figure><img class="zoomable" src="day-23-crew-honors.jpg" alt="Day 23 Crew Honors"><figcaption>DAY 23 · GISLI · GUDRID · BIRGER</figcaption></figure>'
if c not in h: h=h.replace(m,m+c,1)

m='<div class="archive-days">'
c='<a class="archive-day" href="archive/day-23.html"><div class="archive-day-image"><img src="day-23-viking-dispatch.jpg" alt="Day 23 voyage archive"></div><div class="archive-day-copy"><span>DAY 23</span><strong>What waits beyond the horizon?</strong><small>Open the permanent voyage record.</small></div></a>'
if c not in h: h=h.replace(m,m+c,1)

h=h.replace('DAY 22 · 97 VIKINGS · 40,120,041 STEPS · ONE LIVING SAGA','DAY 23 · 98 VIKINGS · 42,625,195 STEPS · ONE LIVING SAGA')
p.write_text(h,encoding='utf-8')
print('Day 23 index update applied')
