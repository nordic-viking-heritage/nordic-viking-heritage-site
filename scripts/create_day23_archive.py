from pathlib import Path

src=Path('archive/day-22.html').read_text(encoding='utf-8')
h=src
h=h.replace('Day 22','Day 23').replace('DAY 22','DAY 23').replace('day-22','day-23')
h=h.replace('97 Vikings','98 Vikings').replace('97</strong>','98</strong>')
h=h.replace('40,120,041','42,625,195').replace('2,165,093','2,505,154').replace('53.49%','56.83%').replace('26,078.0','27,706.4')
h=h.replace('40 MILLION STEPS','WHAT WAITS BEYOND THE HORIZON?')
h=h.replace('The fleet passed forty million steps in Chapter III and moved closer to Nova Scotia.','What waits beyond the horizon?')
h=h.replace('The fleet reached <strong>56.83%</strong> of the 75,000,000-step goal. Only three more Vikings remained before the crew reached 100.','The fleet continues through Chapter III toward Nova Scotia.')
h=h.replace('<blockquote>FURTHER TOGETHER.</blockquote>','<blockquote>SAME WATERS.<br>A BRIGHTER TOMORROW.</blockquote>')
start=h.index('<section class="dark-section" style="margin-top:2rem"><div class="wrap" style="padding-left:0;padding-right:0"><div class="kicker gold">CREW HONORS — DAY 23</div>')
end=h.index('<nav class="archive-page-nav">',start)
crew='''<section class="dark-section" style="margin-top:2rem"><div class="wrap" style="padding-left:0;padding-right:0"><div class="kicker gold">CREW HONORS — DAY 23</div><h2>THEIR NAMES ENTER THE SHIP'S ROLL</h2><p><strong>Younis A. / Abo Razi → Gisli (Gísli)</strong> · ᚴᛁᛋᛚᛁ</p><p><strong>Олеся (Olesya) → Gudrid (Guðríðr)</strong> · ᚴᚢᚦᚱᛁᚦᛦ</p><p><strong>Robedson → Birger (Birgir)</strong> · ᛒᛁᚱᚴᛁᛦ</p><figure class="archive-map"><a href="../day-23-crew-honors.jpg" target="_blank" rel="noopener"><img src="../day-23-crew-honors.jpg" alt="Crew Honors Day 23" loading="lazy" decoding="async"></a></figure></div></section>'''
h=h[:start]+crew+h[end:]
h=h.replace('href="day-21.html">← DAY 21','href="day-22.html">← DAY 22')
Path('archive/day-23.html').write_text(h,encoding='utf-8')
print('Day 23 archive created')