from pathlib import Path
p=Path('index.html')
lines=p.read_text().splitlines()
repls={
'<html lang="en"':'<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="Nordic Viking Heritage — Viking Voyage II, Day 26. Chapter III complete: Newfoundland to Nova Scotia."><title>Nordic Viking Heritage — Viking Voyage II — Day 26</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"><link rel="stylesheet" href="styles.css"></head><body>',
'<nav class="floating-nav" aria-label="Voyage quick navigation"':'<nav class="floating-nav" aria-label="Voyage quick navigation"><a href="#top">HOME</a><a href="#voyage">VOYAGE</a><a href="#history-day-26">HISTORY</a><a href="#our-saga-day-26">SAGA</a><a href="#ship-roll">CREW</a><a href="#voyage-archive">ARCHIVE</a></nav>',
'<section class="status parchment" id="voyage"':'<section class="status parchment" id="voyage"><div class="wrap"><div class="status-head"><div><div class="kicker red">THE SHIP\'S LOG — DAY 26</div><h1>CHAPTER III — COMPLETE</h1><p>The fleet has reached Nova Scotia. Chapter III is complete; Chapter IV begins when the fleet sails again.</p></div><img class="seal" src="assets/one-crew-one-saga.png" alt="One Crew, One Saga"></div><div class="stats"><article><strong>103</strong><small>SAILORS ABOARD</small><em>One crew</em></article><article><strong>50,647,198</strong><small>TOTAL STEPS</small><em>Steps toward Florida</em></article><article><strong>≈ 32,920.7 KM</strong><small>DISTANCE COVERED</small><em>At 0.65 m per step</em></article><article><strong>67.53%</strong><small>OF OUR GOAL</small><em>75,000,000 steps</em></article></div></div></section>',
'<section class="dark-section" id="dispatch"':'<section class="dark-section" id="dispatch"><div class="wrap"><div class="copy"><div class="kicker gold">⚔️ VIKING DISPATCH — DAY 26 ⚔️</div><h2>NOVA SCOTIA REACHED.</h2><p>103 Vikings have carried the fleet to the end of Chapter III.</p><p><strong>50,647,198 steps<br>≈ 32,920.7 km<br>67.53% completed</strong></p><p>The storm is behind us. Nova Scotia lies before the fleet.</p><p><strong>CHAPTER III — COMPLETE.</strong></p><figure class="framed"><img class="zoomable" src="day-26-saga-scene.jpg" alt="Viking Dispatch Day 26"><figcaption>VIKING DISPATCH — DAY 26</figcaption></figure></div></div></section>',
'<section class="map-section" id="voyage-map"':'<section class="map-section" id="voyage-map"><div class="wrap"><div class="kicker gold">THE VOYAGE MAP — CHAPTER III</div><h2>NEWFOUNDLAND → NOVA SCOTIA</h2><p class="intro">The fleet has reached Nova Scotia. Day 26 closes Chapter III at <strong>50,647,198 steps</strong> — approximately <strong>32,920.7 km</strong> since Greenland.</p><p><strong>ONE FLEET. ONE SAGA. ONE GOAL.</strong></p><div class="tags"><span>DAY 26</span><span>103 SAILORS</span><span>50,647,198 STEPS</span><span>≈ 32,920.7 KM</span><span>67.53% COMPLETE</span></div><figure class="framed"><img class="zoomable" src="day-26-voyage-map.jpg" alt="Viking Voyage II Day 26 map — Chapter III complete"><figcaption>THE VOYAGE MAP — DAY 26 · CHAPTER III COMPLETE</figcaption></figure></div></section>',
'<section class="layers parchment" id="saga"':'<section class="layers parchment" id="saga"><div class="wrap"><div class="kicker red">THREE LAYERS — ONE EXPERIENCE</div><h2>THE VOYAGE BECOMES A LIVING SAGA</h2><div class="layer-grid"><a class="layer-link" href="#history-day-26"><article><span>01</span><h3>HISTORY</h3><p>Verified history and archaeology remain separate from the saga.</p></article></a><a class="layer-link" href="#myth-day-26"><article><span>02</span><h3>MYTH &amp; SAGA</h3><p>The warning beneath the waves follows the fleet beyond the storm.</p></article></a><a class="layer-link" href="#our-saga-day-26"><article><span>03</span><h3>OUR SAGA</h3><p>The crew\'s real steps shape the living story we create together.</p></article></a></div></div></section>',
'id="our-saga-day-25"':'<section class="dark-section" id="our-saga-day-26"><div class="wrap"><div class="copy"><div class="kicker gold">⚔️ OUR SAGA — DAY 26 ⚔️</div><h2>FURTHER TOGETHER.</h2><p>The fleet has reached Nova Scotia. The storm is behind us, and Chapter III closes with 103 Vikings aboard.</p><p>No single oar carried us here. No single ship made the voyage alone.</p><p><strong>FURTHER TOGETHER.</strong></p><figure class="framed"><img class="zoomable" src="day-26-our-saga.jpg" alt="Our Saga Day 26"><figcaption>OUR SAGA — DAY 26 · FURTHER TOGETHER</figcaption></figure></div></div></section>',
'id="history-day-25"':'<section class="parchment history-section" id="history-day-26"><div class="wrap"><div class="copy"><div class="kicker red">HISTORY — DAY 26</div><h2>THE SAGAS CONTINUE. THE EVIDENCE DOES NOT.</h2><p>L’Anse aux Meadows is the confirmed Norse site in Newfoundland. Nova Scotia has no confirmed Norse archaeological site.</p><p><strong>THE SAGA MAY BE WILD. HISTORY MUST BE TRUE.</strong></p><figure class="framed"><img class="zoomable" src="day-26-history.jpg" alt="History Day 26 — L’Anse aux Meadows, Mi’kma’ki and Nova Scotia"><figcaption>HISTORY — DAY 26</figcaption></figure></div></div></section>',
'id="myth-day-25"':'<section class="dark-section" id="myth-day-26"><div class="wrap"><div class="copy"><div class="kicker gold">MYTH &amp; SAGA — DAY 26</div><h2>THE WARNING BENEATH THE WAVES</h2><p>The storm is behind us. The warning is not.</p><figure class="framed"><img class="zoomable" src="day-26-myth-saga.jpg" alt="Myth and Saga Day 26 — The Warning Beneath the Waves"><figcaption>MYTH &amp; SAGA — DAY 26 · THE WARNING BENEATH THE WAVES</figcaption></figure></div></div></section>'
}
seen={k:0 for k in repls}
out=[]
for line in lines:
    done=False
    for key,val in repls.items():
        if key in line:
            out.append(val); seen[key]+=1; done=True; break
    if not done: out.append(line)
for k in repls:
    if seen[k]!=1: raise SystemExit(f'Expected one match for {k!r}, got {seen[k]}')
# Add Day 26 names to the permanent Ship's Roll without changing existing names.
for i,line in enumerate(out):
    if '<section class="ship-roll" id="ship-roll"' in line:
        marker='</div></div></section>'
        addition='<article><span>PAT</span><strong>Hjalmar</strong><small class="old-norse">Hjalmarr</small><small class="runes">ᚼᛁᛅᛚᛘᛅᚱ</small></article><article><span>MARK</span><strong>Starkad</strong><small class="old-norse">Starkaðr</small><small class="runes">ᛋᛏᛅᚱᚴᛅᚦᚱ</small></article><article><span>fateme.berenji</span><strong>Alfhild</strong><small class="old-norse">Alfhildr</small><small class="runes">ᛅᛚᚠᚼᛁᛚᛏᚱ</small></article>'
        pos=line.rfind(marker)
        if pos<0: raise SystemExit('Ship roll closing marker not found')
        out[i]=line[:pos]+addition+line[pos:]
        break
else: raise SystemExit('Ship roll not found')
# Add Day 26 Crew Honors and Night Watch immediately before the archive.
for i,line in enumerate(out):
    if 'id="voyage-archive"' in line:
        honors='<section class="dark-section" id="crew-honors-day-26"><div class="wrap"><div class="copy"><div class="kicker gold">CREW HONORS — DAY 26</div><h2>THREE MORE NAMES ENTER THE SHIP\'S ROLL</h2><figure class="framed"><img class="zoomable" src="day-26-crew-honors.jpg" alt="Crew Honors Day 26"><figcaption>CREW HONORS — DAY 26</figcaption></figure></div></div></section>'
        night='<section class="dark-section" id="night-watch-day-26"><div class="wrap"><div class="copy"><div class="kicker gold">NIGHT WATCH — DAY 26</div><h2>103 VIKINGS. ONE FLEET.</h2><figure class="framed"><img class="zoomable" src="day-26-night-watch.jpg" alt="Night Watch Day 26"><figcaption>NIGHT WATCH — DAY 26</figcaption></figure></div></div></section>'
        # prepend Day 26 archive card inside archive section after heading intro area by inserting before existing first archive card/grid content
        card='<article class="archive-card"><a href="archive/day-26.html"><strong>DAY 26</strong><span>Nova Scotia reached · Chapter III complete</span></a></article>'
        if '<div class="archive-grid">' in line:
            line=line.replace('<div class="archive-grid">','<div class="archive-grid">'+card,1)
        out[i:i+1]=[honors,night,line]
        break
else: raise SystemExit('Voyage archive not found')
p.write_text('\n'.join(out)+'\n')
print('Day 26 homepage prepared; targeted sections only.')
