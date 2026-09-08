(() => {
  const q = (s) => document.querySelector(s);
  const setHTML = (s, html) => { const el = q(s); if (el) el.innerHTML = html; };

  setHTML('#voyage .status-head > div:first-child', `<div class="kicker red">THE SHIP'S LOG — DAY 18</div><h1>LAND! — NEWFOUNDLAND</h1><p>After wind, waves and fog, the fleet found land. Chapter II is complete. Tonight the ships rest on the shores of Newfoundland.</p>`);
  setHTML('#voyage .stats', `<article><strong>89</strong><small>SAILORS ABOARD</small><em>One fleet</em></article><article><strong>30,701,056</strong><small>TOTAL STEPS</small><em>Steps toward Florida</em></article><article><strong>≈ 19,955.7 KM</strong><small>DISTANCE COVERED</small><em>From Greenland</em></article><article><strong>40.93%</strong><small>OF OUR GOAL</small><em>75,000,000 steps</em></article>`);
  setHTML('#dispatch .copy', `<div class="kicker gold">VIKING DISPATCH — DAY 18</div><h2>LAND! — NEWFOUNDLAND</h2><p>Yesterday, the sea showed us no mercy. Wind howled through the rigging, waves rose around the ships and fog swallowed the horizon.</p><p>Still, the crew rowed. Today, <strong>89 Vikings</strong> drove the fleet forward with another <strong>4,823,183 steps</strong> — approximately <strong>3,135.1 km</strong>.</p><p>And then a shape appeared through the mist. Dark. Solid. Real.</p><p><strong>LAND — NEWFOUNDLAND.</strong></p><p>After <strong>30,701,056 total steps</strong> — approximately <strong>19,955.7 km</strong> — our keels have reached the shore.</p><p><strong>CHAPTER II IS COMPLETE.</strong></p><p>Pull the ships ashore. Lay down the oars. Light the fires. Tonight, we sail no farther.</p><figure class="framed"><img class="zoomable" src="day-18-viking-dispatch.png" alt="Viking Dispatch Day 18 — Land Newfoundland" /><figcaption>VIKING DISPATCH — DAY 18 · NEWFOUNDLAND · CHAPTER II COMPLETE</figcaption></figure>`);
  setHTML('#voyage-map .wrap', `<div class="kicker gold">THE VOYAGE MAP — CHAPTER II</div><h2>NORTH AMERICAN MAINLAND → NEWFOUNDLAND</h2><p class="intro">The fleet has reached Newfoundland. <strong>Chapter II is complete and now frozen in the voyage record.</strong></p><p class="intro">Any progress beyond the Chapter II landfall is carried forward into the next chapter rather than rewriting the completed crossing.</p><div class="tags"><span>DAY 18</span><span>89 SAILORS</span><span>30,701,056 STEPS</span><span>≈ 19,955.7 KM</span><span>40.93% COMPLETE</span></div>`);

  const sagaLayer = q('.layer-grid a[href="#our-saga-day-17"]'); if (sagaLayer) sagaLayer.setAttribute('href', '#our-saga-day-18');
  const navSaga = q('.floating-nav a[href="#our-saga-day-17"]'); if (navSaga) navSaga.setAttribute('href', '#our-saga-day-18');
  const saga17 = q('#our-saga-day-17');
  if (saga17) { saga17.id = 'our-saga-day-18'; setHTML('#our-saga-day-18 .copy', `<div class="kicker gold">OUR SAGA — DAY 18</div><h2>THE LAND BEYOND THE FOG</h2><p>Yesterday, the sea took away our horizon. Wind tore at the sails. Waves rose against the ships and fog closed around the fleet.</p><p>We knew Newfoundland was somewhere ahead. But knowing land exists is not the same as finding it.</p><p>So we rowed. Through the night. Through the grey. Through the uncertainty.</p><p>Slowly, the darkness ahead changed. At first, perhaps only a shadow. Cliffs. Rock. <strong>Land.</strong></p><p>A cry passed from ship to ship: <strong>NEWFOUNDLAND!</strong></p><p>One by one, the longships reached shore. Keels scraped stone. Ropes were thrown. Boots touched solid ground.</p><p>Pull the ships ashore. Lay down the oars. Light the fires. Listen to the waves behind us.</p><p><strong>WE FOUND THE LAND WE FEARED WE MIGHT NEVER SEE.</strong></p><p><strong>CHAPTER II IS COMPLETE.</strong></p><p>Tomorrow, a new chapter begins. But tonight… <strong>WE ARE IN NEWFOUNDLAND.</strong></p><figure class="framed"><img class="zoomable" src="day-18-our-saga.png" alt="Our Saga Day 18 — The Land Beyond the Fog" /><figcaption>OUR SAGA — DAY 18 · THE LAND BEYOND THE FOG</figcaption></figure>`); }

  const roll = q('#ship-roll .roll-grid');
  if (roll && ![...roll.querySelectorAll('span')].some(x => x.textContent.trim() === 'manuelmorenocaz')) roll.insertAdjacentHTML('beforeend', `<article><span>manuelmorenocaz</span><strong>Torsten</strong><small class="old-norse">Þórsteinn</small><small class="runes">ᚦᚢᚱᛋᛏᛁᚾ</small></article><article><span>Dania</span><strong>Svala</strong><small class="old-norse">Svala</small><small class="runes">ᛋᚢᛅᛚᛅ</small></article><article><span>Jonathan</span><strong>Bjarni</strong><small class="old-norse">Bjarni</small><small class="runes">ᛒᛁᛅᚱᚾᛁ</small></article>`);

  if (roll) {
    const entries = [...roll.querySelectorAll('article')];
    const stefanEntry = entries.find((entry) => entry.querySelector('span')?.textContent.trim() === 'Stefan');
    const starfireEntry = entries.find((entry) => entry.querySelector('span')?.textContent.trim().startsWith('Starfire Silverstar'));
    if (stefanEntry && starfireEntry) {
      [stefanEntry, starfireEntry].forEach((entry) => {
        entry.style.gridColumn = '';
        entry.style.border = '';
        entry.style.boxShadow = '';
        entry.style.background = '';
        entry.querySelector('.ship-role')?.remove();
        entry.querySelector('.saga-role')?.remove();
      });
      const starfireName = starfireEntry.querySelector('strong'); if (starfireName) starfireName.textContent = 'Þóra';
      const existingRoles = q('#ship-roll .ship-role-cards'); if (existingRoles) existingRoles.remove();
      const roleCards = document.createElement('div');
      roleCards.className = 'ship-role-cards';
      roleCards.style.cssText = 'grid-column:1/-1;display:grid;grid-template-columns:1fr;gap:1rem;margin-bottom:1.2rem';
      roleCards.innerHTML = `<article style="padding:1.45rem 1.55rem;border:3px solid #c9a35b;box-shadow:0 0 0 1px rgba(201,163,91,.32),0 0 16px rgba(201,163,91,.14);background:linear-gradient(135deg,rgba(201,163,91,.10),rgba(7,17,22,.02))"><small style="display:block;color:#c9a35b;font-weight:700;letter-spacing:.16em;margin-bottom:.85rem">THE CAPTAIN</small><span>Stefan</span><strong style="display:block">HÁKON</strong><small class="old-norse">Hákon</small><small class="runes">ᚼᛅᚴᚢᚾ</small></article><article style="padding:1.45rem 1.55rem;border:2px solid rgba(201,163,91,.72);box-shadow:0 0 0 1px rgba(201,163,91,.18),0 0 14px rgba(201,163,91,.10);background:linear-gradient(135deg,rgba(114,18,27,.16),rgba(7,17,22,.02))"><small style="display:block;color:#c9a35b;font-weight:700;letter-spacing:.14em;margin-bottom:.85rem">🐦‍⬛ KEEPER OF THE SAGA</small><span>Starfire Silverstar</span><strong style="display:block">ÞÓRA</strong><small class="old-norse">Þóra</small><small class="runes">ᚦᚢᚱᛅ</small></article>`;
      roll.insertBefore(roleCards, roll.firstChild);
    }
  }

  setHTML('#honors .wrap', `<div class="kicker red">CREW HONORS — DAY 18</div><h2>THREE MORE NAMES ENTER THE SHIP'S ROLL</h2><div class="honors-explainer"><div class="kicker red">THE HONOR BEHIND THE NAME</div><h3>EVERY OAR MATTERS</h3><p>Crew Honors belongs to <strong>OUR SAGA</strong>. It is a Viking Voyage II tradition, not a claimed reconstruction of a documented Viking Age ceremony.</p><p>Once entered into <strong>THE SHIP'S ROLL</strong>, a sailor's name remains part of this voyage.</p></div><figure class="framed" style="margin-bottom:2.5rem"><img class="zoomable" src="day-18-crew-honors.png" alt="Crew Honors Day 18 — Torsten, Svala and Bjarni" /><figcaption style="background:#071116;text-align:left;padding:.85rem 1rem"><strong style="color:#c9a35b">CREW HONORS — DAY 18</strong><span style="color:#f1eadb"> · TORSTEN · SVALA · BJARNI</span></figcaption></figure><div class="naming-list"><article><span>MANUELMORENOCAZ</span><strong>TORSTEN <em>(Þórsteinn)</em></strong><small>ᚦᚢᚱᛋᛏᛁᚾ</small></article><article><span>DANIA</span><strong>SVALA <em>(Svala)</em></strong><small>ᛋᚢᛅᛚᛅ</small></article><article><span>JONATHAN</span><strong>BJARNI <em>(Bjarni)</em></strong><small>ᛒᛁᛅᚱᚾᛁ</small></article></div>`);

  const honors = q('#honors');
  if (honors && !q('#crew-honors-archive')) {
    const cards = [
      ['DAY 18','day-18-crew-honors.png','TORSTEN · SVALA · BJARNI'],['DAY 17','day-17-crew-honors.png','LEIF · IVAR'],['DAY 16','day-16-crew-honors.png','ARNE · THYRA · HALFDAN'],['DAY 15','day-15-crew-honors.jpg','OLAF · SVEIN · INGVAR'],['DAY 14','day-14-crew-honors.jpg','RAGNAR · TOVA · KNUT'],['DAY 13','day-13-crew-honors.jpg','HARALD · BRAND · HALL'],['DAY 12','day-12-crew-honors-CORRECT.jpg','HOLMFRID · GYRID · GUNNAR'],['DAY 11','day-11-crew-honors.jpg','ASMUND · ÅSA · GUDRUN'],['DAY 10','day-10-crew-honors.jpg','MAGNUS · HELGA · ORM'],['DAY 8','day-8-crew-honors.jpg','ÞORBJØRN · ÞÓRA'],['DAY 7','day-7-crew-honors.jpg','BJORN · KARI'],['DAY 5','day-5-crew-honors.jpg','ULF · LIV'],['DAY 4','day-4-crew-honors.jpg','STEINN · HAFTHOR · FRODI'],['DAY 3','day-3-crew-honors.jpg','HRAFN · EIRIKR · FREYDIS · SIGRID'],['DAY 2','day-2-crew-honors.jpg','SOLVEIG'],['THE CAPTAIN','crew-honors-hakon-captain-naming.jpg','HÁKON · THE NAMING OF THE CAPTAIN']
    ].map(([label,src,names]) => {
      const isCaptain = label === 'THE CAPTAIN';
      return `<figure class="${isCaptain ? 'captain-honors-card' : ''}" style="position:relative;margin:0;width:100%;min-width:0;height:100%;display:grid;grid-template-rows:1fr 4.2rem;background:#071116;border:${isCaptain ? '3px solid #c9a35b' : '1px solid rgba(201,163,91,.45)'};box-shadow:${isCaptain ? '0 0 0 1px rgba(201,163,91,.38),0 0 18px rgba(201,163,91,.20)' : 'none'};overflow:hidden"><div style="aspect-ratio:4/5;background:#071116;display:flex;align-items:center;justify-content:center;overflow:hidden"><img class="zoomable" style="display:block;width:100%;height:100%;object-fit:contain;cursor:zoom-in" src="${src}" alt="Crew Honors ${label} — ${names}" /></div><figcaption style="height:4.2rem;box-sizing:border-box;padding:.58rem .6rem .65rem;background:#071116;text-align:left;overflow:hidden;${isCaptain ? 'box-shadow:inset 0 1px 0 rgba(201,163,91,.7)' : ''}"><strong style="display:block;color:#c9a35b;font-family:Georgia,serif;font-size:.64rem;letter-spacing:.09em;margin-bottom:.22rem">${label}</strong><span style="display:block;color:#f1eadb;font-family:Georgia,serif;font-size:.67rem;line-height:1.25;overflow-wrap:anywhere">${names}</span></figcaption></figure>`;
    }).join('');
    honors.insertAdjacentHTML('afterend', `<section class="parchment" id="crew-honors-archive" style="padding-bottom:5rem"><div class="wrap"><div class="kicker red">THE CREW HONORS ARCHIVE</div><h2>EVERY NAME HAS A FACE. EVERY FACE HAS A STORY.</h2><p style="max-width:780px;margin-bottom:2rem">Crew Honors portraits are part of the permanent record of Viking Voyage II. Once a Viking receives a name and a face in our saga, that moment remains here for the rest of the voyage.</p><div class="crew-honors-archive-grid" style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.8rem;align-items:stretch;max-width:760px">${cards}</div><p style="margin-top:1.75rem;margin-bottom:0;opacity:.8"><strong>Archive in progress.</strong> Day 6 and Day 9 are being restored with face-forward portraits to match the permanent Crew Honors standard.</p></div></section>`);
  }

  const archiveGrid = q('#crew-honors-archive .crew-honors-archive-grid');
  if (archiveGrid && window.matchMedia('(min-width: 760px)').matches) archiveGrid.style.gridTemplateColumns = 'repeat(4,minmax(0,1fr))';

  const lightbox = q('#lightbox');
  if (lightbox) {
    const full = lightbox.querySelector('img');
    document.querySelectorAll('#crew-honors-archive img.zoomable').forEach((archiveZoom) => {
      if (archiveZoom.dataset.zoomBound) return;
      archiveZoom.dataset.zoomBound = '1';
      archiveZoom.addEventListener('click', (event) => { event.preventDefault(); if (!full) return; full.src = archiveZoom.src; full.alt = archiveZoom.alt || 'Enlarged Crew Honors artwork'; lightbox.classList.add('open'); lightbox.setAttribute('aria-hidden', 'false'); document.body.classList.add('lightbox-open'); });
    });
  }

  const historyKicker = q('#history-day-17 .kicker'); if (historyKicker) historyKicker.textContent = 'LATEST HISTORY — DAY 17';
  const archiveTitle = q('#voyage-archive h2'); if (archiveTitle) archiveTitle.textContent = 'CHAPTER II — COMPLETE';
  const archiveIntro = q('#voyage-archive .gallery-intro'); if (archiveIntro) archiveIntro.innerHTML = 'Chapter I remains frozen in the archive. On Day 18 the fleet reached <strong>Newfoundland</strong>, completing Chapter II. Day 18 artwork records the landfall, while earlier artwork remains preserved as part of the voyage record.';
  const gallery = q('#voyage-archive .gallery-grid'); if (gallery && !gallery.querySelector('img[src="day-18-viking-dispatch.png"]')) gallery.insertAdjacentHTML('afterbegin', `<figure><img src="day-18-viking-dispatch.png" alt="Day 18 Viking Dispatch" /><figcaption><strong>DAY 18 · VIKING DISPATCH</strong></figcaption></figure><figure><img src="day-18-crew-honors.png" alt="Day 18 Crew Honors" /><figcaption><strong>DAY 18 · CREW HONORS</strong></figcaption></figure><figure><img src="day-18-our-saga.png" alt="Day 18 Our Saga" /><figcaption><strong>DAY 18 · OUR SAGA</strong></figcaption></figure>`);
  const closing = q('.closing-saga .wrap'); if (closing) closing.innerHTML = '<p>“Every step counts.<br>Every Viking matters.”</p><span>DAY 18 · 89 VIKINGS · 30,701,056 STEPS · NEWFOUNDLAND · CHAPTER II COMPLETE</span>';
})();